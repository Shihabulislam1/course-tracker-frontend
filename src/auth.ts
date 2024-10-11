import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import $axios from "Axios";
import { API_URL } from "@/constants";

interface Credentials {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

async function login(credentials: Credentials) {
  try {
    return await $axios.post(API_URL, credentials).then((res: { key: string }) => {
      const { key } = res;
      return {
        accessToken: key,
        // If you need any other information you can add here...
      };
    });
  } catch (e) {
    throw new Error("Something went wrong.");
  }
}

export const config: NextAuthConfig = {
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        try {
          return login(credentials);
        } catch (e) {
          return {};
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
