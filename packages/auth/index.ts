import NextAuth, {
  type NextAuthResult,
  type User as DefaultUser,
} from "next-auth";
import { config } from "./config";

export interface User extends DefaultUser {
  id: string;
}

declare module "next-auth" {
  export interface Session {
    user: User;
  }
}

export type { Session } from "next-auth";

const result = NextAuth(config);
export const auth: NextAuthResult["auth"] = result.auth;
export const GET: NextAuthResult["handlers"]["GET"] = result.handlers.GET;
export const POST: NextAuthResult["handlers"]["POST"] = result.handlers.POST;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
