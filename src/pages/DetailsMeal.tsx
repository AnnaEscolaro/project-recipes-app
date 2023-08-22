import { useLocation } from 'react-router-dom';

export default function DetailsMeal() {
  const loc = useLocation();

  return (
    <div>
      Details Meal
      { ' ' }
      { loc.pathname }
    </div>
  );
}
