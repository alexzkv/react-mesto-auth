import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete ${ isOwn ? "" : "card__delete_disabled" }`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-btn ${ isLiked ? "card__like-btn_active" : "" }`
  );

  function handleClick() { onCardClick(card) }
  function handleLikeClick() { onCardLike(card) }
  function handleDeleteClick() { onCardDelete(card) }

  return (
    <li className="card">
      <img 
        src={card.link} 
        alt={card.name}
        className="card__img"
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Удалить карточку"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <p className="card__title">{card.name}</p>
        <div className="card__like-box">
          <button
            type="button"
            aria-label="Лайкнуть сердечко"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-count">
            {card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}