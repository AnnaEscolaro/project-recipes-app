import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './Helpers/renderWithRouter';

describe('Testando o componente Header', () => {
  test('testando se o componente aparece na tela quando esta na rota meals com todos as informações', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();
  });
  test('testando se o input aparece e some', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const searchButton = screen.getByTestId('btn-Click');
    expect(searchButton).toBeInTheDocument();
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    await user.click(searchButton);
    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  });
  test('testando se ao clicar no icone perfil a barra de pesquisa some', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const oldTitle = screen.getByRole('heading', { name: /meals/i });
    expect(oldTitle).toBeInTheDocument();
    const searchButton = screen.getByTestId('profile-top-btn');
    expect(searchButton).toBeInTheDocument();
    expect(screen.queryByTestId('btn-Click')).toBeInTheDocument();
    await user.click(searchButton);
    expect(screen.queryByTestId('btn-Click')).not.toBeInTheDocument();
    const title = screen.getByRole('heading', { name: /profile/i });
    expect(title).toBeInTheDocument();
  });
});
