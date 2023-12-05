import "./SignInput.css";

const SignInput = ({
  onChange,
  value,
  inputName,
  placeholder,
  type,
  isVisible,
}) => {
  return (
    <label className="sign-input">
      <span className="sign-input__name">{inputName}</span>
      <input
        className="sign-input__field"
        value={value}
        type={type}
        name={type}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      <span
        className={`sign-input__error ${
          isVisible ? "sign-input__error_visible" : ""
        }`}
      >
        Что-то пошло не так...
      </span>
    </label>
  );
};

export default SignInput;
