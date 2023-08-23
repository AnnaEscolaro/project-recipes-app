import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouter } from './Helpers/renderWithRouter';
import { MockFetchDrinks } from './Mocks/MockFetchDrinks';
import App from '../App';

describe('Testando o componente SearchBar', () => {
  const searchInput = 'search-input';
  //   const expectedDrink = 'Munich Mule';

  beforeEach(() => {
    window.alert = vi.fn(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => MockFetchDrinks,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
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

  //   test('Se o filtro ingredient funciona corretamente na tela drinks', async () => {
  //     const { user } = renderWithRouter(<App />, { route: '/drinks' });
  //     const ingredient = screen.getByLabelText(/Ingredient/i);
  //     const searchButtonHeader = screen.getByTestId('btn-Click');
  //     const searchButtonBar = screen.getByRole('button', { name: /Search/i });

  //     await user.click(searchButtonHeader);
  //     const textInput = screen.getByTestId(searchInput);
  //     await user.type(textInput, 'Gin');
  //     await user.click(ingredient);
  //     await user.click(searchButtonBar);
  //     const drink = await screen.findByText(expectedDrink);

  //     expect(drink).toBeInTheDocument();
  //   });

  //   test('Se o filtro name funciona corretamente na tela drinks', async () => {
  //     const { user } = renderWithRouter(<App />, { route: '/drinks' });
  //     const name = screen.getByLabelText(/Name/i);
  //     const searchButtonHeader = screen.getByTestId('btn-Click');
  //     const searchButtonBar = screen.getByRole('button', { name: /Search/i });

  //     await user.click(searchButtonHeader);
  //     const textInput = screen.getByTestId(searchInput);
  //     await user.type(textInput, 'munich');
  //     await user.click(name);
  //     await user.click(searchButtonBar);

  //     const drink = await screen.findByText(expectedDrink);
  //     expect(drink).toBeInTheDocument();
  //   });

  //   test('Se o filtro firstletter funciona corretamente na tela drinks', async () => {
  //     const { user } = renderWithRouter(<App />, { route: '/drinks' });
  //     const firstLetter = screen.getByLabelText(/First-Letter/i);
  //     const searchButtonHeader = screen.getByTestId('btn-Click');
  //     const searchButtonBar = screen.getByRole('button', { name: /Search/i });

  //     await user.click(searchButtonHeader);
  //     const textInput = screen.getByTestId(searchInput);
  //     await user.type(textInput, 'm');
  //     await user.click(firstLetter);
  //     await user.click(searchButtonBar);

  //     const drink = await screen.findByText(expectedDrink);
  //     expect(drink).toBeInTheDocument();
  //   });

  test('Se aparece um alerta na tela de drinks caso sejam digitadas mais de uma letra no filtro firstletter', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const firstLetter = screen.getByLabelText(/First-Letter/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 'aa');
    await user.click(firstLetter);
    await user.click(searchButtonBar);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});

describe(('Testando o alerta de receita não encontrada'), () => {
  test('Se aparece um alerta na tela de drinks caso a receita não exista', async () => {
    window.alert = vi.fn(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => null,
    });

    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const ingredient = screen.getByLabelText(/Ingredient/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId('search-input');
    await user.type(textInput, 'trybe@trybe');
    await user.click(ingredient);
    await user.click(searchButtonBar);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
