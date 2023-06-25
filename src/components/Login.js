import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as auth from '../utils/auth'


export default function Login( { handleLogin, handleLoginPopup, handleSignupData }) {

  const navigate = useNavigate()

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    auth.authorize(email, password).then((data) => {
      localStorage.setItem('jwt', data.token)
      handleLogin()
      navigate('/')
    }).catch((error) => {
      handleSignupData(false)
      handleLoginPopup()
      console.log('Произошла ошибка при входе:', error);
    });

  }


  return (
    <main className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input className='auth__input'
          id="email"
          name="email"
          value={formValue.email}
          placeholder='Email'
          onChange={handleChange}
        />
        <input className='auth__input'
          id="password"
          name="password"
          value={formValue.password}
          placeholder='Пароль'
          onChange={handleChange}
        />
        <button onSubmit={handleSubmit} className='auth__button'>Войти</button>
      </form>
    </main>
  )
}
