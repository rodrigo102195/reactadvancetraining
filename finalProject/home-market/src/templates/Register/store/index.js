import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_PHONE,
  SET_NAME_AND_LAST_NAME,
} from "./actions";
import { validateEmail, validatePassword, validateOnlyAlphabetic, validateOnlyNumeric } from "../../../utils";
import { REGISTER } from "../../../constants/i18nKeys";

export const initialState = {
  email: "",
  password: "",
  errorEmail: "",
  errorPassword: "",
  phone: "",
  errorPhone: "",
  nameAndLastName: "",
  errorNameAndLastName: "",
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  const { intl, value } = payload;
  switch (type) {
    case SET_EMAIL:
      if(value.length > 0 && validateEmail(value))
        return {...state, errorEmail: "", email: value};
      else if (value.length === 0)
        return {...state, errorEmail: intl.formatMessage({id: REGISTER.requiredField}), email:value};
      else
        return {...state, errorEmail: intl.formatMessage({id: REGISTER.email.errors.valid}), email: value};
    case SET_PASSWORD:
      if(value.length > 0 && validatePassword(value))
        return {...state, errorPassword: "", password: value};
      else if (value.length === 0)
        return {...state, errorPassword: intl.formatMessage({id: REGISTER.requiredField}), password: value};
      else
        return {...state, errorPassword: intl.formatMessage({id: REGISTER.password.errors.valid}),password:value};
    case SET_NAME_AND_LAST_NAME:
      if (value.length > 4 && value.length <= 60 && validateOnlyAlphabetic(value)){
        return {...state, errorNameAndLastName: "", nameAndLastName: value};
      } else if (value.length === 0) {
        return {...state, errorNameAndLastName: intl.formatMessage({id:REGISTER.requiredField}), nameAndLastName: value};
      } else if (!validateOnlyAlphabetic(value)){
        return {...state, errorNameAndLastName: intl.formatMessage({id: REGISTER.nameAndLastName.errors.onlyAlphabetic}),nameAndLastName: value};
      } else 
        return {...state, errorNameAndLastName: intl.formatMessage({id: REGISTER.nameAndLastName.errors.length}), nameAndLastName: value};
    case SET_PHONE:
      if ( value.length > 6 && value.length <= 12 && validateOnlyNumeric(value)){
        return {...state, errorPhone: "", phone: value};
      } else if (value.length === 0) {
        return {...state, errorPhone: intl.formatMessage({id:REGISTER.requiredField}), phone: value};
      } else if (!validateOnlyNumeric(value)){
        return {...state, errorPhone: intl.formatMessage({id:REGISTER.phone.errors.valid}), phone: value};
      } else 
        return {...state, errorPhone: intl.formatMessage({id: REGISTER.phone.errors.length}), phone: value};
    default:
      return state;
  }
};
