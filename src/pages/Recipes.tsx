import { useContext, useEffect, useState } from 'react';
import CardRecipes from '../components/CardRecipes';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';
import { MealsContext } from '../context/MealsContext/MealsContext';
import { api } from '../services/api';

type RecipesProps = {
  path: string,
};

function Recipes({ path } : RecipesProps) {
  const [listCategory, setListCategory] = useState([]);
  // const [toggle, setToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { drinks, setDrinks } = useContext(DrinksContext);
  const { meals, setMeals } = useContext(MealsContext);

  useEffect(() => {
    const fetchData = async () => {
      if (path === 'meals' && meals?.length === 0) {
        const dataMeals = await api('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setMeals(dataMeals?.meals);

        const dataCategoryMeals = await api('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        setListCategory(dataCategoryMeals?.meals);
      }
      if (path === 'drinks' && drinks?.length === 0) {
        const dataDrinks = await api('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setDrinks(dataDrinks?.drinks);

        const dataCategoryDrinks = await api('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        setListCategory(dataCategoryDrinks?.drinks);
      }
    };
    fetchData();
  }, []);

  const handleClickCategory = async ({ target }: any) => {
    const clickedValue = target.id.replace(' ', '_');
    setSelectedCategory(clickedValue);
    if (path === 'drinks') {
      const drinksFilteredByCategory = await api(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${clickedValue}`);
      setDrinks(drinksFilteredByCategory?.drinks);
    }
    if (path === 'meals') {
      const mealsFilteredByCategory = await api(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedValue}`);
      setMeals(mealsFilteredByCategory?.meals);
    }
    // if (toggle === true && selectedCategory === clickedValue) {
    //   handleClickClear();
    // }
    // setToggle(!toggle);
  };

  const handleClickClear = async () => {
    if (path === 'drinks') {
      const dataDrinks = await api('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinks(dataDrinks?.drinks);
    }
    if (path === 'meals') {
      const dataMeals = await api('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMeals(dataMeals?.meals);
    }
  };

  return (
    <>
      <h1>Recipes</h1>
      <div>
        {listCategory && (
          listCategory.slice(0, 5).map((categoryBtn: { strCategory: string }, index) => (
            <button
              key={ index }
              data-testid={ `${categoryBtn.strCategory}-category-filter` }
              id={ categoryBtn.strCategory }
              onClick={ handleClickCategory }
            >
              {categoryBtn.strCategory}
            </button>
          ))
        )}
        <button
          data-testid="All-category-filter"
          onClick={ handleClickClear }
        >
          All
        </button>
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
