"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";

import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";

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
    <div className="flex flex-col w-full bg-white items-center min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[350px] md:h-[500px] bg-black">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
           <Image 
             src="/assets/ImageAsset5.png" 
             alt="Background" 
             fill
             className="object-cover opacity-60"
             priority
           />
           <div className="absolute inset-0 bg-black/40 z-10" />
           {/* Decorative Side Image */}
           <div className="absolute top-0 right-0 h-full w-auto z-10 hidden lg:block">
             <Image src="/assets/ImageAsset3.png" alt="Decoration" width={300} height={800} className="h-full w-auto object-cover" />
           </div>
        </div>

        {/* Hero Title Content */}
        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center pt-10">
          <span className="font-josefin text-4xl md:text-[40px] text-white uppercase tracking-widest mb-4 font-bold shadow-black drop-shadow-lg">
            Đăng Ký
          </span>
          {/* Breadcrumbs Stylized */}
          <div className="flex gap-4 border-b border-[#c49b63]/50 pb-2 px-6">
            <Link href="/" className="font-poppins text-sm text-white/80 uppercase tracking-widest font-light hover:text-[#c49b63] transition-colors">
              Trang chủ
            </Link>
            <span className="text-[#c49b63]">•</span>
            <span className="font-poppins text-sm text-[#c49b63] uppercase tracking-widest font-medium">
              Tạo tài khoản
            </span>
          </div>
        </div>
      </div>

      {/* --- REGISTER FORM SECTION --- */}
      <div className="relative z-30 -mt-[60px] md:-mt-[100px] mb-20 w-full px-4 flex justify-center">
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="w-full max-w-[800px] bg-[#030202] p-8 md:p-12 flex flex-col items-center gap-8 shadow-2xl border-t-4 border-[#c49b63]"
        >
          
          <div className="w-full pb-1 text-center">
            <h2 className="font-josefin text-2xl text-white uppercase leading-snug font-normal tracking-wide">
              Thông tin cá nhân
            </h2>
            <p className="text-white/50 text-sm font-light mt-2">Điền thông tin để trở thành thành viên</p>
          </div>

          <div className="w-full grid grid-cols-1 gap-6">
            
            {/* Input Name */}
            <div className="w-full">
               <label className="font-poppins text-[15px] font-light text-white mb-2 block">
                 Họ và tên
               </label>
               <div className="w-full h-[58px] border border-white/20 focus-within:border-[#c49b63] px-4 flex items-center bg-white/5 transition-all">
                  <input 
                    {...form.register("name")}
                    disabled={isPending}
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/30"
                  />
               </div>
               {form.formState.errors.name && <p className="text-red-500 text-xs mt-1 pl-1">{form.formState.errors.name.message}</p>}
            </div>

            {/* Input Email */}
            <div className="w-full">
               <label className="font-poppins text-[15px] font-light text-white mb-2 block">
                 Email
               </label>
               <div className="w-full h-[58px] border border-white/20 focus-within:border-[#c49b63] px-4 flex items-center bg-white/5 transition-all">
                  <input 
                    {...form.register("email")}
                    disabled={isPending}
                    type="email" 
                    placeholder="email@example.com" 
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/30"
                  />
               </div>
               {form.formState.errors.email && <p className="text-red-500 text-xs mt-1 pl-1">{form.formState.errors.email.message}</p>}
            </div>

            {/* Input Password */}
            <div className="w-full">
               <label className="font-poppins text-[15px] font-light text-white mb-2 block">
                 Mật khẩu
               </label>
               <div className="w-full h-[58px] border border-white/20 focus-within:border-[#c49b63] px-4 flex items-center bg-white/5 transition-all">
                  <input 
                    {...form.register("password")}
                    disabled={isPending}
                    type="password" 
                    placeholder="******" 
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/30"
                  />
               </div>
               {form.formState.errors.password && <p className="text-red-500 text-xs mt-1 pl-1">{form.formState.errors.password.message}</p>}
            </div>

            {/* Alerts */}
            {error && <div className="bg-red-900/20 text-red-400 border border-red-900/50 p-3 rounded text-center text-sm font-light">{error}</div>}
            {success && <div className="bg-green-900/20 text-green-400 border border-green-900/50 p-3 rounded text-center text-sm font-light">{success}</div>}

            {/* Submit Button */}
            <div className="w-full mt-4 flex flex-col gap-4">
               <button 
                type="submit"
                disabled={isPending}
                className="w-full h-[54px] bg-[#c49b63] border border-[#c49b63] flex items-center justify-center hover:bg-transparent hover:text-[#c49b63] transition-all duration-300 group disabled:opacity-50"
               >
                <span className="font-poppins text-[13px] font-bold text-black group-hover:text-[#c49b63] uppercase tracking-widest">
                  {isPending ? "Đang tạo tài khoản..." : "Đăng Ký Ngay"}
                </span>
              </button>
              
              <div className="flex justify-center items-center gap-2">
                 <span className="text-white/40 font-light text-sm">Đã có tài khoản?</span>
                 <Link href="/login" className="font-poppins text-sm font-medium text-[#c49b63] hover:text-[#e0b87e] transition-colors uppercase">
                    Đăng nhập
                 </Link>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}