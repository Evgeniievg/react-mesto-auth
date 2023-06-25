import React from 'react'
import errorImage from '../images/register-error.svg';
import successImage from '../images/register-ok.svg';


export default function InfoTooltip(props) {

  return (
  <div className={`popup popup-signup ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className={`popup__container`}>
        <button className={`popup__close`} onClick={props.onClose} type="button" aria-label="Закрыть"></button>
        <img className='popup-signup__image' src={props.authData ? successImage : errorImage} />
        <p className='popup-signup__title'>{props.authData ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
      </div>
  </div>
  )
}
