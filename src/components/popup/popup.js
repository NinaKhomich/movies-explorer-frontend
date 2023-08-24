import './popup.css';

const Popup = ({ isOpen, onClose, overlayClickClose, errorMessage }) => {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={overlayClickClose}
    >
      <div className="popup__container popup__container_type_infotooltip">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="popup__close-btn"
          type="button"
        ></button>
        <p className="popup__infotooltip-message">
          {errorMessage}
        </p>
      </div>
    </div>
  );
}
export default Popup;