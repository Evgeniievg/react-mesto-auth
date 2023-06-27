import React from 'react'
import errorImage from '../images/register-error.svg';
import successImage from '../images/register-ok.svg';

export default function InfoTooltip({ onClose, isOpen, authData, popupAuthText }) {

  return (
  <div className={`popup popup-signup ${isOpen ? 'popup_opened' : ''}`} >
      <div className={`popup__container`}>
        <button className={`popup__close`} onClick={onClose} type="button" aria-label="Закрыть"></button>
        <img className='popup-signup__image' src={authData ? successImage : errorImage} />
        <p className='popup-signup__title'>{popupAuthText}</p>
      </div>
  </div>
  )
}
