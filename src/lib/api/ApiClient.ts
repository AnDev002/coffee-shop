// src/lib/api/ApiClient.ts

export class ApiClient {
  private baseUrl: string;
  private getToken: () => string | null;

  constructor(baseUrl: string, getToken: () => string | null) {
    this.baseUrl = baseUrl;
    this.getToken = getToken;
  }

  private async request(path: string, options: RequestInit = {}) {
    const token = this.getToken();
    
    // Lấy Device ID từ localStorage (cho Tracking)
    const deviceId = typeof window !== 'undefined' ? localStorage.getItem('tracking_device_id') : '';

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(deviceId ? { 'x-device-id': deviceId } : {}),
        ...options.headers,
      },
    });

    if (!res.ok) {
      const msg = await res.text();
      // Bỏ qua lỗi tracking batch để không làm phiền user
      if (path.includes('tracking')) return null; 
      throw new Error(`API ${res.status}: ${msg}`);
    }
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  // --- CẬP NHẬT HÀM GET ĐỂ HỖ TRỢ PARAMS ---
  get(path: string, options: RequestInit & { params?: Record<string, any> } = {}) {
    let url = path;
    
    // Nếu có params, tự động chuyển thành query string (vd: ?limit=5&search=nam)
    if (options.params) {
        const params = new URLSearchParams();
        Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, String(value));
            }
        });
        const queryString = params.toString();
        if (queryString) {
            url += (url.includes('?') ? '&' : '?') + queryString;
        }
        delete options.params; // Xóa params khỏi options để không gửi nhầm vào fetch
    }

    return this.request(url, { ...options, method: 'GET' });
  }
  
  post(path: string, body?: any) { 
    return this.request(path, { method: 'POST', body: JSON.stringify(body) }); 
  }

  put(path: string, body?: any) { 
    return this.request(path, { method: 'PUT', body: JSON.stringify(body) }); 
  }
  
  patch(path: string, body?: any) { 
    return this.request(path, { method: 'PATCH', body: JSON.stringify(body) }); 
  }
  
  delete(path: string) { 
    return this.request(path, { method: 'DELETE' }); 
  }

  sendBeacon(path: string, body: any, customHeaders: Record<string, string> = {}) {
    const url = `${this.baseUrl}${path}`;
    const token = this.getToken();
    
    const headers: any = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      keepalive: true, 
    }).catch((err) => console.warn('Tracking error:', err));
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
);