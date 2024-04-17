import NextAuth, { type NextAuthResult } from "next-auth";
import { config } from "./config";

export type { Session, User } from "next-auth";

const result = NextAuth(config);
export const auth: NextAuthResult["auth"] = result.auth;
export const GET: NextAuthResult["handlers"]["GET"] = result.handlers.GET;
export const POST: NextAuthResult["handlers"]["POST"] = result.handlers.POST;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
