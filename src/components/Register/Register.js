import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';

function Register(props) {
  const [user, setUser] = useState({ name: '', email: '', password: ''});

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  function handleSubmit(values) {
    props.onRegister({ name: values.name, email: values.email, password: values.password});
  }

  return (
    <AuthPage
      onChange={handleChange}
      onSubmit={handleSubmit}
      formName='register'
      name={user.name}
      email={user.email}
      password={user.password}
      title='Добро пожаловать!'
      proposeCaption='Уже зарегистрированы?'
      proposeLink='/signin'
      proposeLinkName='Войти'
      submitValue='Зарегистрироваться'
      submitName='register' />
  )
}

export default Register;
