import { MealsContext } from './MealsContext';

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const shared = {
    any: '',
  };

  return (
    <MealsContext.Provider value={ shared }>
      { children }
    </MealsContext.Provider>
  );
}
