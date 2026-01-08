"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { db } from "@/lib/db"; // Import DB để check role trước

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Dữ liệu không hợp lệ!" };

  const { email, password } = validatedFields.data;

  // 1. Kiểm tra user tồn tại chưa để lấy Role
  const existingUser = await db.user.findUnique({ where: { email } });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email không tồn tại!" };
  }

  // 2. Định nghĩa nơi chuyển hướng dựa trên Role
  let redirectUrl = "/"; // Mặc định cho Customer
  if (existingUser.role === "ADMIN") {
    redirectUrl = "/admin/dashboard"; // Đường dẫn riêng cho Admin
  }

  try {
    // 3. Thực hiện đăng nhập với NextAuth
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectUrl, // NextAuth sẽ auto redirect vào đây nếu login đúng
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Sai thông tin tài khoản!" };
        default:
          return { error: "Lỗi hệ thống!" };
      }
    }
    throw error;
  }
};