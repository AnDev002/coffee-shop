// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Bây giờ file auth.ts đã export handlers nên dòng này sẽ chạy
export const { GET, POST } = handlers;