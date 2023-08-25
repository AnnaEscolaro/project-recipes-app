import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

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
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <img
        src={ image }
        alt="foto receita"
        data-testid={ `${index}-horizontal-image` }
      />
      {
        type === 'meal' ? (
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${nationality} - ${category}` }
          </p>
        ) : (<p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>)
      }
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <button data-testid={ `${index}-horizontal-share-btn` }>{ shareIcon }</button>
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
        data-testid="share-btn"
        onClick={ () => handleClick(`http://localhost:3000/${type}/${id}`) }
      >
        Share
      </button>
    </div>
  );
}

export default CardDoneRecipes;
