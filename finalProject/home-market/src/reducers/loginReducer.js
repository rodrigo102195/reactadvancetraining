import { LOGIN } from "../constants/actionsTypes";
import statusTypes from "../constants/statusTypes";


const initialState = {
  status: statusTypes.UNSET,
  email: "",
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case LOGIN.REQUEST: 
      return {...state, status: statusTypes.REQUESTED};
    case LOGIN.SUCCESS:
      return {...state, status: statusTypes.LOGGED_IN};
    case LOGIN.SAVE_TOKEN:
      localStorage.setItem("JWT", action.payload)
      return {...state};
    case LOGIN.ADD_EMAIL:
      return {...state, email: action.payload}
    case LOGIN.DELETE_TOKEN:
      localStorage.removeItem("JWT");
      return {...state};
    case LOGIN.LOGOUT:
      return {status: statusTypes.LOGGED_OUT};
    case LOGIN.ERROR:
      return {...state, status: statusTypes.LOGIN_ERROR};
    case LOGIN.UNAUTHORIZED:
      return {...state, status: statusTypes.LOGIN_UNAUTHORIZED};
    case LOGIN.CANCELLED:
      return {...state, status: statusTypes.LOGIN_CANCELLED};
    case LOGIN.STORE_USER:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

export default reducer;