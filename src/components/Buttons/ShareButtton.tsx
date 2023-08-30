import { useState } from 'react';

import iconShare from '../../images/DrinksDetails/shareDrink.svg';

export default function ShareButton({ link }: { link: string }) {
  const [alert, setAlert] = useState('');

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setAlert('Link copied!');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        style={ { background: 'none', border: 'none', padding: '5px' } }
        data-testid="share-btn"
        onClick={ handleClick }
      >
        <img src={ iconShare } alt="aaaaaaaaaa" />
      </button>
      <p>{ alert }</p>
    </div>
  );
}
