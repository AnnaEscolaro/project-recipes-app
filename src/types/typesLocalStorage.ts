type User = {
  email: string,
};

type DoneRecipe = {
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

type DoneRecipes = DoneRecipe[];

type Recipe = [{
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
    [key: string ]: Ingredients[]
  },
  meals: {
    [key: string ]: Ingredients[]
  }
}; */

export type LocalStorage = User | DoneRecipes | FavoriteRecipes;
