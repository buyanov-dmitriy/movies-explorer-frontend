import { useState } from "react";

function Profile(props) {
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  function handleEditProfile() {
    setIsInputDisabled(false);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {props.userName}!</h2>
      <div className="profile__user-information">
        <div className="profile__field">
          <p className="profile__field-caption">Имя</p>
          <input className="profile__field-contain" placeholder={props.userName} disabled={isInputDisabled ? true : false} name="user-name" id="user-name" />
        </div>
        <div className="profile__field profile__field_is-last">
          <p className="profile__field-caption">E-mail</p>
          <input className="profile__field-contain" placeholder={props.userEmail} disabled={isInputDisabled ? true : false} name="user-email" id="user-email" />
        </div>
      </div>
      <div className="profile__buttons">
        <button className="profile__change-button" onClick={handleEditProfile}>Редактировать</button>
        <button className="profile__exit-button">Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;
