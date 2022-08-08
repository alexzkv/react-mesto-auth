import { useState } from "react"

export default function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setLoginData({
      ...loginData,
      [name]: value
    });
  }

  const hadleSubmit = (e) => {
    e.preventDefault();
    onLogin(
      loginData.email,
      loginData.password
    );
  }

  return (
    <div className="register-login">
      <h2 className="register-login__title">Вход</h2>
      <form className="register-login__form" onSubmit={hadleSubmit}>
        <input 
          required
          id="login" 
          name="login"
          type="email"
          autoComplete="login"
          placeholder="Email"
          className="register-login__input"
          onChange={handleChange}
          // value={loginData.email || ''}
        />
        <input
          required
          id="log-password"
          name="log-password"
          type="text"
          autoComplete="current-password"
          placeholder="Пароль"
          className="register-login__input"
          onChange={handleChange}
          // value={loginData.password || ''}
        />
        <button type="submit" className="register-login__button">Войти</button>
      </form>
    </div>
  )
}