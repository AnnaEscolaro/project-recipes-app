import { useNavigate } from 'react-router-dom';

export default function Buttons(
  { page, btnName, testID }: { page: string, btnName: string, testID: string },
) {
  const navigate = useNavigate();

  const handleFinish = () => {
    console.log();
  };

  return (
    <button
      style={ { position: 'fixed', bottom: 0, right: 0 } }
      data-testid={ testID }
      onClick={ btnName === 'Finish Recipe' ? handleFinish : () => navigate(page) }
    >
      { btnName }
    </button>
  );
}
