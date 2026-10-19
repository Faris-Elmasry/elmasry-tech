import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { adminAccountRateLimit, adminLoginRateLimit, getRateLimitIdentifier } from "@/lib/rateLimit";

// compared against when the email doesn't exist, so the answer takes as long as a real one
const DUMMY_HASH = "$2b$12$LpueLTaAWjAo9vrHRD31Pu.sqGmcWKMMJ54NtPG5Y/N25Cg7sumOW";

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const email = credentials.email.trim().toLowerCase();

        // the password could be guessed without limit (security test, 2026-10-20)
        const byVisitor = await adminLoginRateLimit.limit(getRateLimitIdentifier({ headers: req?.headers ?? {} }));
        const byAccount = await adminAccountRateLimit.limit(email);
        if (!byVisitor.success || !byAccount.success) {
          throw new Error("TooManyAttempts");
        }

        const user = await prisma.adminUser.findUnique({
          where: { email },
        });

        const isPasswordValid = await compare(credentials.password, user?.password ?? DUMMY_HASH);
        if (!user || !isPasswordValid) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 86400, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/en/admin/login",
    error: "/en/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
