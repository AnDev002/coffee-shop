const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);
  
  await db.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Super Admin",
      password,
      role: "ADMIN",
    },
  });
  
  console.log("Admin created: admin@gmail.com / admin123");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });