import { Switch, Route, Link } from 'react-router-dom';
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
        <Route path='/sign-up'>
          <Link to='/sign-in' className="header__status">Войти</Link>
        </Route>
        <Route path='/sign-in'>
          <Link to='/sign-up' className="header__status">Регистрация</Link>
        </Route>
        <Route exact path='/'>
          <>
            <div className="header__menu">
              <p className="header__status">{userInfo.email}</p>
              <Link
                to='/sign-in'
                className="header__status"
                onClick={handleLogout}
              >Выйти</Link>
            </div>
          </>
        </Route>
      </Switch>
    </header>
  );
}