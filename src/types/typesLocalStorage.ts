export type User = {
  email: string,
};

export type DoneRecipe = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
};

export type DoneRecipes = DoneRecipe[];

export type Recipe = [{
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string
}];

type FavoriteRecipes = Recipe[];

/* export type InProgressRecipes = {
  drinks: {
    [key: string ]: DrinksDetails[]
  },
  meals: {
    [key: string ]: Meals[]
  }
}; */

export type LocalStorage = User | DoneRecipes | FavoriteRecipes;
