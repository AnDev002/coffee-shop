import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role; // Lấy role từ session (cần config auth.ts callbacks chuẩn)

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = ["/auth/login", "/auth/register"].includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isPublicRoute = ["/"].includes(nextUrl.pathname); // Các trang ai cũng xem được

  // 1. Luôn cho phép API Auth
  if (isApiAuthRoute) return null;

  // 2. Xử lý trang Login/Register
  if (isAuthRoute) {
    if (isLoggedIn) {
        // Nếu đã login mà cố vào lại trang login -> đẩy về trang tương ứng role
        const redirectPath = userRole === "ADMIN" ? "/admin/dashboard" : "/";
        return Response.redirect(new URL(redirectPath, nextUrl));
    }
    return null;
  }

  // 3. BẢO VỆ NGHIÊM NGẶT ROUTE ADMIN
  if (isAdminRoute) {
    if (!isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    if (userRole !== "ADMIN") {
        // User thường mà mò vào Admin -> Đẩy về trang chủ
        return Response.redirect(new URL("/", nextUrl)); 
    }
  }

  // 4. Các route private khác (ví dụ trang profile user)
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};