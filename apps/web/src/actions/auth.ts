"use server";

import { signIn } from "@utaka/auth";

export async function signInWithGithub() {
  await signIn("github");
}

export async function signInWithGoogle() {
  await signIn("google");
}
