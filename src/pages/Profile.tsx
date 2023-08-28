import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';
import StatusButton from '../components/Buttons/StatusButton';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(LocalStorageContext);

  const handleClickLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <h1 data-testid="profile-email">{user.email}</h1>
      <div>
        <StatusButton
          page="/done-recipes"
          btnName="Done Recipes"
          testID="profile-done-btn"
        />
        <button
          onClick={ () => navigate('/favorite-recipes') }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button onClick={ handleClickLogout } data-testid="profile-logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}
