// import { useState } from "react"
import { Route, Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  // const [registerData, setRegisterData] = useState({
  //   email: '',
  //   pssword: ''
  // });

  // const [message, setMessage] = useState('');

  // function handleChange(e) {
  //   setMessage('');
  //   const { name, value } = e.target;
  //   setRegisterData({
  //     ...registerData,
  //     [name]: value
  //   });
  // }

  // function hadleSubmit(e) {
  //   e.preventDefault();
  //   onRegister({ })
  // }

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
      <p className="register-login__welcome">Уже зарегистрированы?&nbsp;
        <Route path="/sign-up">
          <Link to="/sign-in" className="register-login__welcome register-login__welcome_enter">Войти</Link>
        </Route>
      </p>
    </div>
  )
}