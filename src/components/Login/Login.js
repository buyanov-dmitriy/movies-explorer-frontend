import AuthPage from '../AuthPage/AuthPage';

function Login() {
  return (
    <AuthPage title='Рады видеть!' proposeCaption='Ещё не зарегистрированы?' proposeLink='/signup' proposeLinkName='Регистрация' isLogin={true} submitValue='Войти' submitName='login' />
  )
}

export default Login;
