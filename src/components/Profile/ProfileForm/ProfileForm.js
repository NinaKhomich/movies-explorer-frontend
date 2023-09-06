import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import useInput from "../../../utils/validation/validation";

import "./ProfileForm.css";

const ProfileForm = ({ isLocked, onUpdateUser }) => {
  const userName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const email = useInput("", { isEmpty: true, isEmail: true });

  const [formValue, setFormValue] = useState({name: '', email: ''});
  const [isValid, setIsValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setFormValue({name: currentUser.name, email: currentUser.email});
  }, [currentUser, isLocked]);

  useEffect(() => {
    if ((currentUser.email !== email.value &&
        email.isInputValid) || (currentUser.name !== userName.value &&
          userName.isInputValid)) {
          setIsValid(true);
    } else setIsValid(false);
  }, [email, userName, currentUser]);

  function handleSubmitUpdateUser(e) {
    e.preventDefault();
    onUpdateUser(formValue);
  }

  function handleChangeName(e) {
    setFormValue({name: e.target.value, email: formValue.email});
    userName.onChange(e);
  }

  function handleChangeEmail(e) {
    setFormValue({email: e.target.value, name: formValue.name});
    email.onChange(e);
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
          placeholder="имя"
          value={formValue.name ?? ''}
          disabled={isLocked && "disabled"}
          onChange={handleChangeName}
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
        Обновите имя. Имя должно содержать не менее 2 символов.
        </span>
      </label>
      <label className="profile-form__label">
        <span className="profile-form__input-name">E-mail</span>
        <input
          className="profile-form__input"
          name="email"
          type="email"
          placeholder="e-mail"
          value={formValue.email ?? ''}
          disabled={isLocked && "disabled"}
          onChange={handleChangeEmail}
          required
        ></input>
        <span
          className={`profile-form__error ${
            email.isDirty && (email.isEmpty || email.isEmail)
              ? "profile-form__error_visible"
              : ""
          }`}
        >
          Обновите e-mail.
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
