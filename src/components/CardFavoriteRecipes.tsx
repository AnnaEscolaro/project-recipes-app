// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import { Recipe } from '../types/typesLocalStorage';
import FavoriteButton from './Buttons/FavoriteButton';

type CardFavoriteRecipesProps = {
  recipe: Recipe,
  index: number,
};

function CardFavoriteRecipes({
  recipe, index }: CardFavoriteRecipesProps) {
  const { alcoholicOrNot, category, id, image, name, nationality, type } = recipe;

  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleShare = async (link: string) => {
    await navigator.clipboard.writeText(link);
    setAlertMessage('Link copied!');
    setTimeout(() => {
      setAlertMessage('');
      console.log(alertMessage);
    }, 2000);
  };

  return (
    <div id="done-recipes-card">
      <a
        href={ `/${type}s/${id}` }
      >
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </p>
      </a>
      <a
        href={ `/${type}s/${id}` }
      >
        <img
          width="360px"
          src={ image }
          alt="foto receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </a>
      {
        type === 'meal'
          ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${nationality} - ${category}` }
            </p>)
          : (<p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>)
      }
      { alertMessage }
      <button
        onClick={ () => handleShare(`http://localhost:3000/${type}s/${id}`) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="imagem compartilhar"
        />
      </button>
      <FavoriteButton
        favoriteRecipe={ recipe }
        testId={ `${index}-horizontal-favorite-btn` }
      />
    </div>
  );
}

export default CardFavoriteRecipes;
