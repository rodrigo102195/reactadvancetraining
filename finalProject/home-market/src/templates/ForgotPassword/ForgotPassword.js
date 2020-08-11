import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FORGOTPASSWORD as keysForgotPassword } from "../../constants/i18nKeys";
import Input from "../../Components/input/Input";
import {validateEmail} from "../../utils";
import Button from "../../Components/Button/Button";
import Api from "../../API/Api";
import { Loader } from "semantic-ui-react";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [forgotPasswordRequested, setForgotPassswordRequested] = useState(false);
  const intl = useIntl();

  const submit = async (event) => {
    event.preventDefault();
    const error = email === "" || errorEmail !== "";
    if (!error){
      setForgotPassswordRequested(true);
      const response = await Api.get("/users",{params:{email:email}});
      if(response.data.length > 0)
        console.log(intl.formatMessage({id: keysForgotPassword.yourPasswordIs},{password: response.data[0].password}))
      else
        console.log(intl.formatMessage({id: keysForgotPassword.notRegistered}));
      setForgotPassswordRequested(false);
    }
  }

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value === ""){
      setErrorEmail(intl.formatMessage({id: keysForgotPassword.requiredField}));
    }
    else if (!validateEmail(value)){
      setErrorEmail(intl.formatMessage({id: keysForgotPassword.email.errors.valid}));
    } else {
      setErrorEmail("");
    }
  }

  return (
    <div className="floatedContainer form__container--flex">
      <h3 className="form__title">
        <FormattedMessage id={keysForgotPassword.title} />
      </h3>
      <span className="form__label form--centerText">
        <FormattedMessage id={keysForgotPassword.header} />
      </span>
      <form className="form__container--flex centered" onSubmit={submit}>
        <div className="form__container--flex centered">
            <label
              htmlFor="nameAndLastName"
              className={
                "form__label " +
                (errorEmail&& "form__label--errorColor")
              }
            >
              <FormattedMessage id={keysForgotPassword.email.text} /> *
            </label>
            <Input
              id="email"
              value={email}
              onChange={onChangeEmail}
              name="email"
              borderColor={errorEmail === "" ? "black" : "red"}
            />
            <span
              className={
                errorEmail
                  ? "form__label form__label--errorColor"
                  : "hidden"
              }
            >
              {errorEmail}
            </span>
          </div>
          {forgotPasswordRequested ? (
            <Loader className="ForgotPassword__loader" active inline="centered" />
          ) : (
            <Button type="submit" className="form__button">
              <FormattedMessage id={keysForgotPassword.send} />
            </Button>
          )}
          
      </form>
    </div>
  );
}

export default ForgotPassword;