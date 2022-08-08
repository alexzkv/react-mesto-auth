import { Route, NavLink, Switch } from 'react-router-dom';
import logo from "../images/logo-mesto.svg";

export default function Header({ userInfo, handleLogout }) {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Лого Место Россия"
        className="header__logo"
      />
      <Switch>
        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__status">Войти</NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__status">Регистрация</NavLink>
        </Route>
        <Route path="/">
          <div className="header__box">
            <p className="header__status">{userInfo.email}</p>
            <NavLink to="/sign-in" className="header__status" onClick={handleLogout}>Выйти</NavLink>
          </div>
        </Route>
      </Switch>
    </header>
  );
}