import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Demo credentials for development
const DEMO_USERS = [
  {
    id: "user_1",
    name: "Alexandra Hart",
    email: "admin@healthfirst.com",
    password: "demo123",
    role: "ORG_ADMIN",
    organization: "HealthFirst Medical Group",
    avatar: "AH",
  },
  {
    id: "user_2",
    name: "Marcus Chen",
    email: "manager@healthfirst.com",
    password: "demo123",
    role: "CLINIC_MANAGER",
    organization: "HealthFirst Medical Group",
    avatar: "MC",
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = DEMO_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.organization = (user as any).organization;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).organization = token.organization;
        (session.user as any).avatar = token.avatar;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "reputecare-dev-secret-key-2026",
});
