import React, { useReducer, useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { REGISTER as keysRegister, REGISTER } from "../../constants/i18nKeys";
import { initialState, reducer } from "./store";
import "./Register.scss";
import Input from "../../Components/input/Input";
import {
  setEmail,
  setNameAndLastName,
  setPassword,
  setPhone,
} from "./store/actions";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Api from "../../API/Api";

const Register = () => {
  const [registerStore, registerDispatch] = useReducer(reducer, initialState);
  const intl = useIntl();
  const history = useHistory();
  const [registerRequested, setRegisterRequested]  = useState(false);
  const [errorRegister, setErrorRegister] = useState("");
  const {
    email,
    password,
    errorEmail,
    errorPassword,
    phone,
    errorPhone,
    nameAndLastName,
    errorNameAndLastName,
  } = registerStore;

  const submit = async (event) => {
    event.preventDefault();
    const error =
      errorEmail !== "" ||
      errorPassword !== "" ||
      errorNameAndLastName !== "" ||
      errorPhone !== "" ||
      email.length === 0 ||
      password.length === 0 ||
      nameAndLastName.length === 0 ||
      phone.length === 0;
    setRegisterRequested(true);
    const searchForUser = await Api.get("/users", {params: {email}});
    const existUser = searchForUser.data.length > 0;
    if(existUser)
      setErrorRegister(intl.formatMessage({id: REGISTER.errorExist}));
    if (!error && !existUser) {
      const namesSplited = nameAndLastName.split(" ");
      let name;
      let lastName;
      if (namesSplited.length === 1) {
        //just have a name
        name = namesSplited[0];
      } else {
        // I assume that the last name is the final word, everything else is the name
        lastName = namesSplited.pop();
        name = namesSplited.join(" ");
      }
      Api.post("/users", {
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        role: "CLIENT",
      })
        .then((value) => {
          setRegisterRequested(false);
          history.push("/login");
        })
        .catch((error) => {
          setRegisterRequested(false);
        });
      //Everything is ok
    } else {
      setEmail(registerDispatch, { intl, value: email });
      setPassword(registerDispatch, { intl, value: password });
      setNameAndLastName(registerDispatch, { intl, value: nameAndLastName });
      setPhone(registerDispatch, { intl, value: phone });
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line default-case
    switch (name) {
      case "email":
        setEmail(registerDispatch, { intl, value });
        break;
      case "password":
        setPassword(registerDispatch, { intl, value });
        break;
      case "nameAndLastName":
        setNameAndLastName(registerDispatch, { intl, value });
        break;
      case "phone":
        setPhone(registerDispatch, { intl, value });
        break;
    }
  };

  return (
    <div className="floatedContainer form__container--flex">
      <h3 className="form__title">
        <FormattedMessage id={keysRegister.title} />
      </h3>
      <form
        className="form__container--flex centered"
        onSubmit={(event) => submit(event)}
      >
        <div className="form__container--flex centered">
          <label
            htmlFor="nameAndLastName"
            className={
              "form__label" +
              (errorNameAndLastName && " form__label--errorColor")
            }
          >
            <FormattedMessage id={keysRegister.nameAndLastName.text} /> *
          </label>
          <Input
            id="nameAndLastName"
            value={nameAndLastName}
            onChange={onChange}
            name="nameAndLastName"
            borderColor={errorNameAndLastName === "" ? "black" : "red"}
          />
          <span
            className={
              errorNameAndLastName
                ? "form__label form__label--errorColor"
                : "hidden"
            }
          >
            {errorNameAndLastName}
          </span>
        </div>

        <div className="form__container--flex centered">
          <label
            htmlFor="phone"
            className={
              "form__label" + (errorPhone && " form__label--errorColor")
            }
          >
            <FormattedMessage id={keysRegister.phone.text} /> *
          </label>
          <Input
            id="phone"
            value={phone}
            onChange={onChange}
            name="phone"
            borderColor={errorPhone === "" ? "black" : "red"}
          />
          <span
            className={
              errorPhone ? "form__label form__label--errorColor" : "hidden"
            }
          >
            {errorPhone}
          </span>
        </div>
        <div className="form__container--flex centered">
          <label
            htmlFor="email"
            className={
              "form__label" + (errorEmail && " form__label--errorColor")
            }
          >
            <FormattedMessage id={REGISTER.email.text} /> *
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
            <FormattedMessage id={REGISTER.password.text} /> *
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
            {registerStore.errorPassword}
          </span>
        </div>
        <span
          className={
            errorRegister!=="" ? "form__label form__label--errorColor" : "hidden"
          }
        >
          {errorRegister}
        </span>
        {registerRequested ? (
          <Loader className="Register__loader" active inline="centered" />
        ): (
          <div className="Register__buttonsContainer">
          <Button
            typeButton={"secondary"}
            onClick={() => history.push("/login")}
            className="form__button"
          >
            <FormattedMessage id={REGISTER.cancel} />
          </Button>
            <Button type="submit" className="form__button">
              <FormattedMessage id={REGISTER.title} />
            </Button>
          
        </div>
        )}
      </form>
    </div>
  );
};

export default Register;
