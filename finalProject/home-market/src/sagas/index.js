import {call, cancel, cancelled, fork, put, take, select } from "redux-saga/effects";
import {LOGIN} from "../constants/actionsTypes";
import status from "../constants/statusTypes";
import Api from "../API/Api";

export function loginAuthorize(email, password) {
  return new Promise( async (resolve, reject) => {
    try{
      const result = await Api.post("/login", {email, password});
      resolve(result.data);
    } catch (error){
      reject(error);
    }
  });
}

export function* authorize(email, password) {
  try{
    const token = yield call(loginAuthorize, email, password);
    yield put({type: LOGIN.SUCCESS});
    yield put({type: LOGIN.SAVE_TOKEN, payload: token});
    Api.defaults.headers["Content-Type"] = "application/json";
    Api.defaults.headers["token"] = token;
    const response = yield call(getUserByEmailCall, email);
    yield put({type: LOGIN.STORE_USER, payload: response.data[0]});
  } catch(error) {
    if(error.response.status === 401)
      yield put({type:LOGIN.UNAUTHORIZED});
    else
      yield put({type:LOGIN.ERROR,error});
  }
  finally {
    if (yield cancelled()){
      yield put({type: LOGIN.CANCELLED});
    }
  }
}

export function verifyCall(){
  return new Promise( async (resolve, reject ) => {
    try {
      const result = await Api.get("/verify");
      resolve(result);
    } catch (error){
      reject(error);
    }
  })
}

export function* verify() {
  const authToken = localStorage.getItem("JWT");
  if (authToken !== null){
    Api.defaults.headers["Content-Type"] = "application/json";
    Api.defaults.headers["token"] = authToken;
    try{
      const response = yield call(verifyCall);
      yield put({type:LOGIN.SUCCESS});
      yield put({type:LOGIN.ADD_EMAIL, payload: response.data.email});
    } catch (error){
      if(error.response.status === 401)
        yield put({type:LOGIN.UNAUTHORIZED});
      else
        yield put({type:LOGIN.ERROR});
    }
  } else {
    yield put({type: LOGIN.LOGOUT});
  }
}

export function getUserByEmailCall(email) {
  return new Promise( async (resolve, reject ) => {
    try {
      const result = await Api.get("/users", {params:{email}});
      if(result && result.data && result.data.length > 0)
        resolve(result);
      else
        reject("Error no response from server");
    } catch (error){
      reject(error);
    }
  })
}

export function* loginFlow() {
  while(true) {
    const {payload} = yield take(LOGIN.REQUEST);
    const {email, password} = payload;
    const task = yield fork (authorize, email, password);
    const action = yield take ([LOGIN.LOGOUT,LOGIN.ERROR, LOGIN.UNAUTHORIZED]);
    if (action.type === LOGIN.LOGOUT) {
      yield cancel(task);
      yield put({type: LOGIN.DELETE_TOKEN})
    }
  }
}

export default function* rootSaga() {
  yield call(verify);
  const statusLogin = yield select(state => state.login);
  if (statusLogin.status === status.LOGGED_IN) {
    const response = yield call(getUserByEmailCall, statusLogin.email);
    yield put({type: LOGIN.STORE_USER, payload: response.data[0]});
    yield take(LOGIN.LOGOUT);
    yield put ({type: LOGIN.DELETE_TOKEN});
  } 
  yield call(loginFlow);
}
