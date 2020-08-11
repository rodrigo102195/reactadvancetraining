import { PHOTOS } from "../constants/actionsTypes";

const pagesReducer = (state = 1, action) => action.type === PHOTOS.RECEIVED ? state + 1 : state;

export default pagesReducer;
