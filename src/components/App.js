import "../index.css";
import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from '../utils/auth';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [statusInfoTooltip, setStatusInfoTooltip] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen ||
  isAddPlacePopupOpen || selectedCard || isInfoTooltip;

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);
  
  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          setLoggedIn(true);
          setUserInfo(data.data);
          history.push('/');
        })
        .catch(err => console.log(err));
      }
  }, [history]);

  const handleRegister = (data) => {
    auth.register(data)
      .then(() => {
        setIsInfoTooltip(true);
        setStatusInfoTooltip(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(true);
        setStatusInfoTooltip(false);
      });
  }
  
  const handleLogin = (data) => {
    auth
      .authorize(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserInfo(data);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(true);
        setStatusInfoTooltip(false);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn('false');
    history.push('/sign-in');
  }

  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
  function handleCardClick(card) { setSelectedCard(card) }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(d => d._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.setUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.setUserAvatar({ avatar })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(item) {
    setIsLoading(true);
    api.setCard(item)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          userInfo={userInfo} 
          loggedIn={loggedIn}
          handleLogout={handleLogout}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        {/* <PopupWithForm 
          className="popup popup_type_confirm"
          name="confirm"
          title="Вы уверены?"
          ariaLabel="Да"
          textButton="Да"
          onClose={closeAllPopups}
        >
        </PopupWithForm> */}
        <ImagePopup
          name={"open-card"}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <InfoTooltip 
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          status={statusInfoTooltip}
        />
      </div> 
    </CurrentUserContext.Provider>
  );
}