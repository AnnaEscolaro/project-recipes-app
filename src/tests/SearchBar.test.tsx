import { screen } from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';
// import { BrowserRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import { renderWithRouter } from './Helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente SearchBar', () => {
  test('Se as opções de input e o botão search são renderizados na tela meals', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const ingredient = screen.getByLabelText(/Ingredient/i);
    const name = screen.getByLabelText(/Name/i);
    const firstLetter = screen.getByLabelText(/First-Letter/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('Se as opções de input e o botão search são renderizados na tela drinks', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const ingredient = screen.getByLabelText(/Ingredient/i);
    const name = screen.getByLabelText(/Name/i);
    const firstLetter = screen.getByLabelText(/First-Letter/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('testando se o input aparece e some', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const searchButton = screen.getByTestId('btn-Click');
    expect(searchButton).toBeInTheDocument();
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    await user.click(searchButton);
    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  });

//   test('testando se ao clicar no icone perfil a barra de pesquisa some', async () => {
//     const { user } = renderWithRouter(<App />, { route: '/meals' });
//     const oldTitle = screen.getByRole('heading', { name: /meals/i });
//     expect(oldTitle).toBeInTheDocument();
//     const searchButton = screen.getByTestId('profile-top-btn');
//     expect(searchButton).toBeInTheDocument();
//     expect(screen.queryByTestId('btn-Click')).toBeInTheDocument();
//     await user.click(searchButton);
//     expect(screen.queryByTestId('btn-Click')).not.toBeInTheDocument();
//     const title = screen.getByRole('heading', { name: /profile/i });
//     expect(title).toBeInTheDocument();
//   });
});
