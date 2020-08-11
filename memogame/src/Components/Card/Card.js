import React from "react";
import FlipCard from "react-flipcard";
import './Card.scss';

const Card = (props) => (
<div className="card">
  <FlipCard
    disabled={true}
    flipped={props.flipped}  >
    <div className="card__content" onClick={() => props.onFlip(props.index)}>
    </div>
    <div className="card__content card__back">
      <i className={`fa ${props.icon} fa-4x`}></i>
    </div>
  </FlipCard>
  </div>
);

export default Card;
