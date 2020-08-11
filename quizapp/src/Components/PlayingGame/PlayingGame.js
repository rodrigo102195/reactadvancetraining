/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Divider, Segment, Icon, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./PlayingGame.scss";

const PlayingGame = ({ questions, categoriesOptions }) => {
  const history = useHistory(); // Hooks for react router
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const questionsOrdered = prepareQuestions();
  const [finished, setFinished] = useState(
    questionsOrdered.length - 1 === currentQuestion
  );
  const isCorrect =
    inputAnswer.toLocaleLowerCase() ===
    questionsOrdered[currentQuestion].answer.toLocaleLowerCase();

  console.log("questionsordered ", questionsOrdered);

  function prepareQuestions() {
    const categoriesSelected = [];

    for (const category of categoriesOptions) {
      if (category.selected) {
        categoriesSelected.push(category.value);
      }
    }
    const questionsFiltered = questions.filter((question) =>
      categoriesSelected.includes(question.category)
    );

    return questionsFiltered.sort((a, b) => {
      if (a.level < b.level) {
        return -1;
      }
      if (a.level > b.level) {
        return 1;
      }
      return 0;
    });
  }

  const nextQuestion = function () {
    if (currentQuestion + 1 < questionsOrdered.length) {
      if (currentQuestion + 1 === questionsOrdered.length - 1){
        setFinished(true);
      }
      setShowAnswer(false);
      setCurrentQuestion(currentQuestion + 1);
      setInputAnswer("");
    } else {
      setFinished(true);
    }
  };

  return (
    <Segment>
      <h2>
        {questionsOrdered[currentQuestion]
          ? questionsOrdered[currentQuestion].question
          : ""}
      </h2>
      <Input
        action={{ content: "Show answer", onClick: () => setShowAnswer(true) }}
        placeholder="Answer"
        fluid
        className="answerAction field"
        onChange={(e, { value }) => setInputAnswer(value)}
        value={inputAnswer}
      />
      <div className="field">
        <div
          className={
            showAnswer
              ? "answerText__span--display"
              : "answerText__span--hidden"
          }
        >
          <h2>Answer: </h2>
          <span className="">
            {questionsOrdered[currentQuestion]
              ? questionsOrdered[currentQuestion].answer
              : ""}
          </span>

          <Divider />
          <Icon
            name={isCorrect ? "check" : "close"}
            className={
              isCorrect ? "answerText__span--correct" : "answerText__span--fail"
            }
          />
          <span
            className={
              isCorrect ? "answerText__span--correct" : "answerText__span--fail"
            }
          >
            The answer is {isCorrect ? "" : "not "}
            correct
          </span>
        </div>
      </div>
      <Button.Group widths="2" className="buttonsInteraction">
        <Button onClick={nextQuestion} disabled={finished}>
          Next Question
        </Button>
        <Button onClick={() => history.push("/")}>Back to home</Button>
      </Button.Group>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    categoriesOptions: state.categoriesOptions,
  };
};

export default connect(mapStateToProps)(PlayingGame);
