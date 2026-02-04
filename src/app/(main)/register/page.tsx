// src/modules/auth/RegisterPage.tsx
"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Loader2 } from "lucide-react";

// --- GIỮ NGUYÊN CÁC HELPER COMPONENTS CŨ ---
const NavLink = ({ text, href, isActive, width }: { text: string; href: string; isActive: boolean; width: string }) => (
  <div className="flex flex-col justify-start items-start py-[14px] px-[20px] h-[52px]">
    <Link 
      href={href}
      className={`font-poppins text-[13px] whitespace-nowrap leading-[23.4px] uppercase tracking-[2px] font-normal transition-colors duration-300 ${
        isActive ? "text-[#c49b63]" : "text-white hover:text-[#c49b63]"
      }`}
      style={{ minWidth: width }}
    >
      {text}
    </Link>
  </div>
);

const DecorationSquare = ({ isFilled }: { isFilled: boolean }) => (
  <div className="border-[2px] border-white rounded-[9px] w-[18px] h-[18px] flex justify-center items-center overflow-hidden">
    <div className={`rounded-[6px] w-[12px] h-[12px] ${isFilled ? "bg-white" : "bg-white/50"}`} />
  </div>
);

const NAV_ITEMS = [
  { text: "Home", href: "/", width: "44px", isActive: false },
  { text: "Menu", href: "/menu", width: "42px", isActive: false },
  { text: "Services", href: "/services", width: "73px", isActive: false },
  { text: "About", href: "/about", width: "51px", isActive: false },
  { text: "Contact", href: "/contact", width: "75px", isActive: false },
  { text: "Login", href: "/login", width: "47px", isActive: false },
  { text: "Register", href: "/register", width: "72px", isActive: true },
];

const RegisterPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const data = await register(values);
        if (data.error) setError(data.error);
        if (data.success) {
          setSuccess("Đăng ký thành công! Đang chuyển hướng...");
          setTimeout(() => router.push("/login"), 1500);
        }
      } catch (err) {
        setError("Lỗi hệ thống.");
      }
    });
  };

  return (
    <div className="flex flex-col w-full bg-white items-center">
      
      {/* --- HERO & HEADER SECTION (GIỮ NGUYÊN 100% CODE CŨ) --- */}
      <div className="relative w-full h-[750px] bg-black">
        <div className="absolute inset-0 z-0">
           <img src="/assets/ImageAsset5.png" alt="Background" className="absolute w-full h-full object-cover opacity-60" />
           <img src="/assets/ImageAsset4.png" alt="Overlay" className="absolute w-full h-full object-cover z-10" />
           <div className="absolute inset-0 bg-black/50 z-10" />
           <img src="/assets/ImageAsset3.png" alt="Decoration" className="absolute top-0 right-0 h-full w-auto object-cover z-10 hidden lg:block" />
        </div>

        <div className="absolute top-0 z-40 w-full border-b border-gray-600 bg-[#151111] shadow-lg">
          <div className="container mx-auto px-4 lg:px-[15px] h-[79px] flex justify-between items-center">
            <Link href="/" className="flex flex-col items-start pt-4 pb-1">
              <span className="font-josefin text-[17px] font-bold text-[#ebcc90] leading-[30px] uppercase">
                N.S Coffee
              </span>
              <span className="font-inter text-[10px] font-thin text-[#f5deb1] uppercase tracking-widest">
                Delicious Taste
              </span>
            </Link>
            <div className="hidden lg:flex flex-row items-center">
              {NAV_ITEMS.map((item, index) => (
                <NavLink key={index} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center pt-20">
          <span className="font-josefin text-[40px] text-white uppercase tracking-[1px] mb-4">
            Register
          </span>
          <div className="flex gap-4 border-b-2 border-white pb-2">
            <Link href="/" className="font-poppins text-[13px] text-white uppercase tracking-[1px] font-light hover:text-[#c49b63] transition-colors">
              Home
            </Link>
            <span className="font-poppins text-[13px] text-[#bfbfbf] uppercase tracking-[1px] font-light">
              Register
            </span>
          </div>
        </div>

        <div className="absolute top-[682px] w-full flex justify-center gap-[10px] z-30">
           <DecorationSquare isFilled={true} />
           <DecorationSquare isFilled={false} />
           <DecorationSquare isFilled={false} />
        </div>
      </div>

      {/* --- REGISTER FORM SECTION (ĐÃ NÂNG CẤP UX) --- */}
      <div className="relative z-30 -mt-[100px] mb-20 w-full px-4 flex justify-center">
        <div className="w-full max-w-[1110px] bg-[#030202] p-12 flex flex-col items-center gap-6 shadow-2xl">
          
          <div className="w-full pb-1">
            <h2 className="font-josefin text-[24px] text-white uppercase leading-[33.6px] font-normal">
              Register
            </h2>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            {/* Username */}
            <div className="w-full">
               <label className="font-poppins text-[15px] font-light text-white leading-[27px] block mb-2">
                 Username
               </label>
               <div className={`w-full h-[58px] border ${form.formState.errors.name ? 'border-red-500' : 'border-white'} px-4 flex items-center`}>
                  <input 
                    {...form.register("name")}
                    type="text" 
                    placeholder="Username" 
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/40"
                  />
               </div>
               {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="w-full">
               <label className="font-poppins text-[15px] font-light text-white leading-[27px] block mb-2">
                 Email
               </label>
               <div className={`w-full h-[58px] border ${form.formState.errors.email ? 'border-red-500' : 'border-white'} px-4 flex items-center`}>
                  <input 
                    {...form.register("email")}
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/40"
                  />
               </div>
               {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="w-full">
               <label className="font-poppins text-[15px] font-light text-white leading-[27px] block mb-2">
                 Password
               </label>
               <div className={`w-full h-[58px] border ${form.formState.errors.password ? 'border-red-500' : 'border-white'} px-4 flex items-center`}>
                  <input 
                    {...form.register("password")}
                    type="password" 
                    placeholder="Password" 
                    className="w-full bg-transparent border-none outline-none text-white font-poppins font-light text-[14px] placeholder-white/40"
                  />
               </div>
               {form.formState.errors.password && <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>}
            </div>

            {/* Notifications */}
            {error && <div className="p-3 bg-red-500/10 text-red-500 text-sm border border-red-500/30">{error}</div>}
            {success && <div className="p-3 bg-green-500/10 text-green-500 text-sm border border-green-500/30">{success}</div>}

            {/* Links */}
            <div className="w-full mt-2">
              <Link href="/login" className="font-poppins text-[15px] font-light text-[#c49b63] leading-[27px] hover:text-[#b08b55] transition-colors">
                 Already have an Account
              </Link>
            </div>

            {/* Submit Button */}
            <div className="w-full mt-6">
               <button 
                type="submit"
                disabled={isPending || !!success}
                className="w-full h-[54px] bg-[#c49b63] border border-[#c49b63] flex items-center justify-center hover:bg-transparent hover:text-[#c49b63] transition-all duration-300 group disabled:opacity-70"
               >
                {isPending ? (
                   <Loader2 className="animate-spin text-black group-hover:text-[#c49b63]" />
                ) : (
                   <span className="font-poppins text-[13px] font-normal text-black leading-[19.5px] group-hover:text-[#c49b63] uppercase">
                     Register
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

export default RegisterPage;