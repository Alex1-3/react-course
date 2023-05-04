import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) =>
    value.trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  );

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) formIsValid = true;

  function formSubmitHandler(e) {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetEmailInput();
    resetNameInput();
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${nameInputHasError && "invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          type="text"
          id="name"
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>

      <div className={`form-control ${emailInputHasError && "invalid"}`}>
        <label htmlFor="email">Your email</label>
        <input
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          type="email"
          id="email"
        />
        {emailInputHasError && <p className="error-text">Email is not valid</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

// const [enteredName, setEnteredName] = useState("");
// const [enteredNameTouch, setEnteredNameTouch] = useState(false);
// const [enteredEmail, setEnteredEmail] = useState("");
// const [enteredEmailTouch, setEnteredEmailTouch] = useState(false);

// const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// const enteredEmailIsValid = enteredEmail.trim().match(validRegex);
// const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouch;

// const enteredNameIsValid = enteredName.trim() !== "";
// const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouch;

// let formIsValid = false;
// if (enteredNameIsValid && enteredEmailIsValid) formIsValid = true;

// function nameInputChangeHandler(e) {
//   setEnteredName(e.target.value);
// }

// const nameInputBlurHandler = function (e) {
//   setEnteredNameTouch(true);
// };

// const emailInputChangeHandler = function (e) {
//   setEnteredEmail(e.target.value);
// };

// const emailInputBlurHandler = function (e) {
//   setEnteredEmailTouch(true);
// };

// function formSubmitHandler(e) {
//   e.preventDefault();
//   setEnteredEmailTouch(true);
//   setEnteredNameTouch(true);
//   if (!formIsValid) {
//     return;
//   }
//   console.log(enteredName);
//   setEnteredName("");
//   setEnteredNameTouch(false);
//   setEnteredEmail("");
//   setEnteredEmailTouch(false);
// }
