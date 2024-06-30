import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export default auth(async (req) => {
    const isLoggedIn = !!req.auth;
    console.log("isLoggedIn: ", isLoggedIn);
});
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/auth/login"],
};