import type { NextAuthConfig } from "next-auth"; // Thêm chữ 'type'
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas"; 
import { getUserByEmail } from "@/data/user"; 
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    Credentials({
      // --- KHẮC PHỤC LỖI THIẾU THUỘC TÍNH CREDENTIALS ---
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // ----------------------------------------------------
      
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig;