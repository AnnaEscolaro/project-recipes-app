import { useContext, useEffect, useState } from 'react';
import CardRecipes from '../components/CardRecipes';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';
import { MealsContext } from '../context/MealsContext/MealsContext';

type RecipesProps = {
  path: string,
};

function Recipes({ path } : RecipesProps) {
  // const [currentValue, setCurrentValue] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const { drinks, setDrinks } = useContext(DrinksContext);
  const { meals, setMeals } = useContext(MealsContext);

  useEffect(() => {
    const fetchData = async () => {
      if (path === 'meals' && meals?.length === 0) {
        const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataMeals = await responseMeals?.json();
        setMeals(dataMeals?.meals);

        const responseCategoryMeals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const dataCategoryMeals = await responseCategoryMeals?.json();
        setListCategory(dataCategoryMeals?.meals);
      }
      if (path === 'drinks' && drinks?.length === 0) {
        const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataDrinks = await responseDrinks?.json();
        setDrinks(dataDrinks?.drinks);

        const responseCategoryDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const dataCategoryDrinks = await responseCategoryDrinks?.json();
        setListCategory(dataCategoryDrinks?.drinks);
      }
    };
    fetchData();
  }, [path, meals, drinks, setDrinks, setMeals]);

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
        {path === 'drinks' && drinks?.length > 0 ? (
          drinks?.slice(0, 12).map((current, index) => (
            <CardRecipes key={ index } data={ current } type={ path } index={ index } />
          ))
        ) : (meals?.slice(0, 12).map((current, index) => (
          <CardRecipes key={ index } data={ current } type={ path } index={ index } />
        )))}
      </main>
    </>
  );
}

export default Recipes;
