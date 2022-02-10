import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PageContent from "../PageContent/PageContent";

function Profile(props) {
  const user = useContext(CurrentUserContext);

  function handleSubmitProfile(event) {
    event.preventDefault();
    props.onSubmit(user);
  }

  return (
    <PageContent>
      <section className="profile">
        <h2 className="profile__title">Привет, {props.userName}!</h2>
        <form onSubmit={handleSubmitProfile} className="profile__user-information">
          <div className="profile__field">
            <p className="profile__field-caption">Имя</p>
            <input onChange={props.onChange} className="profile__field-contain" value={user.name} name="name" id="user-name" />
          </div>
          <div className="profile__field profile__field_is-last">
            <p className="profile__field-caption">E-mail</p>
            <input onChange={props.onChange} className="profile__field-contain" value={user.email} name="email" id="user-email" />
          </div>
          <input
            disabled={props.isButtonBlocked}
            type='submit'
            className={`profile__change-button ${props.isButtonBlocked && 'profile__change-button_blocked'}`}
            value='Редактировать'
            name='profile-submit' />
        </form>
        <div className="profile__buttons">
          <button onClick={props.onClick} className="profile__exit-button">Выйти из аккаунта</button>
        </div>
      </section>
    </PageContent>
  )
}

export default Profile;
