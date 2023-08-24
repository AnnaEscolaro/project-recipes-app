type CardDoneRecipesProps = {
  id: string,
  index: number,
  category: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
};

function CardDoneRecipes({
  id,
  index,
  category,
  name,
  image,
  doneDate,
  tags,
}: CardDoneRecipesProps) {
  return (
    <div id="done-recipes-card">
      <img
        src={ image }
        alt="foto receita"
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>
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
    </div>
  );
}

export default CardDoneRecipes;
