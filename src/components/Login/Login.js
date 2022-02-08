import AuthPage from '../AuthPage/AuthPage';
import { useState } from 'react';
import * as validation from '../../utils/validation';

function Login(props) {
  const [user, setUser] = useState({ email: '', password: ''});

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  function handleSubmit(values) {
    props.onLogin({ email: values.email, password: values.password });
    /*event.preventDefault();
    if (!user.email || !user.password) {
      return;
    }
    setUser({
      email: '',
      password: ''
    });
    props.onLogin(user);*/
  }

  return (
    <AuthPage
      onChange={handleChange}
      onSubmit={handleSubmit}
      formName='login'
      email={user.email}
      password={user.password}
      title='Рады видеть!'
      proposeCaption='Ещё не зарегистрированы?'
      proposeLink='/signup'
      proposeLinkName='Регистрация'
      isLogin={true}
      submitValue='Войти'
      submitName='login' />
  )
}

export default Login;
