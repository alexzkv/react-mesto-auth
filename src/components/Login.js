export default function Login() {

  return (
    <div className="register-login">
      <h1 className="register-login__title">Вход</h1>
      <form className="register-login__form">
        <input 
          required
          id="login" 
          name="login" 
          type="text" 
          autoComplete="login"
          placeholder="Email"
          className="register-login__input"
        />
        <input
          required
          id="log-password"
          name="log-password"
          type="log-password"
          autoComplete="current-password"
          placeholder="Пароль"
          className="register-login__input"
        />
        <button type="submit" className="register-login__button">Войти</button>
      </form>
    </div>
  )
}