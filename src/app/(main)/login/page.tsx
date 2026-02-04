// src/modules/auth/LoginPage.tsx
"use client";

import React, { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { Loader2 } from "lucide-react";

// Tách logic form ra component con để dùng Suspense (tránh lỗi build Next.js)
const LoginFormContent = () => {
  const searchParams = useSearchParams();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

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
          const destination = data.redirectTo || "/";
          window.location.assign(destination);
        }
      } catch (err) {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-start w-full bg-white">
      {/* --- HERO SECTION (GIỮ NGUYÊN UI GỐC) --- */}
      <div className="relative w-full h-[50vh] min-h-[400px] md:h-[750px] flex justify-center items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-black/50 z-10" />
          <img 
            src="/assets/ImageAsset6.png" 
            alt="Background" 
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
          />
           <img 
            src="/assets/ImageAsset3.png" 
            alt="Decoration Right" 
            className="absolute top-0 right-0 h-full w-auto object-cover z-20 hidden lg:block"
          />
           <img 
            src="/assets/ImageAsset4.png" 
            alt="Decoration Left" 
            className="absolute top-0 left-0 h-full w-auto object-cover z-10 hidden lg:block"
          />
        </div>
      </div>

      {/* --- FORM SECTION --- */}
      <div className="relative z-30 -mt-[60px] md:-mt-[100px] mb-20 flex justify-center w-full px-4">
        <div className="w-full max-w-[1110px] bg-black p-6 md:p-12 flex flex-col items-center gap-6 shadow-2xl border-t-2 border-coffee-primary/20">
          
          {/* Title */}
          <div className="w-full flex justify-start pb-1">
            <h2 className="font-josefin text-xl md:text-[24px] text-white uppercase leading-tight font-normal">
              Login
            </h2>
          </div>

          {/* Form Content - Đã chuyển thành thẻ FORM và thêm Logic */}
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="w-full flex flex-col items-start gap-4"
          >
            
            {/* Email Field */}
            <div className="w-full">
              <label className="font-poppins text-sm md:text-[15px] font-light text-white leading-[27px] block mb-2">
                Email
              </label>
              <div className={`w-full h-[50px] md:h-[58px] border ${form.formState.errors.email ? 'border-red-500' : 'border-white/30 focus-within:border-coffee-primary'} px-4 flex items-center transition-colors`}>
                 <input 
                    {...form.register("email")}
                    type="email" 
                    disabled={isPending}
                    placeholder="Email"
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/40"
                 />
              </div>
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1 font-light italic">{form.formState.errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full">
              <label className="font-poppins text-sm md:text-[15px] font-light text-white leading-[27px] block mb-2">
                Password
              </label>
              <div className={`w-full h-[50px] md:h-[58px] border ${form.formState.errors.password ? 'border-red-500' : 'border-white/30 focus-within:border-coffee-primary'} px-4 flex items-center transition-colors`}>
                 <input 
                    {...form.register("password")}
                    type="password" 
                    disabled={isPending}
                    placeholder="Password"
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/40"
                 />
              </div>
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1 font-light italic">{form.formState.errors.password.message}</p>
              )}
            </div>

            {/* Error Message Global */}
            {error && (
              <div className="w-full p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-light">
                ❌ {error}
              </div>
            )}

            {/* Links */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
              <Link href="#" className="font-poppins text-sm font-light text-coffee-primary hover:text-[#b08b55] transition-colors whitespace-nowrap">
                Forgot Password
              </Link>
              <span className="hidden sm:inline text-white/20">|</span>
              <Link href="/register" className="font-poppins text-sm font-light text-coffee-primary hover:text-[#b08b55] transition-colors whitespace-nowrap">
                Don&apos;t have an Account
              </Link>
            </div>

            {/* Login Button */}
            <div className="w-full mt-6">
              <button 
                type="submit"
                disabled={isPending}
                className="w-full h-[54px] bg-coffee-primary border border-coffee-primary flex items-center justify-center hover:bg-transparent hover:text-coffee-primary transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Loader2 className="animate-spin text-black group-hover:text-coffee-primary" />
                ) : (
                  <span className="font-poppins text-sm font-medium text-black group-hover:text-coffee-primary uppercase tracking-wider">
                    Login
                  </span>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center text-coffee-primary">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
};

export default LoginPage;