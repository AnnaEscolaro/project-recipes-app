import { createContext } from 'react';
import { User } from '../../types/typesLocalStorage';

export type LocalStorageType = {
  user: User
  setUser: (value: User) => void
};

export const LocalStorageContext = createContext({} as LocalStorageType);
