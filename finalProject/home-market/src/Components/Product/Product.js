import React from "react";
import "./Product.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { CATALOG as keysCatalog } from "../../constants/i18nKeys";
import CounterStock from "../CounterStock/CounterStock";

const Product = ({ product, optionBuy }) => {
  const { currentPrice, normalPrice, name, refPrice, id } = product;
  const imageSrc = require(`../../assets/products/prod_${id}.jpg`);
  const intl = useIntl();

  return (
    <div className="Product">
      <div className="Product__topContainer">
        <img className="Product__image" src={imageSrc} alt="offer"></img>
        <div className="Product__priceContainer">
          <span className="Product__currentPrice">${currentPrice}</span>
          {normalPrice && (
            <span className="Product__normalPrice">${normalPrice}</span>
          )}
        </div>
        <div className="Product__nameContainer">
          <span className="Product__name">{name}</span>
        </div>
      </div>
      <span className={"Product__refPrice " + (!refPrice && "hidden")}>
        {refPrice ? refPrice : "-"}
      </span>
      <hr className="Product__horizontalRuler" />
      {!optionBuy ? (
        <span className="Product__Iwantit">
          <CounterStock product={product} customizedName= {intl.formatMessage({id: keysCatalog.Iwantit})} />
        </span>
      ) : (
        <CounterStock product={product} />
      )}
    </div>
  );
};

export default Product;
