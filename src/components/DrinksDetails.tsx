import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drinks, Meals } from '../types/typesApi';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';
import { Recipe } from '../types/typesLocalStorage';
import favoriteIcon from '../images/blackHeartIcon.svg';
import noIsFavoriteIcon from '../images/whiteHeartIcon.svg';

export default function DrinksDetail({
  drink,
  handleClick,
  alert,
  handleClickFavorite,
}: {
  drink: Drinks;
  handleClick: (link: string) => void;
  alert: string;
  handleClickFavorite: (FavoriteRecipe: Recipe) => void;
}) {
  const [data, setData] = useState<Meals[]>([]);

  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = drink;

  const ingredients = Object.entries(drink).reduce(
    (acc: string[], curr: string[]) => {
      if (curr[0].includes('strIngredient') && curr[1] !== null) {
        acc.push(curr[1]);
      }
      return acc;
    },
    [],
  );

  const [isFavorite, setIsFavorite] = useState<boolean>();

  const measures = Object.entries(drink).reduce(
    (acc: string[], curr: string[]) => {
      if (curr[0].includes('strMeasure') && curr[1] !== null) {
        acc.push(curr[1]);
      }
      return acc;
    },
    [],
  );

  const { inProgressRecipes,
    doneRecipes, favoriteRecipes } = useContext(LocalStorageContext);

  const recipeStatus = () => {
    if (inProgressRecipes.drinks[drink.idDrink]) {
      return 'Continue Recipe';
    }
    if (doneRecipes.some((recipe) => recipe.id === drink.idDrink)) {
      return '';
    }
    return 'Start Recipe';
  };

  const status = recipeStatus();

  useEffect(() => {
    const recommendationDrink = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );
        const mealsRecommendation = await response.json();
        setData(mealsRecommendation.meals);
      } catch (error) {
        console.log(error);
      }
    };
    recommendationDrink();
    setIsFavorite(
      favoriteRecipes.some((recipe) => recipe.id === drink.idDrink),
    );
  }, [favoriteRecipes, drink.idDrink]);

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
      <ul>
        Ingredientes:
        {ingredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {measures[index] === undefined
              ? `${ingredient}`
              : `${ingredient} - ${measures[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <div style={ { display: 'flex', overflowY: 'scroll' } }>
        {data
          && data.slice(0, 6).map((meals, index) => (
            <div
              key={ meals.strMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ meals.strMealThumb }
                alt={ meals.strMeal }
                style={ { width: '50vw' } }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {meals.strMeal}
              </p>
            </div>
          ))}
      </div>
      {(status === 'Continue Recipe' || status === 'Start Recipe') && (
        <Link
          to={ `/drinks/${drink.idDrink}/in-progress` }
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0, right: 0 } }
        >
          {status}
        </Link>
      )}
      <p>{alert}</p>
      <div>
        <button
          data-testid="share-btn"
          onClick={ () => handleClick(`http://localhost:3000/drinks/${drink.idDrink}`) }
        >
          Share
        </button>
        <button
          onClick={ () => handleClickFavorite({
            id: drink.idDrink,
            type: 'drink',
            category: drink.strCategory,
            nationality: '',
            alcoholicOrNot: drink.strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
          }) }
        >
          favorite
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? favoriteIcon : noIsFavoriteIcon }
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
