import { NavLink } from 'react-router-dom';

import iconDrink from '../images/drinkIcon.svg';
import iconFood from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ { display: 'flex', position: 'fixed', bottom: 0, left: '50vw' } }
    >
      <nav>
        <NavLink to="/drinks">
          <img src={ iconDrink } data-testid="drinks-bottom-btn" alt="" />
        </NavLink>
        <NavLink to="meals">
          <img src={ iconFood } data-testid="meals-bottom-btn" alt="" />
        </NavLink>
      </nav>
    </footer>
  );
}
