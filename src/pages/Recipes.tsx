import React, { useEffect, useState } from 'react';
import CardRecipes from '../components/CardRecipes';

type RecipesProps = {
  path: string,
};

function Recipes({ path } : RecipesProps) {
  const [currentValue, setCurrentValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (path === 'meals') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setCurrentValue(data.meals);
      }
      if (path === 'drinks') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setCurrentValue(data.drinks);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      {currentValue && (
        currentValue.map((current, index) => {
          return (
            <CardRecipes key={ index } data={ current } type={ path } index={ index } />
          );
        })
      )}
    </>
  );
}

export default Recipes;
