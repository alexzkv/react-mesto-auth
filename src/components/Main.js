import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({ 
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  cards, 
  onCardClick, 
  onCardLike, 
  onCardDelete 
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div
          type="button"
          aria-label="Обновить аватар"
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{backgroundImage: `url(${currentUser?.avatar})`}}
        />
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser?.name}</h1>
          <button
            type="button"
            aria-label="Редактировать профиль"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
          <p className="profile__info-subtitle">{currentUser?.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить карточку"
          className="profile__add-card"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="element-grid">
          {cards.map((item) => {
            return (
              <Card 
                key={item._id}
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}