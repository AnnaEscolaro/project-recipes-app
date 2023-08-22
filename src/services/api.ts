export async function api(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const nullAlert = (data: any) => {
  const alert = 'Sorry, we haven\'t found any recipes for these filters.';
  if (data.meals === null || data.drinks === null) {
    window.alert(alert);
  }
};

export const drinksSearch = async (filter: string, inputValue: string, page: string) => {
  if (filter === 'ingredient' && page === 'drinks') {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const data = await response.json();
      nullAlert(data);
      return data.drinks;
    } catch (error) {
      return error;
    }
  }

  if (filter === 'name' && page === 'drinks') {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const data = await response.json();
      nullAlert(data);
      return data.drinks;
    } catch (error) {
      return error;
    }
  }

  if (filter === 'first-letter' && page === 'drinks') {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const data = await response.json();
      nullAlert(data);
      return data.drinks;
    } catch (error) {
      return error;
    }
  }
};

export const mealsSearch = async (filter: string, inputValue: string, page: string) => {
  if (filter === 'ingredient' && page === 'meals') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const data = await response.json();
      nullAlert(data);
      return data.meals;
    } catch (error) {
      return error;
    }
  }

  if (filter === 'name' && page === 'meals') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      nullAlert(data);
      return data.meals;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  if (filter === 'first-letter' && page === 'meals') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      const data = await response.json();
      nullAlert(data);
      return data.meals;
    } catch (error) {
      return error;
    }
  }
};
