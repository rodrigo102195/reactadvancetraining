import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import rootReducer from "../reducers";

const configureStore = () => {
  const sagaMiddleWare = createSagaMiddleware();
  const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleWare))
  );

  sagaMiddleWare.run(rootSaga);

  return store;
};

export default configureStore;