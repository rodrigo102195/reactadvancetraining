import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { RoutersConstants } from "../../constants";
import "./Home.scss";

const Home = () => {
  const history = useHistory();

  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <Button.Group className="Home" widths="2">
      <Button onClick={() => handleRedirect(RoutersConstants.addQuestion)}>
        Create questions
      </Button>
      <Button onClick={() => handleRedirect(RoutersConstants.start)}>
        Start quizz
      </Button>
    </Button.Group>
  );
};

export default Home;
