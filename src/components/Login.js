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

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: loginData.email,
      password: loginData.password
    });
  }

  // const [email, setEmail] =useState('');
  // const [password, setPassword] =useState('');

  // const handleChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // }

  // const handleChangePassword = (e) => {
  //   setPassword(e.target.value);
  // }
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onLogin({ email, password });
  // }

  return (
    <div className="register-login">
      <h2 className="register-login__title">Вход</h2>
      <form className="register-login__form" onSubmit={handleSubmit}>
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