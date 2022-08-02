export default function Register() {

  return (
    <div className="register-login">
      <h1 className="register-login__title">Регистрация</h1>
      <form className="register-login__form">
        <input
          required
          id="email"
          name="email"
          type="text"
          autoComplete="email"
          placeholder="Email"
          className="register-login__input"/>
        <input
          required
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Пароль"
          className="register-login__input"/>
        <button type="submit" className="register-login__button register-login__button_type_register">Зарегистрироваться</button>
      </form>
      <p className="register-login__welcome">Уже зарегистрированы? Войти</p>
    </div>
  )
}