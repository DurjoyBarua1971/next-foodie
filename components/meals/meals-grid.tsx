import MealItem from './meal-item';
import classes from "./meals-grid.module.css";

export interface MealsGridProps {
  meals: {
    id: number;
    title: string;
    slug: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
  }[];
}

export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
