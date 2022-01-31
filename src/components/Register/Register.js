import AuthPage from '../AuthPage/AuthPage';

function Register() {
  return (
    <AuthPage title='Добро пожаловать!' proposeCaption='Уже зарегистрированы?' proposeLink='/signin' proposeLinkName='Войти' submitValue='Зарегистрироваться' submitName='register' />
  )
}

export default Register;
