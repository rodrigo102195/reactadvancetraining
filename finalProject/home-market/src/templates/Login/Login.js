import React, { useReducer, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import "./Login.scss";
import Button from "../../Components/Button/Button";
import { FormattedMessage } from "react-intl";
import Input from "../../Components/input/Input";
import { initialState, reducer } from "./store";
import {
  setEmail,
  setPassword,
  setErrorEmail,
  setErrorPassword,
} from "./store/actions";
import { LOGIN, HOME } from "../../constants/i18nKeys";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../actions";
import statusTypes from "../../constants/statusTypes";

const Login = ({ intl }) => {
  const [loginStore, loginDispatch] = useReducer(reducer, initialState);
  const { email, password, errorEmail, errorPassword } = loginStore;
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const isLoggedIn = loginState.status === statusTypes.LOGGED_IN;
  const history = useHistory();
  let errorLogin = "";

  useEffect(() => {
    if (loginState.status === statusTypes.LOGGED_IN) {
      history.push("/catalog");
    }
    if (loginState.status === statusTypes.LOGIN_UNAUTHORIZED)
      errorLogin = intl.formatMessage({ id: LOGIN.invalid });
    else if (loginState.status === statusTypes.LOGIN_ERROR)
      errorLogin = intl.formatMessage({ id: LOGIN.error });
  }, [loginState.status]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setEmail(loginDispatch, { intl, value });
    } else {
      setPassword(loginDispatch, { intl, value });
    }
  };

  const submit = (event) => {
    event.preventDefault();
    let newErrorEmail = "";
    let newErrorPassword = "";
    if (email.length === 0)
      newErrorEmail = intl.formatMessage({ id: LOGIN.requiredField });
    else if (!validateEmail(email))
      newErrorEmail = intl.formatMessage({ id: LOGIN.validEmail });
    if (password.length === 0)
      newErrorPassword = intl.formatMessage({ id: LOGIN.requiredField });
    else if (password.length < 8 || password.length > 20)
      newErrorPassword = intl.formatMessage({ id: LOGIN.password.lengthError });

    if (newErrorEmail === "" && newErrorPassword === "") {
      if (isLoggedIn) {
        dispatch(logOut());
      }
      dispatch(logIn(email, password));
    } else {
      setErrorEmail(loginDispatch, { value: newErrorEmail });
      setErrorPassword(loginDispatch, { value: newErrorPassword });
    }
  };

  return (
    <div className="floatedContainer form__container--flex">
      <h3 className="form__title">
        <FormattedMessage id={LOGIN.welcome} />
      </h3>
      <form
        className="form__container--flex centered"
        onSubmit={(event) => submit(event)}
      >
        <div className="form__container--flex centered">
          <label
            htmlFor="email"
            className={
              "form__label" + (errorEmail && " form__label--errorColor")
            }
          >
            <FormattedMessage id={LOGIN.email} /> *
          </label>
          <Input
            id="email"
            value={email}
            onChange={onChange}
            name="email"
            borderColor={errorEmail === "" ? "black" : "red"}
          />
          <span
            className={
              errorEmail ? "form__label form__label--errorColor" : "hidden"
            }
          >
            {errorEmail}
          </span>
        </div>
        <div className="form__container--flex centered">
          <label
            htmlFor="password"
            className={
              "form__label " + (errorPassword && "form__label--errorColor")
            }
          >
            <FormattedMessage id={LOGIN.password.text} /> *
          </label>
          <Input
            id="password"
            value={password}
            onChange={onChange}
            name="password"
            type="password"
            borderColor={errorPassword === "" ? "black" : "red"}
          />
          <span
            className={
              errorPassword ? "form__label form__label--errorColor" : "hidden"
            }
          >
            {loginStore.errorPassword}
          </span>
        </div>
        <div className="Login__moreOptionsContainer">
          <div>
            <Link
              to="/forgotPassword"
              className="Login__moreOptionsContainer--fontSize Login__registerContainer--margin"
            >
              <FormattedMessage id={LOGIN.forgetPassword} />
            </Link>
          </div>
          <div className="Login__registerContainer">
            <Link
              to="/register"
              className="Login__registerContainer--margin Login__moreOptionsContainer--fontSize"
            >
              <FormattedMessage id={LOGIN.isNewQuestion} />
            </Link>
            <Link
              to="/register"
              className="Login__registerText Login__moreOptionsContainer--fontSize"
            >
              <FormattedMessage id={LOGIN.register} />
            </Link>
          </div>
        </div>
        <span
          className={
            errorLogin !== ""
              ? "form__label--errorColor Login__moreOptionsContainer--fontSize Login__error"
              : "hidden"
          }
        >
          {errorLogin}
        </span>
        {loginState.status === statusTypes.REQUESTED ? (
          <Loader
            active
            inline="centered"
            className={
              loginState.status !== statusTypes.REQUESTED ? "none" : ""
            }
          />
        ) : (
          <Button
            className="form__button Login__button"
            type="submit"
            typeButton={
              errorEmail === "" &&
              errorPassword === "" &&
              email !== "" &&
              password !== ""
                ? "primary"
                : "disabled"
            }
          >
            <FormattedMessage id={HOME.login} />
          </Button>
        )}
      </form>
    </div>
  );
};

export default injectIntl(Login);
