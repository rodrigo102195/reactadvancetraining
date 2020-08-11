export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_ERROR_EMAIL = 'SET_ERROR_EMAIL';
export const SET_ERROR_PASSWORD = 'SET_ERROR_PASSWORD';

export const setEmail = (dispatch, payload) => 
  dispatch({ type: SET_EMAIL, payload});

export const setPassword = (dispatch, payload) => 
  dispatch({ type: SET_PASSWORD, payload});

export const setErrorEmail = (dispatch, payload) =>
  dispatch({ type: SET_ERROR_EMAIL, payload});

export const setErrorPassword = (dispatch, payload) => 
  dispatch({ type: SET_ERROR_PASSWORD, payload});