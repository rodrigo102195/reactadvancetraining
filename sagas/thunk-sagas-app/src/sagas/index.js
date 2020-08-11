import {
  all,
  cancel,
  cancelled,
  fork,
  put,
  select,
  take,
} from "redux-saga/effects";
import Api from "../api/Api";
import { getPage } from "../constants/getters";
import { PHOTOS } from "../constants/actionsTypes";

export function* fetchPhotos() {
  try {
    const page = yield select(getPage);
    const data = yield Api.get("/list", { params: { page } }); //Ví que se puede usar el call?
    yield put({ type: PHOTOS.RECEIVED, data });
  } catch (error) {
    yield put({ type: PHOTOS.FAILED, error });
  } finally {
    if (yield cancelled()) {
      console.log("he cancelado la operación");
    }
  }
}

function* watchFetchPhotos() {
  while (true) {
    yield take(PHOTOS.GET);
    const task = yield fork(fetchPhotos);
    const action = yield take([PHOTOS.CANCEL_REQUEST, PHOTOS.RECEIVED, PHOTOS.FAILED]);
    if (action.type === PHOTOS.CANCEL_REQUEST || action.type === PHOTOS.FAILED)
      yield cancel(task);
  }
}

export default function* rootSaga() {
  yield all([watchFetchPhotos()]); //Debería usar otro o está bien con el all?
}
