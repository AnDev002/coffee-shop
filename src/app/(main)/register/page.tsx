"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register"; // Action đăng ký

export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) setSuccess(data.success);
      });
    });
  };

  return (
    <div className="container mx-auto p-10">
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4 border p-5 shadow-lg rounded">
        
        <h1 className="text-2xl font-bold text-center">Đăng ký tài khoản</h1>

        {/* Input Tên */}
        <div>
          <label className="block mb-1 font-medium">Họ và tên</label>
          <input 
            {...form.register("name")} 
            disabled={isPending}
            className="w-full border p-2 rounded" 
            placeholder="Nguyễn Văn A"
          />
          {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
        </div>

        {/* Input Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input 
            {...form.register("email")} 
            disabled={isPending}
            type="email"
            className="w-full border p-2 rounded" 
            placeholder="email@example.com"
          />
          {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
        </div>

        {/* Input Password */}
        <div>
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input 
            {...form.register("password")} 
            disabled={isPending}
            type="password"
            className="w-full border p-2 rounded" 
            placeholder="******"
          />
           {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
        </div>

        {/* Thông báo lỗi / thành công */}
        {error && <div className="bg-red-100 text-red-600 p-2 rounded text-center">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-2 rounded text-center">{success}</div>}

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 disabled:opacity-50"
        >
          {isPending ? "Đang tạo tài khoản..." : "Đăng ký"}
        </button>

      </form>
    </div>
  );
}