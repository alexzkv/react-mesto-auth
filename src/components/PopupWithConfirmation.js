import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation({ 
  card, 
  onClose, 
  isLoading, 
  onСonfirmDelete
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onСonfirmDelete(card);
  }

  return (
    <PopupWithForm 
      className="popup popup_type_confirm"
      name="confirm"
      title="Вы уверены?"
      aria-label="Да"
      textButton={isLoading ? "Удаление..." : "Да"}
      isOpen={card}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
    </PopupWithForm>
  )
}