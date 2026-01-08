/**
 * Các route ai cũng truy cập được, không cần login
 */
export const publicRoutes = [
  "/",
];

/**
 * Các route dùng để xác thực (khi đã login thì không vào lại được các trang này nữa)
 */
export const authRoutes = [
  "/login",
  "/register",
];

/**
 * Prefix cho API authentication
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Trang mặc định sau khi login thành công
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";