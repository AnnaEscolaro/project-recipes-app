import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProfileIcon from '../images/icone-perfil (1).png';
import iconSearch from '../images/icone pesquiar.png';
import AppIcon from '../images/ícone Recipes app.png';
import RecipesTitle from '../images/App.svg';
import AppTitle from '../images/Recipes.svg';
import SearchBar from './SearchBar';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';

export default function Header() {
  const drinksContext = useContext(DrinksContext);
  const { inputValue, setInputValue } = drinksContext;

  useEffect(() => {
    let trated = '';
    if (inputValue.indexOf(' ') > -1) {
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
  const [toggleSearch, setToggleSearch] = useState(false);
  const navigate = useNavigate();
  const pathTitle = path.slice(1).toUpperCase();
  const newPath = pathTitle
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
  return (
    <header>
      <div className="header-top">
        <div className="icon-name">
          <img src={ AppIcon } alt="app-icon" />
          <div className="app-title">
            <img src={ AppTitle } alt="app-t" />
            <img
              src={ RecipesTitle }
              alt="recipes-t"
              style={ { margin: '7px 0 0 1px' } }
            />
          </div>
        </div>
        <div className="search-profile">
          {pathIcon ? (
            <button
              data-testid="btn-Click"
              onClick={ () => setToggleSearch(!toggleSearch) }
            >
              <img
                style={ { paddingRight: '10px' } }
                src={ iconSearch }
                alt="icon-search"
                data-testid="search-top-btn"
              />
            </button>
          ) : null}
          <button onClick={ () => navigate('/profile') }>
            <img
              src={ ProfileIcon }
              alt="icon-profile"
              data-testid="profile-top-btn"
              style={ { paddingRight: '5px' } }
            />
          </button>
        </div>
      </div>
      <h1
        data-testid="page-title"
        className="page-title"
      >
        {newPath}
      </h1>
      <div className="search-details">
        {toggleSearch ? (
          <div style={ { display: 'inline' } }>
            <input
              style={ {
                width: '70vw',
                border: '0.5px solid black',
                borderRadius: '5px',
                padding: '5px',
              } }
              type="text"
              data-testid="search-input"
              value={ inputValue }
              onChange={ ({ target }) => setInputValue(target.value) }
              placeholder="Search"
            />
          </div>
        ) : (
          ''
        )}
        <SearchBar />
      </div>
    </header>
  );
}
