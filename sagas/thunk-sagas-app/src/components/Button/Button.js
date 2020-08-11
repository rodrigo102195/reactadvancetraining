import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { getLoading, getPage } from "../../constants/getters";
import Loading from "../Loading/Loading";
import { getPhotos, cancelRequest } from "../../actions";
import "./Button.css";

const ButtonPhotos = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const page = useSelector(getPage);
  const text = !loading ? "Press to see photos" : "Cancel action";
  const handleOnClick = !loading
    ? () => dispatch(getPhotos(page))
    : () => dispatch(cancelRequest());

  return (
    <Button onClick={handleOnClick}>
      {text}
      <Loading />
    </Button>
  );
};

export default ButtonPhotos;
