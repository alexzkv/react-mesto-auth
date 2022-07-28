import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ 
  isOpen, 
  onClose, 
  onAddPlace, 
  isLoading 
}) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLink("");
      setTitle("");
    }
  }, [isOpen]);

  function handleChangeLink(e) { setLink(e.target.value) }
  function handleChangeTitle(e) { setTitle(e.target.value) }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ link: link, name: title });
  }

   return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      ariaLabel="Создать"
      textButton={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        name="item-name"
        id="card-name"
        type="text"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        value={title || ""}
        onChange={handleChangeTitle}
        className="popup__input popup__input_card_name"
      />
      <span id="card-name-error" className="popup__error"></span>
      <input
        name="item-link"
        id="card-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleChangeLink}
        className="popup__input popup__input_card_link"
      />
      <span id="card-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}