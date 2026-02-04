// src/modules/auth/LoginPage.tsx
"use client";

import React, { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";

// --- Input Component (Tái sử dụng style) ---
const InputField = ({ 
  icon: Icon, 
  placeholder, 
  type = "text", 
  register, 
  name, 
  error,
  disabled
}: { 
  icon: any; 
  placeholder: string; 
  type?: string; 
  register: any; 
  name: string; 
  error?: string;
  disabled: boolean;
}) => (
  <div className="w-full">
    <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5 ml-1 font-poppins">
      {placeholder}
    </label>
    <div className={`
      relative flex items-center w-full h-[54px] border transition-all duration-300
      ${error ? "border-red-500 bg-red-500/5" : "border-white/20 bg-white/5 focus-within:border-[#c49b63] focus-within:bg-black"}
    `}>
      <div className="pl-4 pr-3 text-[#c49b63]">
        <Icon size={18} />
      </div>
      <input
        {...register(name)}
        type={type}
        disabled={disabled}
        placeholder={`Nhập ${placeholder.toLowerCase()}...`}
        className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/30 h-full pr-4 disabled:opacity-50"
      />
    </div>
    {error && <span className="text-red-500 text-xs mt-1 ml-1 font-light flex items-center gap-1"><AlertCircle size={10} /> {error}</span>}
  </div>
);

// --- Login Content Logic ---
const LoginContent = () => {
  const searchParams = useSearchParams();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const callbackUrl = searchParams.get("callbackUrl");
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    
    startTransition(async () => {
      try {
        const data = await login(values, callbackUrl);

        if (data?.error) {
          setError(data.error);
        }
        
        if (data?.success) {
          await update();
          // Hard reload để cập nhật Header/Session chính xác
          const destination = data.redirectTo || "/";
          window.location.assign(destination);
        }
      } catch (err) {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    });
  };

  return (
    <div className="relative z-10 w-full max-w-[450px] flex flex-col gap-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="font-josefin text-3xl md:text-4xl text-white uppercase mb-2">
          Chào mừng trở lại
        </h1>
        <p className="text-white/50 font-poppins text-sm font-light">
          Đăng nhập để thưởng thức hương vị tuyệt hảo
        </p>
      </div>

      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col gap-5"
        onKeyDown={(e) => {
           if (e.key === "Enter") {
             e.preventDefault(); 
             form.handleSubmit(onSubmit)();
           }
        }}
      >
        <InputField 
          icon={Mail} 
          placeholder="Email" 
          type="email"
          name="email" 
          register={form.register} 
          error={form.formState.errors.email?.message} 
          disabled={isPending}
        />

        <div className="flex flex-col gap-1">
          <InputField 
            icon={Lock} 
            placeholder="Mật khẩu" 
            type="password"
            name="password" 
            register={form.register} 
            error={form.formState.errors.password?.message} 
            disabled={isPending}
          />
          <div className="flex justify-end mt-1">
            <Link href="#" className="text-xs text-[#c49b63] hover:text-white transition-colors font-light">
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button 
          type="button" // Để chặn submit mặc định, xử lý qua onClick hoặc onKeyDown
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="w-full h-[54px] bg-[#c49b63] hover:bg-[#b08b55] disabled:opacity-70 disabled:cursor-not-allowed text-[#0c111d] font-medium font-poppins uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-[#c49b63]/20"
        >
          {isPending ? <Loader2 className="animate-spin" size={20} /> : "Đăng nhập"}
        </button>
      </form>

      <div className="text-center mt-4 border-t border-white/10 pt-6">
          <p className="text-white/40 font-poppins text-sm font-light">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-[#c49b63] hover:underline font-normal transition-colors">
              Đăng ký ngay
            </Link>
          </p>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex bg-[#0c111d] font-sans">
      {/* --- LEFT SIDE: IMAGE --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-black">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="/assets/ImageAsset6.png" // Dùng ảnh có sẵn
          alt="Coffee Moment" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Decorative Lines */}
        <div className="absolute top-10 left-10 w-[calc(100%-80px)] h-[calc(100%-80px)] border border-white/20 z-20 pointer-events-none" />
      </div>

      {/* --- RIGHT SIDE: CONTENT --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile Background */}
        <div className="absolute inset-0 lg:hidden z-0">
             <img src="/assets/ImageAsset6.png" className="w-full h-full object-cover opacity-20" />
             <div className="absolute inset-0 bg-[#0c111d]/90" />
        </div>
        
        {/* Suspense để tránh lỗi useSearchParams trong Next.js App Router */}
        <Suspense fallback={<div className="text-[#c49b63]"><Loader2 className="animate-spin" /></div>}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;