"use client"; // <--- BẮT BUỘC: Để ở dòng đầu tiên

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// 1. Thêm import useSession và useSearchParams
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { LoginSchema } from "@/schemas";      // Schema validate
import { login } from "@/actions/login";      // Server Action xử lý đăng nhập

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition(); // Để tạo hiệu ứng loading
  
  // 2. Lấy hàm update từ session và lấy callbackUrl
  const { update } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  // 3. Khai báo form với React Hook Form
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 4. Hàm xử lý khi bấm nút Submit (Đã cập nhật logic fix Header)
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(""); // Reset lỗi cũ
    
    startTransition(() => {
      // Truyền thêm callbackUrl vào action login
      login(values, callbackUrl).then(async (data) => {
        // Nếu có lỗi từ server (ví dụ: Sai mật khẩu) thì hiển thị
        if (data?.error) {
          setError(data.error);
        }
        
        // NẾU THÀNH CÔNG -> Xử lý update header và chuyển trang tại đây
        if (data?.success) {
           // Bước 1: Update session client để NextAuth nhận diện user mới
           await update();

           // Bước 2: Dùng window.location.assign để ép trình duyệt tải lại trang (Hard Reload)
           // Điều này đảm bảo Header hiển thị đúng UserAccountDropdown
           const destination = data.redirectTo || "/";
           window.location.assign(destination);
        }
      });
    });
  };

  // Hàm xử lý Enter thủ công (Để tránh trình duyệt tự reload khi nhấn Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 bg-gray-50">
      
      {/* Nên bọc Form trong một thẻ div con để tạo khung trắng đẹp mắt */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          
          <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>
      
        {/* Thay thẻ form bằng div và xử lý onKeyDown để chặn hành vi reload mặc định */}
        <div onKeyDown={handleKeyDown} className="max-w-md mx-auto space-y-4">

          {/* Input Email */}
          <div>
            <label>Email</label>
            <input 
              {...form.register("email")} 
              disabled={isPending}
              type="email" 
              className="w-full border p-2 text-black" // Thêm text-black nếu cần
              placeholder="admin@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Input Password */}
          <div>
            <label>Mật khẩu</label>
            <input 
              {...form.register("password")} 
              disabled={isPending}
              type="password" 
              className="w-full border p-2 text-black" 
              placeholder="******"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
            )}
          </div>

          {/* Hiển thị thông báo lỗi chung */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          {/* Nút submit: chuyển thành type="button" và gọi handleSubmit thủ công */}
          <button 
            type="button" 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400 hover:bg-blue-700 transition"
          >
            {isPending ? "Đang xử lý..." : "Đăng nhập ngay"}
          </button>

        </div>
      </div>
    </div>
  );
}