import { createContext } from 'react';

export type LocalStorageType = {
  user: { email: string }
  setUser: (value: { email: string }) => void
};

export const LocalStorageContext = createContext({} as LocalStorageType);
