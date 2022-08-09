import { useState } from "react"
import { Route, Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  }

  const hadleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email: registerData.email,
      password: registerData.password
    });
  }

  return (
    <div className="register-login">
      <h2 className="register-login__title">Регистрация</h2>
      <form className="register-login__form" onSubmit={hadleSubmit}>
        <input
          required
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="register-login__input"
          onChange={handleChange}
          value={registerData.email}
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Пароль"
          className="register-login__input"
          onChange={handleChange}
          value={registerData.password}
          />
        <button
          type="submit"
          className="register-login__button register-login__button_type_register"
        >Зарегистрироваться
        </button>
      </form>
      <p className="register-login__welcome">Уже зарегистрированы?&nbsp;
        <Route path='/sign-up'>
          <Link
            to='/sign-in' 
            className="register-login__welcome register-login__welcome_enter"
          >Войти</Link>
        </Route>
      </p>
    </div>
  )
}