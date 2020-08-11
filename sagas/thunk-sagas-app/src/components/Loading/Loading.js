import React from "react";
import { useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";

const Loading = () => {
  const loadingState = useSelector((state) => state.loading);
  return loadingState ? <Loader active inline /> : null;
};

export default Loading;
