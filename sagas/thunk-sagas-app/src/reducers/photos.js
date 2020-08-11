import { PHOTOS } from "../constants/actionsTypes";

const photosReducer = (state = [], action) => {
  console.log("el action es ",action);
  switch (action.type) {
    case PHOTOS.RECEIVED:
      return [...action.data.data];
    case PHOTOS.FAILED: 
    case PHOTOS.CANCEL_REQUEST:
      return [];
    default:
      return state;
  }
};

export default photosReducer;
