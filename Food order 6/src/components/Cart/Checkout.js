import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isSixDigits = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputValid, setFormInputValid] = useState({
    fullName: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    const nameIsvalid = isNotEmpty(enteredName);
    const streetIsValid = isNotEmpty(enteredStreet);
    const postalCodeIsValid = isSixDigits(enteredPostalCode);
    const cityIsValid = isNotEmpty(enteredCity);

    setFormInputValid({
      fullName: nameIsvalid,
      street: enteredStreet,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsvalid && streetIsValid && postalCodeIsValid && cityIsValid;

    if (!formIsValid) return;

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValid.fullName ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputValid.fullName && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValid.postalCode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInput} />
        {!formInputValid.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
