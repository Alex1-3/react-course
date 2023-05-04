import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = function () {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://learn-9efa0-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        const loadedMeals = Object.entries(data).map(([key, value]) => {
          return {
            id: key,
            name: value.name,
            price: value.price,
            description: value.description,
          };
        });
        setMeals(loadedMeals);
      } catch (error) {
        setErr(error.message);
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <section className={styles.meals}>
      <Card>
        {isLoading && <p>Is Loading...</p>}
        {!isLoading && !err && (
          <ul>
            {meals.map((meal) => (
              <MealItem
                name={meal.name}
                price={meal.price}
                id={meal.id}
                description={meal.description}
                key={meal.id}
              />
            ))}
          </ul>
        )}
        {err && <p>{err}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
