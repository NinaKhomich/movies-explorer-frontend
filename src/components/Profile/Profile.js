import { useState } from "react";
import ProfileForm from "./ProfileForm/ProfileForm";

import "./Profile.css";

const Profile = ({ onSignout }) => {
  const [isLocked, setIsLocked] = useState(true);

  function handleChangeProfile() {
    setIsLocked(!isLocked);
  }

  return (
    <section className="profile">
      <ProfileForm isLocked={isLocked} />
      <div
        className={`profile__buttons ${
          isLocked ? "" : "profile__buttons_hidden"
        }`}
      >
        <button onClick={handleChangeProfile} className="profile__btn">
          Редактировать
        </button>
        <button
          onClick={onSignout}
          className="profile__btn profile__btn_logout"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
};

export default Profile;
