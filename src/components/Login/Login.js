import SignInput from "../SignInput/SignInput";
import SignPage from "../SignPage/SignPage";
import useInput from "../../utils/validation/validation";

const Login = ({ onSignin }) => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  const formLoginValues = {
    email: email.value,
    password: password.value,
  };

  const handleSubmitSignin = (e) => {
    e.preventDefault();
    onSignin(formLoginValues);
  };

  return (
    <SignPage
      greatingText="Рады видеть!"
      btnText="Войти"
      loggedText="Ещё не зарегистрированы?"
      path="/signup"
      signLinkText="Регистрация"
      onSubmit={handleSubmitSignin}
      inputValid={!email.isInputValid || !password.isInputValid}
    >
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
        isVisible={password.isDirty && password.isEmpty}
        onChange={(e) => password.onChange(e)}
      />
    </SignPage>
  );
};

export default Login;
