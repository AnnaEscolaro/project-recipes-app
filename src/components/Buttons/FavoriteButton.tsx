import { useContext } from 'react';
import { Recipe } from '../../types/typesLocalStorage';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import noIsFavoriteIcon from '../../images/whiteHeartIcon.svg';
import {
  LocalStorageContext,
} from '../../context/LocalStorageContext/LocalStorageContext';

export default function FavoriteButton({ favoriteRecipe }: { favoriteRecipe: Recipe }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(LocalStorageContext);

  const favorite = favoriteRecipes.some(
    (recipe) => recipe.id === favoriteRecipe.id,
  );

  const handleClickFavorite = () => {
    if (favorite) {
      const newFavorite = favoriteRecipes.filter(
        (recipe) => recipe.id !== favoriteRecipe.id,
      );
      setFavoriteRecipes(newFavorite);
    } else {
      setFavoriteRecipes([...favoriteRecipes, favoriteRecipe]);
    }
  };

  return (
    <button
      onClick={ handleClickFavorite }
    >
      favorite
      <img
        data-testid="favorite-btn"
        src={ favorite ? favoriteIcon : noIsFavoriteIcon }
        alt=""
      />
    </button>
  );
}
