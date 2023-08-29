import { Link } from 'react-router-dom';

type CardDoneRecipesProps = {
  id: string,
  type: string,
  index: number,
  category: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
  nationality: string,
  alcoholicOrNot: string,
  handleClick: (link: string) => void,
  alert: string,
};

function CardDoneRecipes({
  id,
  type,
  index,
  category,
  name,
  image,
  doneDate,
  tags,
  nationality,
  alcoholicOrNot,
  handleClick,
  alert,
}: CardDoneRecipesProps) {
  return (
    <div id="done-recipes-card">
      <Link
        to={ `/${type}s/${id}` }
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </Link>
      <Link
        to={ `/${type}s/${id}` }
      >
        <img
          id="recipe-image"
          src={ image }
          alt="foto receita"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      {
        type === 'meal' ? (
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${nationality} - ${category}` }
          </p>
        ) : (<p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>)
      }
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      {
        tags.map((tag, idx) => (
          <p
            key={ idx }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        ))
      }
      { alert }
      <button
        // data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => handleClick(`http://localhost:3000/${type}s/${id}`) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src="src/images/shareIcon.svg"
          alt="imagem compartilhar"
        />
      </button>
    </div>
  );
}

export default CardDoneRecipes;