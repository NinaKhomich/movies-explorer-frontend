import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import useInput from "../../../utils/validation/validation";

import "./ProfileForm.css";

const ProfileForm = ({ isLocked, onUpdate }) => {
  const userName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const email = useInput("", { isEmpty: true, isEmail: true });

  const [isValid, setIsValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const formUpdateValues = {
    name: userName.value,
    email: email.value,
  };

  useEffect(() => {
    if (
      (currentUser.email !== email.value ||
        currentUser.name !== userName.value) &&
      email.isInputValid &&
      userName.isInputValid
    ) {
      setIsValid(true);
    } else setIsValid(false);
  }, [email, userName, currentUser]);

  function handleSubmitUpdateUser(e) {
    e.preventDefault();
    onUpdate(formUpdateValues);
  }

  return (
    <form onSubmit={handleSubmitUpdateUser} className="profile-form">
      <h2 className="profile-form__title">{`Привет, ${currentUser.name}!`}</h2>
      <label className="profile-form__label">
        <span className="profile-form__input-name">Имя</span>
        <input
          className="profile-form__input"
          name="name"
          type="text"
          placeholder={currentUser.name}
          value={userName.value}
          disabled={isLocked && "disabled"}
          onChange={(e) => userName.onChange(e)}
          required
        ></input>
        <span
          className={`profile-form__error ${
            userName.isDirty &&
            (userName.isEmpty ||
              userName.maxLengthError ||
              userName.minLengthError)
              ? "profile-form__error_visible"
              : ""
          }`}
        >
          Что-то пошло не так...
        </span>
      </label>
      <label className="profile-form__label">
        <span className="profile-form__input-name">E-mail</span>
        <input
          className="profile-form__input"
          name="email"
          type="email"
          placeholder={currentUser.email}
          value={email.value}
          disabled={isLocked && "disabled"}
          onChange={(e) => email.onChange(e)}
          required
        ></input>
        <span
          className={`profile-form__error ${
            email.isDirty && (email.isEmpty || email.isEmail)
              ? "profile-form__error_visible"
              : ""
          }`}
        >
          Что-то пошло не так...
        </span>
      </label>
      <p className="profile-form__error-message">
        При обновлении профиля произошла ошибка.
      </p>
      <button
        className={`profile-form__submit-btn ${
          !isLocked ? "profile-form__submit-btn_visible" : ""
        }`}
        disabled={!isValid && "disabled"}
      >
        Сохранить
      </button>
    </form>
  );
};

export default ProfileForm;
