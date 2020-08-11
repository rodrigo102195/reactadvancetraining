import { PHOTOS } from '../constants/actionsTypes';

export const getPhotos = () => ({
  type: PHOTOS.GET,
});

export const cancelRequest = () => ({
  type: PHOTOS.CANCEL_REQUEST,
});
