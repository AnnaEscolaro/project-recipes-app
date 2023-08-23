import { useEffect, useState } from 'react';
import CardRecipes from '../components/CardRecipes';

type RecipesProps = {
  path: string,
};

function Recipes({ path } : RecipesProps) {
  const [currentValue, setCurrentValue] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (path === 'meals') {
        const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataMeals = await responseMeals.json();
        setCurrentValue(dataMeals.meals);

        const responseCategoryMeals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const dataCategoryMeals = await responseCategoryMeals.json();
        setListCategory(dataCategoryMeals.meals);
      }
      if (path === 'drinks') {
        const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataDrinks = await responseDrinks.json();
        setCurrentValue(dataDrinks.drinks);

        const responseCategoryDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const dataCategoryDrinks = await responseCategoryDrinks.json();
        setListCategory(dataCategoryDrinks.drinks);
      }
    };
    fetchData();
  }, [path]);

  return (
    <>
      <h1>Recipes</h1>
      <div>
        {listCategory && (
          listCategory.slice(0, 5).map((category: { strCategory: string }, index) => (
            <button
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          ))
        )}
      </div>
      <main>
        {currentValue && (
          currentValue.slice(0, 12).map((current, index) => (
            <CardRecipes key={ index } data={ current } type={ path } index={ index } />
          ))
        )}
      </main>
    </>
  );
}

export default Recipes;
