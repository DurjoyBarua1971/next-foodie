import { Meal } from '@/types/meal';
import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const meals = db.prepare('SELECT * FROM meals').all();
  //throw new Error('Failed to fetch meals');
  return meals as Meal[];
}

export async function getMeal(slug:string): Promise<Meal> {
  const meal =  db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
  if (!meal) {
    throw new Error(`Meal with slug "${slug}" not found`);
  }
  return meal as Meal;
}