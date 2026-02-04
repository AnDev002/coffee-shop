// src/modules/auth/RegisterPage.tsx
"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas";

// --- Components UI nhỏ gọn để tái sử dụng trong file này ---
const InputField = ({ 
  icon: Icon, 
  placeholder, 
  type = "text", 
  register, 
  name, 
  error 
}: { 
  icon: any; 
  placeholder: string; 
  type?: string; 
  register: any; 
  name: string; 
  error?: string;
}) => (
  <div className="w-full">
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
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/30 h-full pr-4"
      />
    </div>
    {error && <span className="text-red-500 text-xs mt-1 ml-1 font-light flex items-center gap-1"><AlertCircle size={10} /> {error}</span>}
  </div>
);

const RegisterPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // Setup Form với Zod Resolver
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await register(values);

        if (data.error) {
          setError(data.error);
        }

        if (data.success) {
          setSuccess("Đăng ký thành công! Đang chuyển hướng...");
          // UX: Đợi 1.5s để người dùng đọc thông báo rồi mới chuyển trang
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }
      } catch (err) {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0c111d] font-sans">
      
      {/* --- LEFT SIDE: IMAGE & BRANDING (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/assets/ImageAsset5.png" // Dùng ảnh có sẵn của bạn
          alt="Coffee Experience" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center p-10">
          <h2 className="font-josefin text-5xl text-[#c49b63] font-bold mb-4 uppercase tracking-widest drop-shadow-lg">
            N.S Coffee
          </h2>
          <p className="font-poppins text-white/80 text-lg font-light tracking-wider">
            Đánh thức hương vị - Khơi nguồn cảm hứng
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Background decoration cho mobile */}
        <div className="absolute inset-0 lg:hidden z-0">
             <img src="/assets/ImageAsset5.png" className="w-full h-full object-cover opacity-20" />
             <div className="absolute inset-0 bg-[#0c111d]/90" />
        </div>

        <div className="relative z-10 w-full max-w-[450px] flex flex-col gap-8">
          
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="font-josefin text-3xl md:text-4xl text-white uppercase mb-2">
              Tạo tài khoản
            </h1>
            <p className="text-white/50 font-poppins text-sm font-light">
              Tham gia cộng đồng N.S Coffee ngay hôm nay
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            <InputField 
              icon={User} 
              placeholder="Tên hiển thị (Username)" 
              name="name" 
              register={form.register} 
              error={form.formState.errors.name?.message} 
            />
            
            <InputField 
              icon={Mail} 
              placeholder="Địa chỉ Email" 
              type="email"
              name="email" 
              register={form.register} 
              error={form.formState.errors.email?.message} 
            />

            <InputField 
              icon={Lock} 
              placeholder="Mật khẩu" 
              type="password"
              name="password" 
              register={form.register} 
              error={form.formState.errors.password?.message} 
            />

            {/* Notifications Area */}
            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-sm flex items-center gap-2">
                <CheckCircle size={16} /> {success}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isPending || !!success}
              className="w-full h-[54px] bg-[#c49b63] hover:bg-[#b08b55] disabled:opacity-70 disabled:cursor-not-allowed text-[#0c111d] font-medium font-poppins uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              {isPending ? <Loader2 className="animate-spin" size={20} /> : "Đăng ký ngay"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-4">
             <p className="text-white/40 font-poppins text-sm font-light">
               Bạn đã có tài khoản?{" "}
               <Link href="/login" className="text-[#c49b63] hover:underline font-normal transition-colors">
                 Đăng nhập tại đây
               </Link>
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;