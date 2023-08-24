import { Link } from "react-router-dom";

import logo from "../../images/logo.png";
import "./SignPage.css";

const SignPage = ({
  greatingText,
  children,
  btnText,
  loggedText,
  path,
  signLinkText,
  inputValid,
}) => {
  return (
    <section className="sign-page">
      <div className="sign-page__head">
        <Link to="/" className="sign-page__logo-link">
          <img className="sign-page__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="sign-page__title">{greatingText}</h2>
      </div>

      <form className="sign-page__form">
        {children}
        <button disabled={inputValid} className="sign-page__btn" type="submit">
          {btnText}
        </button>
      </form>

      <p className="sign-page__logged">
        {loggedText}
        <Link className="sign-page__sign-link" to={path}>
          {signLinkText}
        </Link>
      </p>
    </section>
  );
};

export default SignPage;
