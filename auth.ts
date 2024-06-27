import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { options } from "./app/api/auth/[...nextauth]/options";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth(options);