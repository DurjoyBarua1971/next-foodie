import React from "react";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meal";
import Image from "next/image";

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ mealSlug: string }>;
}) {
  const resolvedParams = await params;
  const meal = await getMeal(resolvedParams.mealSlug);

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  console.log("Meal Detail Page:", meal);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
