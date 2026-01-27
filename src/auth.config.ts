// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";
// Đảm bảo import đúng đường dẫn các biến
import { 
  publicRoutes, 
  authRoutes, 
  apiAuthPrefix, 
  adminRoutesPrefix, 
  staffRoutesPrefix,
  DEFAULT_LOGIN_REDIRECT
} from "@/routes";

export const authConfig = {
  providers: [], 
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const pathname = nextUrl.pathname;

      // 1. LUÔN CHO PHÉP API AUTH (Quan trọng để login hoạt động)
      if (pathname.startsWith(apiAuthPrefix)) return true;

      // 2. Logic cho trang Login/Register
      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          // Đã login thì đẩy về trang chủ hoặc dashboard
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true; // Chưa login thì cho phép ở lại trang login
      }

      // 3. Logic cho Admin/Staff (Chỉ check nếu route bắt đầu bằng prefix)
      if (pathname.startsWith(adminRoutesPrefix)) {
        if (!isLoggedIn || userRole !== "ADMIN") return false; // False = Redirect về Login
        return true;
      }
      
      if (pathname.startsWith(staffRoutesPrefix)) {
        if (!isLoggedIn || (userRole !== "STAFF" && userRole !== "ADMIN")) return false;
        return true;
      }

      // 4. Các route công khai (Check chính xác hoặc startsWith)
      const isPublic = publicRoutes.some(route => 
        route === "/" ? pathname === "/" : pathname.startsWith(route)
      );

      if (isPublic) return true;

      // 5. Mặc định: Nếu đã login thì cho qua, chưa thì chặn
      return isLoggedIn;
    },
    
    // Giữ nguyên jwt và session mapping như cũ
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as any).role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as any;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;