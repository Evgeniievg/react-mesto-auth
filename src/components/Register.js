import React from 'react'
import * as auth from '../utils/auth'
import { useNavigate, Link } from 'react-router-dom'


export default function Register( {handleSignup, handleSignupData} ) {


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
    handleSignup(true)
    const { email, password } = formValue;
    auth.register(email, password).then(() => {
      handleSignupData(true)
      navigate('/sign-in')
    }).catch((error) => {
      console.log('Произошла ошибка при регистрации:', error);
    });
  }

  return (
      <main className='auth'>
        <h2 className='auth__title'>Регистрация</h2>
        <form onSubmit={handleSubmit} className='auth__form'>
          <input className='auth__input'
            id="email"
            name="email"
            value={formValue.email}
            placeholder='Email'
            onChange={handleChange}
            type='email'
          />
          <input
            className='auth__input'
            id="password"
            name="password"
            value={formValue.password}
            placeholder='Пароль'
            onChange={handleChange}
            type='password'
          />
          <button onSubmit={handleSubmit} className='auth__button'>Зарегистрироваться</button>
          <span className='auth__text'>Уже зарегистрированы? <Link to='/sign-in' className='auth__link'>Войти</Link></span>
        </form>
      </main>
  )
}
