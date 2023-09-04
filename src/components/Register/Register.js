import SignInput from "../SignInput/SignInput";
import SignPage from "../SignPage/SignPage";
import useInput from "../../utils/validation/validation";

const Register = ({ onSignup }) => {
  const userName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 8 });

  const formRegistValues = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    onSignup(formRegistValues);
  };

  return (
    <SignPage
      onSignup={onSignup}
      greatingText="Добро пожаловать!"
      btnText="Зарегистрироваться"
      loggedText="Уже зарегистрированы?"
      path="/signin"
      signLinkText="Войти"
      onSubmit={handleSubmitSignup}
      inputValid={
        !email.isInputValid || !password.isInputValid || !userName.isInputValid
      }
    >
      <SignInput
        inputName="Имя"
        type="text"
        placeholder="Виталий"
        value={userName.value}
        isVisible={
          userName.isDirty &&
          (userName.isEmpty ||
            userName.maxLengthError ||
            userName.minLengthError)
        }
        onChange={(e) => userName.onChange(e)}
      />
      <SignInput
        inputName="E-mail"
        type="email"
        placeholder="pochta@yandex.ru"
        value={email.value}
        isVisible={email.isDirty && (email.isEmpty || email.isEmail)}
        onChange={(e) => email.onChange(e)}
      />
      <SignInput
        inputName="Пароль"
        type="password"
        value={password.value}
        placeholder="password"
        isVisible={password.isDirty && (password.isEmpty || password.minLengthError)}
        onChange={(e) => password.onChange(e)}
      />
    </SignPage>
  );
};

export default Register;
