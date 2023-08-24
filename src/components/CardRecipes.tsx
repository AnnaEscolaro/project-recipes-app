type CardRecipesProps = {
  data: {
    strMealThumb?: string,
    strDrinkThumb?: string,
    strMeal?: string,
    strDrink?: string,
  },
  type: string,
  index: number,
};

function CardRecipes({ data, type, index }: CardRecipesProps) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ type === 'meals'
          ? data.strMealThumb
          : data.strDrinkThumb }
        alt="foto receita"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        {
      type === 'meals'
        ? data.strMeal
        : data.strDrink
        }
      </p>
    </div>
  );
}

export default CardRecipes;
