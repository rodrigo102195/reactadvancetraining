import { SET_EMAIL, SET_PASSWORD, SET_ERROR_EMAIL, SET_ERROR_PASSWORD } from "./actions";
import { validateEmail } from "../../../utils";
import { LOGIN } from "../../../constants/i18nKeys";

export const initialState = {
  email: "",
  password: "",
  errorEmail: "",
  errorPassword: "",
}

export const reducer = (state, action) => {
  const { type, payload } = action;
  const {intl, value} = payload;
  switch (type) {
    case SET_EMAIL:
      if (value.length > 0 && validateEmail(value))
        return {...state, errorEmail: "", email: value};
      else if (value.length === 0)
        return {...state, errorEmail: intl.formatMessage({id: LOGIN.requiredField}), email: value};
      else if (!validateEmail(value))
        return {...state, errorEmail: intl.formatMessage({id: LOGIN.validEmail}), email: value}
      else
        return {...state, email: value};
    case SET_PASSWORD:
      if (value.length >= 8 && value.length <= 20)
        return {...state, errorPassword: "", password: value}
      else if (value.length === 0)
        return {...state, errorPassword: intl.formatMessage({id: LOGIN.requiredField}), password: value};
      else if (value.length < 8 || value.length > 20)
        return {...state, errorPassword: intl.formatMessage({id: LOGIN.password.lengthError}), password: value};
      else 
        return {...state, password: value};
    case SET_ERROR_EMAIL:
      return {...state, errorEmail: value};
    case SET_ERROR_PASSWORD:
      return {...state, errorPassword: value};
    default:
      return state;
  }
}