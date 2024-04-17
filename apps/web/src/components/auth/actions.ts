"use server";

import { signIn, signOut } from "@utaka/auth";

export async function logOut() {
  await signOut();
}

export async function signInWithGithub() {
  await signIn("github");
}

export async function signInWithGoogle() {
  await signIn("google");
}
