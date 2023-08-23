import React from 'react';
import { LocalStorageContext } from './LocalStorageContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function LocalStorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useLocalStorage('user', { email: '' });
  const shared = {
    user,
    setUser,
  };
  return (
    <div>
      <LocalStorageContext.Provider value={ shared }>
        {children}
      </LocalStorageContext.Provider>
    </div>
  );
}
