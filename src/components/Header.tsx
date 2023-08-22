import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';

export default function Header() {
  const drinksContext = useContext(DrinksContext);
  const { inputValue, setInputValue } = drinksContext;

  useEffect(() => {
    let trated = '';
    if (inputValue.indexOf('') > -1) {
      trated = inputValue.replace(/\s/g, '_');
      setInputValue(trated);
    }
  }, [setInputValue, inputValue]);

  const path = window.location.pathname;
  const [pathIcon, setPathIcon] = useState<boolean>(false);
  useEffect(() => {
    const newpath = !(
      path === '/profile'
      || path === '/done-recipes'
      || path === '/favorite-recipes'
    );
    setPathIcon(newpath);
  }, [path]);
  const [togleSearch, setTogleSearch] = useState(false);
  const navigate = useNavigate();
  const pathTitle = path.slice(1);
  const newPath = pathTitle
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
  return (
    <header>
      <button onClick={ () => navigate('/profile') }>
        <img src={ ProfileIcon } alt="" data-testid="profile-top-btn" />
      </button>
      {togleSearch ? (
        <div style={ { display: 'inline' } }>
          <input
            type="text"
            data-testid="search-input"
            value={ inputValue }
            onChange={ ({ target }) => setInputValue(target.value.toLowerCase()) }
          />
        </div>
      ) : (
        ''
      )}
      {pathIcon ? (
        <button data-testid="btn-Click" onClick={ () => setTogleSearch(!togleSearch) }>
          <img src={ iconSearch } alt="" data-testid="search-top-btn" />
        </button>
      ) : null}
      <h1 data-testid="page-title">{newPath}</h1>
      <SearchBar />
    </header>
  );
}
