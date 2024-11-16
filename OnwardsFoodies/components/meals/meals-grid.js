import MealItem from './meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid({ meals }) {
  return (
    <ul>
      {meals.map((meal) => (
        <li key={meal.id} className={classes.meal}>
            <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
