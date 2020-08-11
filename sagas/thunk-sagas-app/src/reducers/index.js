import { combineReducers } from 'redux';

import loadingReducer from './loading';
import pagesReducer from './pages';
import photosReducer from './photos';

const rootReducer = combineReducers({
  photos: photosReducer,
  loading: loadingReducer,
  page: pagesReducer,
});

export default rootReducer;
