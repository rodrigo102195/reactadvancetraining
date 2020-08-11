import React from "react";
import "./HorizontalProduct.scss";
import CounterStock from "../CounterStock/CounterStock";

const HorizontalProduct = ({objectProduct: {product, amount}}) => {
  const {id, name, currentPrice} = product;
  const imageSrc = require(`../../assets/products/prod_${id}.jpg`);

  return (
    <div className="HorizontalProduct">
      <div className="HorizontalProduct__firstContainer">
        <img
          className="HorizontalProduct__image"
          src={imageSrc}
          alt={name}
        />
        <div className="HorizontalProduct__secondContainer">
          <span className="HorizontalProduct__nameSpan">{name}</span>
          <CounterStock product={product} />
        </div>
      </div>
      <span className="HorizontalProduct__partialCost">${(amount*currentPrice).toFixed(2)}</span>
    </div>
  );
};

export default HorizontalProduct;
