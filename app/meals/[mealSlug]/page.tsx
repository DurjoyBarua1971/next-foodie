import React from 'react'

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ mealSlug: string }>
}) {
  const {mealSlug} = await params;
  console.log('MealDetailPage mealSlug:', mealSlug);
  return (
    <div>Meal : {mealSlug}</div>
  )
}
