"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login"; // Import Server Action bước 1

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    
    // Gọi Server Action trong transition để không chặn UI
    startTransition(() => {
      login(values).then((data) => {
        // Nếu có lỗi thì hiển thị, nếu thành công thì middleware/action tự redirect
        if (data?.error) {
            setError(data.error);
        }
      });
    });
  };

  return (
    <div className="max-w-md mx-auto border p-5 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            {...form.register("email")}
            type="email"
            disabled={isPending}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            {...form.register("password")}
            type="password"
            disabled={isPending}
            className="w-full border p-2 rounded"
          />
        </div>
        
        {error && <div className="bg-red-100 text-red-500 p-2 rounded">{error}</div>}

        <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          {isPending ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};