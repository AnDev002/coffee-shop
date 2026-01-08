"use client"; // <--- BẮT BUỘC: Để ở dòng đầu tiên

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LoginSchema } from "@/schemas";      // Schema validate
import { login } from "@/actions/login";      // Server Action xử lý đăng nhập

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition(); // Để tạo hiệu ứng loading

  // 1. Khai báo form với React Hook Form
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Hàm xử lý khi bấm nút Submit
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(""); // Reset lỗi cũ
    
    startTransition(() => {
      login(values).then((data) => {
        // Nếu có lỗi từ server (ví dụ: Sai mật khẩu) thì hiển thị
        if (data?.error) {
          setError(data.error);
        }
        // Nếu thành công, action 'login' đã tự redirect rồi, không cần làm gì thêm
      });
    });
  };

  return (
    // --- PHẦN GIAO DIỆN CỦA BẠN (GIỮ NGUYÊN HTML/CSS) ---
    // Chỉ cần sửa 3 chỗ: thẻ form, các thẻ input, và nút button
    
    <div className="min-h-screen flex items-center justify-center pt-16 bg-gray-50">
      
      {/* Nên bọc Form trong một thẻ div con để tạo khung trắng đẹp mắt */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          
          <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
          
          <h1 className="text-2xl font-bold">Đăng nhập (My Custom UI)</h1>

          {/* 2. Gắn input Email */}
          <div>
            <label>Email</label>
            <input 
              {...form.register("email")} // <--- QUAN TRỌNG: Kết nối input với form
              disabled={isPending}
              type="email" 
              className="w-full border p-2"
              placeholder="admin@example.com"
            />
            {/* Hiển thị lỗi validate input (nếu có) */}
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* 3. Gắn input Password */}
          <div>
            <label>Mật khẩu</label>
            <input 
              {...form.register("password")} // <--- QUAN TRỌNG
              disabled={isPending}
              type="password" 
              className="w-full border p-2" 
              placeholder="******"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
            )}
          </div>

          {/* 4. Hiển thị thông báo lỗi chung từ Server (ví dụ: Sai mật khẩu) */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          {/* 5. Nút submit */}
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
          >
            {isPending ? "Đang xử lý..." : "Đăng nhập ngay"}
          </button>

        </form>
      </div>
    </div>
  );
}