import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup-image popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-image__container">
        <button className="popup-image__close popup__close" aria-label="Закрыть" type="button" onClick={props.onClose}></button>
        {props.isOpen && (
          <>
            <img className="popup-image__image" src={props.isOpen.link} alt={props.isOpen.name} />
            <p className="popup-image__title">{props.isOpen.name}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;
