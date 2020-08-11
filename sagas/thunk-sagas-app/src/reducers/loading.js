import { PHOTOS } from "../constants/actionsTypes";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case PHOTOS.GET:
      return true;
    case PHOTOS.RECEIVED: 
    case PHOTOS.CANCEL_REQUEST:
    case PHOTOS.FAILED:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
