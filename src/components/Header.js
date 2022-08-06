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
      <Route path="/signup">
        <Link to="/signin" className="header__status">Войти</Link>
      </Route>
      <Route path="/signin">
        <Link to="/signup" className="header__status">Регистрация</Link>
      </Route>
    </header>
  );
}