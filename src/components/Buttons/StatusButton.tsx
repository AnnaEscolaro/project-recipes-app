import { useNavigate } from 'react-router-dom';

export default function Buttons(
  { page, btnName, testID, visibility = false }
  : { page: string, btnName: string, testID: string, visibility?: boolean },
) {
  const navigate = useNavigate();

  const handleFinish = () => {
    // navega para pagina de DoneRecipes e Adiciona Receita na chave DoneRecipes do localStorage
    console.log();
  };

  return (
    <button
      style={ { position: 'fixed', bottom: 0, right: 0 } }
      data-testid={ testID }
      onClick={ btnName === 'Finish Recipe' ? handleFinish : () => navigate(page) }
      disabled={ visibility }
    >
      { btnName }
    </button>
  );
}
