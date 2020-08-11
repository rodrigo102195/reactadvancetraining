export const SET_NAME_AND_LAST_NAME = "SET_NAME_AND_LAST_NAME";
export const SET_PHONE = "SET_PHONE";
export const SET_ADDRESS = "SET_ADDRESS";
export const SET_AVATAR = "SET_AVATAR";
export const SET_LANGUAGE = "SET_LANGUAGE";

export const setNameAndLastName = (dispatch, payload) =>
  dispatch({ type: SET_NAME_AND_LAST_NAME, payload });

export const setPhone = (dispatch, payload) =>
  dispatch({ type: SET_PHONE, payload });

export const setAddress = (dispatch, payload) =>
  dispatch({ type: SET_ADDRESS, payload });

export const setAvatar = (dispatch, payload) =>
  dispatch({ type: SET_AVATAR, payload });

export const setLanguage = (dispatch, payload) =>
  dispatch({ type: SET_LANGUAGE, payload });
