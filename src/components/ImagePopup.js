export default function ImagePopup({ card, name, onClose }) {
  return (
    <div className={card ? `popup popup_type_${name} popup_opened` : `popup`}>
      <div className="popup__container popup__container_open_img">
        <button
          type="button"
          aria-label="Закрыть форму"
          className="popup__close"
          onClick={onClose}
        />
        <figure className="popup__big-img">
          <img 
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
            className="popup__image"
          />
          <p className="popup__image-title">{card ? card.name : ""}</p>
        </figure>
      </div>
    </div>
  );
}