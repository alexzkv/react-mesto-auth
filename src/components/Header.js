import { Route, Link } from 'react-router-dom';
import logo from "../images/logo-mesto.svg";

export default function Header() {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Лого Место Россия"
        className="header__logo"
      />
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__status">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__status">Регистрация</Link>
      </Route>
    </header>
  );
}