import React, { useContext, useEffect, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

const formReducer = function (state, action) {
  if (action.type === "EMAIL_INPUT")
    return {
      ...state,
      emailValue: action.value,
      emailIsValid: action.value.includes("@"),
    };
  if (action.type === "PASSWORD_INPUT")
    return {
      ...state,
      passwordValue: action.value,
      passwordIsValid: action.value.trim().length > 6,
    };
  if (action.type === "FORM_CHANGE")
    return {
      ...state,
      formIsValid: state.passwordIsValid && state.emailIsValid,
    };
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: "",
    emailIsValid: undefined,
    passwordValue: "",
    passwordIsValid: undefined,
    formIsValid: false,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("timer");
      dispatchForm({ type: "FORM_CHANGE" });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [formState.emailIsValid, formState.passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchForm({ type: "EMAIL_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: "PASSWORD_INPUT", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formState.formIsValid) {
      ctx.onLogIn(formState.emailValue, formState.passwordValue);
    } else if (!formState.emailIsValid) {
      emailInputRef.current.activate();
    } else {
      passwordInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="Email"
          type="email"
          isValid={formState.emailIsValid}
          value={formState.emailValue}
          onChange={emailChangeHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={formState.passwordIsValid}
          value={formState.passwordValue}
          onChange={passwordChangeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
