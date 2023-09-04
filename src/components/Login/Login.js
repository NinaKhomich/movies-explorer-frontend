import SignInput from "../SignInput/SignInput";
import SignPage from "../SignPage/SignPage";
import useInput from "../../utils/validation";

const Login = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  return (
    <SignPage
      greatingText="Рады видеть!"
      btnText="Войти"
      loggedText="Ещё не зарегистрированы?"
      path="/signup"
      signLinkText="Регистрация"
      inputValid={!email.isInputValid || !password.isInputValid}
    >
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

export default Login;