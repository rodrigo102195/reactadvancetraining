/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React from "react";
import { connect } from "react-redux";
import { Button, Segment, Checkbox } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { setSelectCategory } from "../../actions/index";
import "./Play.scss";
import { RoutersConstants } from "../../constants";

const Play = ({ categoriesOptions, setSelectCategory }) => {
  const history = useHistory(); // Hooks for react router

  return (
    <Segment>
      <h1 className="play__title">Select categories</h1>
      <div>
        {categoriesOptions.map(({ text, selected }, index) => {
          return (
            <div className="categorySelected">
              <Checkbox
                className="category__checkbox"
                toggle
                checked={selected}
                onChange={(e, { checked }) => {
                  setSelectCategory(checked, index);
                }}
              />
              <span className="category__span">{` ${text}`}</span>
            </div>
          );
        })}
      </div>
      <Button.Group widths="2" className="buttonsInteraction">
        <Button onClick={() => history.push(RoutersConstants.playingGame)}>
          Go to quiz
        </Button>
        <Button onClick={() => history.push("/")}>Back to home</Button>
      </Button.Group>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesOptions: state.categoriesOptions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectCategory: (value, index) =>
      dispatch(setSelectCategory(value, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
