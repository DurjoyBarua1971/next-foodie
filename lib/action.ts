"use server";

import { redirect } from 'next/navigation';
import { saveMeal } from "./meal";
import { revalidatePath } from 'next/cache';

export async function shareMeal(previousState:unknown, formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const summary = formData.get("summary")?.toString().trim();
  const instructions = formData.get("instructions");
  const image = formData.get("image");
  const creator = formData.get("name")?.toString().trim();
  const creator_email = formData.get("email");

  if (
    (!title) ||
    !summary ||
    !instructions ||
    !image ||
    !creator ||
    !creator_email
  ) {
    throw new Error("All fields are required.");
  }

  const meal = {
    title: title as string,
    summary: summary as string,
    instructions: instructions as string,
    image: image as File,
    creator: creator as string,
    creator_email: creator_email as string,
  };

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
