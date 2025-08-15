import { Meal, ResponseMeal } from "@/types/meal";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals(): Promise<ResponseMeal[]> {
  try {
    const meals = db.prepare("SELECT * FROM meals").all();
    return meals as ResponseMeal[];
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    throw new Error("Failed to fetch meals");
  }
}

export async function getMeal(slug: string): Promise<ResponseMeal> {
  try {
    const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
    if (!meal) {
      throw new Error(`Meal with slug "${slug}" not found`);
    }
    return meal as ResponseMeal;
  } catch (error) {
    console.error(`Failed to fetch meal with slug "${slug}":`, error);
    throw error;
  }
}

// ...existing code...

export async function saveMeal(meal: Meal): Promise<void> {
  try {

    const mealData = { ...meal };

    // Generate slug and sanitize instructions
    mealData.slug = slugify(mealData.title, { lower: true, strict: true });
    mealData.instructions = xss(mealData.instructions);

    // Handle image upload if image exists
    let imagePath = "";
    if (mealData.image && mealData.image instanceof File) {
      const extension = mealData.image.name.split(".").pop();
      const timestamp = Date.now();
      const fileName = `${mealData.slug}-${timestamp}.${extension}`;
      imagePath = `/images/${fileName}`;

      // Ensure images directory exists
      await fs.promises.mkdir("public/images", { recursive: true });

      // Save image file
      const bufferedImage = await mealData.image.arrayBuffer();
      await fs.promises.writeFile(
        `public/images/${fileName}`,
        Buffer.from(bufferedImage)
      );
      mealData.image = imagePath; // Update mealData to store the path
    }

    console.log("Saving meal:", mealData);

    db.prepare(
      `INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) VALUES (
      @title, @slug, @image, @summary, @instructions, @creator, @creator_email)`
    ).run(mealData);
  } catch (error) {
    console.error("Failed to save meal:", error);
    throw new Error("Failed to save meal");
  }
}
