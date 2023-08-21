import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const email = useLogin('');
  const password = useLogin('');

  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  console.log(regexEmail.test(email.value));
  console.log(email.value);

  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          value={ email.value }
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ ({ target }) => email.handleChange(target.value) }
          placeholder="Email"
        />
        <input
          type="password"
          value={ password.value }
          name="senha"
          data-testid="password-input"
          onChange={ ({ target }) => password.handleChange(target.value) }
          placeholder="Senha"
        />
        <button
          data-testid="login-submit-btn"
          disabled={ password.value.length <= 6 || !regexEmail.test(email.value) }
        >
          Enter
        </button>
      </form>
    </>
  );
}
