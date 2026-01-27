/**
 * Các route ai cũng truy cập được, không cần login
 */
export const publicRoutes = [
  "/",
  "/menu",      // Thêm
  "/products",  // Thêm prefix cho product detail
  "/about",     // Thêm
  "/contact",   // Thêm
  "/services",  // Thêm (nếu có)
  "/payment",
  "/unauthorized",
];

/**
 * Các route dùng để xác thực (khi đã login thì không vào lại được các trang này nữa)
 */
export const authRoutes = [
  "/login",
  "/register",
];

export const adminRoutesPrefix = "/admin";

export const staffRoutesPrefix = "/staff";
/**
 * Prefix cho API authentication
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Trang mặc định sau khi login thành công
 */
export const DEFAULT_LOGIN_REDIRECT = "/menu";
export const DEFAULT_ADMIN_REDIRECT = "/admin/dashboard";
export const DEFAULT_STAFF_REDIRECT = "/staff/orders";