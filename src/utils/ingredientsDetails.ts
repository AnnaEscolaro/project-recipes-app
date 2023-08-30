import { Drinks } from '../types/typesApi';

export const ingredientsDetails = (drink: Drinks) => {
  const ingredientsAndNumbers = Object.entries(drink).reduce(
    (acc: string[], curr: string[]) => {
      if (
        curr[0].includes('strIngredient')
                && curr[1] !== null
                && curr[1] !== ''
      ) {
        acc.push(`${curr[0].substring(curr[0].length - 1)} ${curr[1]}`);
      }
      return acc;
    },
    [],
  );
  return ingredientsAndNumbers;
};
