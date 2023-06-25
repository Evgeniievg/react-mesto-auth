import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import { Header } from './Header';
import Main from './Main';
import api from '../utils/api';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';


function App() {

  const [currentUser , setСurrentUser ] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [authData, setAuthData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;


  useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setСurrentUser(userInfo)
      })
      .catch((error) => {
        console.log('Ошибка при загрузке данных пользователя:', error);
      });
    api.fetchCards(cards).then((data) => {
      setCards(data)
      }).catch((error) => {
         console.log('Ошибка при загрузке карточек:', error);
       });
  }, []);

  const [cards, setCards] = useState([])

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    }).catch((error) => console.error(`Ошибка при клике на лайк : ${error}`))
}

function handleCardDelete(card){
  api.deleteCard(card._id).then(() => {
    setCards((cards) => cards.filter((c) => c._id !== card._id))
  }).catch(error => {
    console.log('Ошибка при удалении карточки:', error);
  });
}

function handleUpdateUser({name, about}) {
  api.changeProfile({name, about})
    .then(newInfo => {
      setСurrentUser(newInfo);
      closeAllPopups();
    })
    .catch(error => {
      console.log('Ошибка при обновлении данных пользователя:', error);
    });
}


  function handleUpdateAvatar(avatar){
    api.changeAvatar(avatar)
    .then(data => {
      setСurrentUser(data);
      closeAllPopups();
    })
    .catch(error => {
      console.log('Ошибка при обновлении аватара:', error);
    });
  }

  function handleAddPlaceSubmit({name, link}){
    api.createCard({name, link}).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(error => {
      console.log('Ошибка при добавлении карточки:', error);
    });
  }

  function handleCardClick(card) {
    setselectedCard(card);
  }


  function checkToken() {
    const jwt = localStorage.getItem('jwt')
    auth.getContent(jwt)
    .then((data) => {
      if(!data) {
        return;
      }
      setLoggedIn(true)
      navigate('/')
    })
    .catch(error => {
      console.log('Ошибка при проверке токена:', error);
    });
  }


  React.useEffect(() => {
    if (currentUrl === '/') {
      checkToken();
    }
  }, [currentUrl])



  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleRegister() {
    setInfoTooltip(true);
  }


  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltip(false);
    setselectedCard(null)
  };

  return (
      <CurrentUserContext.Provider value={ currentUser }>
        <div className="page">

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

          <ImagePopup
            onOpenPopupWithImage={handleCardClick}
            onClose={closeAllPopups}
            isOpen={selectedCard}
          />

          <PopupWithForm
            onClose={closeAllPopups}
            name="delete"
            title="Вы уверены?"
          />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltip}
            authData={authData}
          />

          <div className="page__wrapper">
            <Header isLoggedIn={isLoggedIn} handleLoggedin={setLoggedIn} />

              <Routes>
                <Route path='*' element={ isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
                <Route exact path="/"
                element={ <ProtectedRoute
                element={Main}
                cards={cards}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} /> } />

                <Route path="/sign-up" element={<Register handleSignupData={setAuthData} handleSignup={handleRegister} />} />
                <Route path="/sign-in" element={<Login handleSignupData={setAuthData} handleLoginPopup={handleRegister} handleLogin={() => setLoggedIn(true)} />} />
              </Routes>

            <Footer />


          </div>
        </div>
      </ CurrentUserContext.Provider>

  );
}

export default App;