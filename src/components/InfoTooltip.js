import successfully from "../images/successfully.svg";
import error from "../images/error.svg";

export default function InfoTooltip({ isOpen, onClose, success }) {
  return (
    <div className={`popup popup_type_infotooltip ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container">
        <div className="popup__box-infotooltip">
          <img src={success ? successfully : error} alt="Статус регистрации" className="popup__image" />
          <p className="popup__status">
            {success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}
          </p>
          <button onClick={onClose} aria-label="Кнопка закрытия" type="button" className="popup__close"></button>
        </div>
      </div>
    </div>
  ) 
}