import "../index.css";
import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import CurrentUserContext from "../contexts/CurrentUserContext";
import * as auth from '../utils/auth';
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
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
  const [deletingСard, setDeletingСard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen ||
  isAddPlacePopupOpen || selectedCard || setDeletingСard || isInfoTooltip;

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
        .then(({ data }) => {
          setLoggedIn(true);
          setUserInfo(data);
          history.push('/');
        })
        .catch(err => console.log(err));
      }
  }, [history]);

  const handleRegister = (data) => {
    auth.register(data)
      .then(() => {
        setIsInfoTooltip(true);
        setIsInfoTooltipSuccess(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(true);
        setIsInfoTooltipSuccess(false);
      });
  }
  
  const handleLogin = (data) => {
    auth
      .authorize(data)
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        setUserInfo(data);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(true);
        setIsInfoTooltipSuccess(false);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn('false');
    history.push('/sign-in');
  }

  const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) }
  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) }
  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) }
  const handleCardClick = (card) => { setSelectedCard(card) }
  const handleCardDelete = (card) => { setDeletingСard(card) }
  
  const closeAllPopups = () =>  {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard(null);
    setDeletingСard(null);
  }

  const handleCardLike = ({ likes, _id }) => {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(_id, !isLiked)
      .then((newCard) => {
        setCards(state => state.map(c => c._id === _id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  const handleСonfirmDelete = (card) => { 
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(d => d._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api.setUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api.setUserAvatar({ avatar })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleAddPlaceSubmit = (item) => {
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
            exact path='/'
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
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />
        <ImagePopup
          name="open-card"
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
        <PopupWithConfirmation
          card={deletingСard}
          onClose={closeAllPopups}
          onСonfirmDelete={handleСonfirmDelete}
          isLoading={isLoading}
        />
        <InfoTooltip 
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          success={isInfoTooltipSuccess}
        />
      </div> 
    </CurrentUserContext.Provider>
  );
}