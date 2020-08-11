import {
  SET_ADDRESS,
  SET_AVATAR,
  SET_PHONE,
  SET_NAME_AND_LAST_NAME,
  SET_LANGUAGE
} from "./actions";
import { validateOnlyAlphabetic, validateOnlyNumeric, validateAlphabeticAndNumeric} from "../../../utils";
import { EDITPROFILE as keysEditProfile } from "../../../constants/i18nKeys";

export const initialState = {
  phone: "",
  errorPhone: "",
  nameAndLastName: "",
  errorNameAndLastName: "",
  address: "",
  errorAddress: "",
  avatar: "",
  language: "es",
}

export const reducer = (state, action) => {
  const {type, payload: {intl, value}} = action;
  switch (type) {
    case SET_NAME_AND_LAST_NAME:
      if (value.length > 4 && value.length <= 60 && validateOnlyAlphabetic(value)){
        return {...state, errorNameAndLastName: "", nameAndLastName: value};
      } else if (value.length === 0) {
        return {...state, errorNameAndLastName: intl.formatMessage({id:keysEditProfile.requiredField}), nameAndLastName: value};
      } else if (!validateOnlyAlphabetic(value)){
        return {...state, errorNameAndLastName: intl.formatMessage({id: keysEditProfile.nameAndLastName.errors.onlyAlphabetic}),nameAndLastName: value};
      } else 
        return {...state, errorNameAndLastName: intl.formatMessage({id: keysEditProfile.nameAndLastName.errors.length}), nameAndLastName: value};
    case SET_PHONE:
      if ( value.length > 6 && value.length <= 12 && validateOnlyNumeric(value)){
        return {...state, errorPhone: "", phone: value};
      } else if (value.length === 0) {
        return {...state, errorPhone: intl.formatMessage({id:keysEditProfile.requiredField}), phone: value};
      } else if (!validateOnlyNumeric(value)){
        return {...state, errorPhone: intl.formatMessage({id:keysEditProfile.phone.errors.valid}), phone: value};
      } else 
        return {...state, errorPhone: intl.formatMessage({id: keysEditProfile.phone.errors.length}), phone: value};
    case SET_ADDRESS:
      if(value.length >= 5 && value.length <= 60 && validateAlphabeticAndNumeric(value)) {
        return {...state, errorAddress: "", address: value}
      } else if (value.length === 0 ){
        return {...state, errorAddress:intl.formatMessage({id: keysEditProfile.requiredField}), address: value};
      } else if (!validateAlphabeticAndNumeric(value)){
        return {...state, errorAddress: intl.formatMessage({id: keysEditProfile.address.errors.alphaNumeric}), address:value};
      } else
        return {...state, errorAddress: intl.formatMessage({id: keysEditProfile.address.errors.length}), address:value};
    case SET_AVATAR:
        return {...state, avatar: value};
    case SET_LANGUAGE:
      const newLanguage = value ? "en" : "es";
      return {...state, language: newLanguage}
    default:
        return state;
  }
}

