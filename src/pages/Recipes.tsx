import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardRecipes from '../components/CardRecipes';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';
import { MealsContext } from '../context/MealsContext/MealsContext';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

type RecipesProps = {
  path: string,
};

function Recipes({ path } : RecipesProps) {
  const { drinks, setDrinks } = useContext(DrinksContext);
  const { meals, setMeals } = useContext(MealsContext);

  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate();

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

  const handleClickCategory = async (clickedValue: string) => {
    const dataMeals = await api('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataDrinks = await api('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    if (path === 'drinks') {
      const drinksFilteredByCategory = await api(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${clickedValue}`);
      setDrinks(drinksFilteredByCategory?.drinks);
    }
    if (path === 'meals') {
      const mealsFilteredByCategory = await api(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedValue}`);
      setMeals(mealsFilteredByCategory?.meals);
    }
    if (selectedCategory === clickedValue) {
      setMeals(dataMeals?.meals);
      setDrinks(dataDrinks?.drinks);
    } else {
      setSelectedCategory(clickedValue);
    }
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
              onClick={ () => handleClickCategory(categoryBtn.strCategory) }
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
            <Link to={ `/drinks/${current.idDrink}` } key={ index }>
              <CardRecipes data={ current } type={ path } index={ index } />
            </Link>
          ))
        ) : (meals?.slice(0, 12).map((current, index) => (
          <Link to={ `/meals/${current.idMeal}` } key={ index }>
            <CardRecipes key={ index } data={ current } type={ path } index={ index } />
          </Link>
        )))}
      </main>
    </>
  );
}

export default Recipes;
