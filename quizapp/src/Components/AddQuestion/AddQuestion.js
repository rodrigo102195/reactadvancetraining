/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import "./AddQuestion.scss";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addQuiz } from "../../actions/index";

const categoryErrorString = "Please select a category";
const questionErrorString = "Please fill the question";
const answerErrorString = "Please fill the answer";
const levelErrorString = "Please fill the level";

const AddQuestion = ({ addQuiz, categoriesOptions, difficultOptions }) => {
  const history = useHistory(); // Hooks for react router
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [answerError, setAnswerError] = useState(false);
  const [levelError, setLevelError] = useState(false);
  const [succesfully, setSuccessfully] = useState(false);

  function submit(event) {
    event.preventDefault();
    checkError(category, setCategoryError, categoryErrorString);
    checkError(question, setQuestionError, questionErrorString);
    checkError(answer, setAnswerError, answerErrorString);
    checkError(level, setLevelError, levelErrorString);
    if (category && question && answer && level) {
      addQuiz({
        category,
        question,
        answer,
        level,
      });
      setCategory("");
      setQuestion("");
      setAnswer("");
      setLevel("");
      setSuccessfully(true);
    } else {
      setSuccessfully(false);
    }
  }

  function checkError(value, callbackError, errorString) {
    callbackError(value ? false : errorString);
  }

  const onChangeCategory = (e, { value }) => {
    setCategory(value);
    checkError(value, setCategoryError, categoryErrorString);
  };

  const onChangeQuestion = (e) => {
    const { value } = e.target;
    setQuestion(value);
    checkError(value, setQuestionError, questionErrorString);
  };

  const onChangeAnswer = (e) => {
    const { value } = e.target;
    setAnswer(value);
    checkError(value, setAnswerError, answerErrorString);
  };

  const onChangeLevel = (e, { value }) => {
    setLevel(value);
    checkError(value, setLevelError, levelErrorString);
  };

  return (
    <Segment>
      <Form onSubmit={(event) => submit(event)}>
        <Form.Select
          placeholder="Select category"
          options={categoriesOptions}
          error={categoryError}
          onChange={onChangeCategory}
          value={category}
        />
        <Form.Input
          placeholder="Question"
          error={questionError}
          onChange={onChangeQuestion}
          value={question}
        />
        <Form.TextArea
          placeholder="Answer"
          style={{ minHeight: 100 }}
          error={answerError}
          onChange={onChangeAnswer}
          value={answer}
        />
        <Form.Select
          placeholder="Select level"
          options={difficultOptions}
          error={levelError}
          onChange={onChangeLevel}
          value={level}
        />
        <Button.Group widths="2" className="form__buttonSubmit">
          <Button type="submit">Submit</Button>
          <Button onClick={() => history.push("/")}>Back to home</Button>
        </Button.Group>
      </Form>
      {succesfully ? (
        <Message positive>
          <p>The question was added succesfully</p>
        </Message>
      ) : (
        ""
      )}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesOptions: state.categoriesOptions,
    difficultOptions: state.difficultOptions,
    quiz: state.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuiz: (newQuiz) => dispatch(addQuiz(newQuiz)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
