import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './Helpers/renderWithRouter';

describe('Testando o componente Login', () => {
  const VALID_EMAIL = 'tryber@test.com';

  test('Verifica se o componente renderiza corretamente quando esta na rota "/"', () => {
    renderWithRouter(<App />, { route: '/' });

    const title = screen.getByRole('heading', { name: /Login/i });
    expect(title).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Verifica se a validação funciona corretamente', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    await user.type(emailInput, VALID_EMAIL);
    await user.type(passwordInput, '123456');
    expect(loginButton).toBeDisabled();
    expect(emailInput).toHaveValue(VALID_EMAIL);
    expect(passwordInput).toHaveValue('123456');
    expect(loginButton).toBeDisabled();
    await user.clear(emailInput);
    await user.clear(passwordInput);

    await user.type(emailInput, 'tryber@test');
    await user.type(passwordInput, '1234567');
    expect(loginButton).toBeDisabled();
    user.clear(emailInput);
    user.clear(passwordInput);

    await user.type(emailInput, VALID_EMAIL);
    await user.type(passwordInput, '1234567');
    expect(loginButton).toBeEnabled();
  });
});
