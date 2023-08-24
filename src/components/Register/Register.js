import SignInput from "../SignInput/SignInput";
import SignPage from "../SignPage/SignPage";
import useInput from "../../utils/validation";

const Register = () => {
  const userName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  return (
    <SignPage
      greatingText="Добро пожаловать!"
      btnText="Зарегистрироваться"
      loggedText="Уже зарегистрированы?"
      path="/signin"
      signLinkText="Войти"
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
        onBlur={(e) => userName.onBlur(e)}
      />
      <SignInput
        inputName="E-mail"
        type="email"
        placeholder="pochta@yandex.ru"
        value={email.value}
        isVisible={email.isDirty && (email.isEmpty || email.isEmail)}
        onChange={(e) => email.onChange(e)}
        onBlur={(e) => email.onBlur(e)}
      />
      <SignInput
        inputName="Пароль"
        type="password"
        value={password.value}
        placeholder="password"
        isVisible={password.isDirty && password.isEmpty}
        onChange={(e) => password.onChange(e)}
        onBlur={(e) => password.onBlur(e)}
      />
    </SignPage>
  );
};

export default Register;
