// Creates the admin login from ADMIN_EMAIL / ADMIN_PASSWORD, or updates its
// password when it already exists. Runs on every container start, so the
// password lives only in the server's environment — never in the repo.
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.log("ensure-admin: ADMIN_EMAIL / ADMIN_PASSWORD not set — skipped");
  process.exit(0);
}
if (password.length < 10) {
  console.error("ensure-admin: ADMIN_PASSWORD must be at least 10 characters");
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const hash = await bcrypt.hash(password, 12);
await prisma.adminUser.upsert({
  where: { email },
  update: { password: hash },
  create: { email, password: hash, name: process.env.ADMIN_NAME || "Faris Elmasry", role: "admin" },
});
await prisma.$disconnect();
console.log(`ensure-admin: ${email} ready`);
