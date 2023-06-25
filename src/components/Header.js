import React, {useState, useEffect} from 'react';
import logo from '../images/logo.svg';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as auth from '../utils/auth';

export const Header = ({ isLoggedIn, handleLoggedin }) => {
  const [email, setEmail] = useState('');
  const [burgerClicked, setBurgerClicked] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();
  const showBurgerMenu = currentUrl !== '/sign-in' && currentUrl !== '/sign-up';

  function handleBurgerClick() {
    setBurgerClicked(!burgerClicked);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    handleLoggedin(false)
  }

  function getEmail() {
    const jwt = localStorage.getItem('jwt');
    auth
      .getContent(jwt)
      .then((data) => {
        if (isLoggedIn) {
          setEmail(data.data.email);
        } else {
          setEmail('');
        }
      })
      .catch((error) => {
        console.log('Ошибка при получении email:', error);
      });
  }

  useEffect(() => {
    if (currentUrl === '/') {
      getEmail();
    }
  }, [currentUrl]);


  return (
    <header className={`header${burgerClicked  && isLoggedIn ? ' active-mobile' : ''}`}>
      <div className={`header-mobile${burgerClicked && isLoggedIn ? ' active' : '' }`}>
        <img alt="Место" src={logo} className="header__image" />
        {showBurgerMenu && (
          <div className={`header__burger${burgerClicked ? ' active' : ''}`} onClick={handleBurgerClick}>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </div>
        )}
      </div>
      <div className={`header__texts${burgerClicked && isLoggedIn ? ' active-mobile' : !showBurgerMenu ? '' : ' disable-mobile'}`}>
        {isLoggedIn ? <p className="header__email">{email}</p> : ''}
        {
        currentUrl === '/sign-in' ?
        <Link to='/sign-up' className='header__link'>Регистрация</Link> :
        currentUrl === '/sign-up' ?
        <Link to='/sign-in' className='header__link'>Войти</Link> :
        <button onClick={signOut} className="header__button">
          Выйти
        </button>
        }
      </div>
    </header>
  );
};
