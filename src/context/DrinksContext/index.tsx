import { DrinksContext } from './DrinksContext';

export function DrinksProvider({ children }: { children: React.ReactNode }) {
  const shared = {
    any: '',
  };

  return (
    <DrinksContext.Provider value={ shared }>
      { children }
    </DrinksContext.Provider>
  );
}
