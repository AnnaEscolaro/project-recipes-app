// import { useNavigate } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { Recipe } from '../types/typesLocalStorage';
import FavoriteButton from './Buttons/FavoriteButton';

type CardFavoriteRecipesProps = {
  recipe: Recipe,
  index: number,
  handleShare: (link: string) => void,
  alert: string,
};

function CardFavoriteRecipes({
  recipe, index, handleShare, alert }: CardFavoriteRecipesProps) {
  const { alcoholicOrNot, category, id, image, name, nationality, type } = recipe;

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
      { alert }
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
