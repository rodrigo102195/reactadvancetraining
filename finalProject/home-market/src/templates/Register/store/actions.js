export const SET_NAME_AND_LAST_NAME = "SET_NAME_AND_LAST_NAME";
export const SET_PHONE = "SET_PHONE";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_ERROR_NAME_AND_LAST_NAME = "SET_ERROR_NAME_AND_LAST_NAME";
export const SET_ERROR_PHONE = "SET_ERROR_PHONE";
export const SET_ERROR_EMAIL = "SET_ERROR_EMAIL";
export const SET_ERROR_PASSWORD = "SET_ERROR_PASSWORD";

export const setNameAndLastName = (dispatch, payload) =>
  dispatch({ type: SET_NAME_AND_LAST_NAME, payload });

export const setPhone = (dispatch, payload) =>
  dispatch({ type: SET_PHONE, payload });

export const setEmail = (dispatch, payload) =>
  dispatch({ type: SET_EMAIL, payload });

export const setPassword = (dispatch, payload) =>
  dispatch({ type: SET_PASSWORD, payload });

export const setErrorNameAndLastName = (dispatch, payload) =>
  dispatch({ type: SET_ERROR_NAME_AND_LAST_NAME, payload });

export const setErrorPhone = (dispatch, payload) =>
  dispatch({ type: SET_ERROR_PHONE, payload });

export const setErrorEmail = (dispatch, payload) =>
  dispatch({ type: SET_ERROR_EMAIL, payload });

export const setErrorPassword = (dispatch, payload) =>
  dispatch({ type: SET_ERROR_PASSWORD, payload });
