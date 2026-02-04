"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Dùng Image tối ưu của Next.js

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  
  const { update } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    
    startTransition(() => {
      login(values, callbackUrl).then(async (data) => {
        if (data?.error) {
          setError(data.error);
        }
        
        if (data?.success) {
           await update();
           const destination = data.redirectTo || "/";
           window.location.assign(destination);
        }
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full bg-white min-h-screen">
      
      {/* --- HERO SECTION (Background) --- */}
      <div className="relative w-full h-[40vh] md:h-[60vh] min-h-[300px] flex justify-center items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-black/50 z-10" />
          {/* Background Image */}
          <div className="absolute top-0 left-0 w-full h-full">
             <Image 
                src="/assets/ImageAsset6.png" 
                alt="Background" 
                fill
                className="object-cover opacity-60"
                priority
             />
          </div>
           {/* Decoration Images */}
           <div className="absolute top-0 right-0 h-full w-auto z-20 hidden lg:block">
              <Image src="/assets/ImageAsset3.png" alt="Decoration Right" width={300} height={800} className="h-full w-auto object-cover" />
           </div>
           <div className="absolute top-0 left-0 h-full w-auto z-10 hidden lg:block">
              <Image src="/assets/ImageAsset4.png" alt="Decoration Left" width={300} height={800} className="h-full w-auto object-cover" />
           </div>
        </div>
      </div>

      {/* --- LOGIN FORM SECTION --- */}
      <div className="relative z-30 -mt-[80px] md:-mt-[120px] mb-20 flex justify-center w-full px-4">
        <div 
          className="w-full max-w-[600px] bg-black p-8 md:p-12 flex flex-col items-center gap-6 shadow-2xl border-t-2 border-[#c49b63]/20"
          onKeyDown={handleKeyDown}
        >
          
          {/* Title */}
          <div className="w-full flex flex-col items-center pb-2">
            <h2 className="font-josefin text-2xl md:text-3xl text-white uppercase leading-tight font-normal tracking-wide">
              Đăng Nhập
            </h2>
            <p className="text-white/60 text-sm font-poppins mt-2 font-light">
              Chào mừng bạn quay trở lại!
            </p>
          </div>

          {/* Form Content */}
          <div className="w-full flex flex-col items-start gap-5">
            
            {/* Email Field */}
            <div className="w-full">
              <label className="font-poppins text-sm font-light text-white mb-2 block tracking-wide">
                Email
              </label>
              <div className="w-full h-[54px] border border-white/30 focus-within:border-[#c49b63] px-4 flex items-center transition-colors bg-white/5">
                 <input 
                    {...form.register("email")}
                    disabled={isPending}
                    type="email" 
                    placeholder="example@gmail.com"
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-sm placeholder-white/30"
                 />
              </div>
              {form.formState.errors.email && (
                <span className="text-red-500 text-xs mt-1 block font-light">
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full">
              <label className="font-poppins text-sm font-light text-white mb-2 block tracking-wide">
                Mật khẩu
              </label>
              <div className="w-full h-[54px] border border-white/30 focus-within:border-[#c49b63] px-4 flex items-center transition-colors bg-white/5">
                 <input 
                    {...form.register("password")}
                    disabled={isPending}
                    type="password" 
                    placeholder="******"
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-sm placeholder-white/30"
                 />
              </div>
               {form.formState.errors.password && (
                <span className="text-red-500 text-xs mt-1 block font-light">
                  {form.formState.errors.password.message}
                </span>
              )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="w-full bg-red-500/10 border border-red-500/50 p-3 rounded text-red-400 text-sm text-center font-light">
                    {error}
                </div>
            )}

            {/* Links */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 mt-1">
              <Link href="#" className="font-poppins text-sm font-light text-[#c49b63] hover:text-[#e0b87e] transition-colors">
                Quên mật khẩu?
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm font-light">Chưa có tài khoản?</span>
                <Link href="/register" className="font-poppins text-sm font-medium text-[#c49b63] hover:text-[#e0b87e] transition-colors uppercase">
                  Đăng ký
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div className="w-full mt-4">
              <button 
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}
                className="w-full h-[54px] bg-[#c49b63] border border-[#c49b63] flex items-center justify-center hover:bg-transparent hover:text-[#c49b63] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-poppins text-sm font-medium text-black group-hover:text-[#c49b63] uppercase tracking-wider">
                  {isPending ? "Đang xử lý..." : "Đăng nhập ngay"}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}