import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from "@supabase/supabase-js"
import { PrismaClient } from "@prisma/client"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        try {
          // Supabase Auth でログイン
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error || !data.user) {
            throw new Error("Invalid credentials")
          }

          // DB からユーザー情報を取得
          const user = await prisma.user.findUnique({
            where: { id: data.user.id },
          })

          if (!user) {
            throw new Error("User not found in database")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role,
            schoolId: user.schoolId,
          }
        } catch (error) {
          console.error("Auth error:", error)
          throw error
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.schoolId = (user as any).schoolId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
        ;(session.user as any).schoolId = token.schoolId
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth } = NextAuth(authOptions)
