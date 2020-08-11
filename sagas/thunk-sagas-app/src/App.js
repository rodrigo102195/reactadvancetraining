import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store";

import "./App.css";
import PhotoGallery from "./components/PhotoGallery/PhotoGallery";
import Button from "./components/Button/Button";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Button />
      <PhotoGallery />
    </div>
  </Provider>
);

export default App;
