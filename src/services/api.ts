export async function api(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const drinksSearch = async (filter: string, inputValue: string) => {
  if (filter === 'ingredient') {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  if (filter === 'name') {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  if (filter === 'first-letter') {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
};

export const mealsSearch = async (filter: string, inputValue: string) => {
  if (filter === 'ingredient') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  if (filter === 'name') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  if (filter === 'first-letter') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
};
