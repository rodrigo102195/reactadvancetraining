import React from "react";
import "./SelectedProducts.scss";
import { useSelector } from "react-redux";
import { calculatePrice } from "../../utils";
import { FormattedMessage } from "react-intl";
import { CATALOG as keysCatalog } from "../../constants/i18nKeys";
import Button from "../Button/Button";
import HorizontalProduct from "../HorizontalProduct/HorizontalProduct";
import { useHistory } from "react-router-dom";

const SelectedProducts = () => {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const history = useHistory();

  const goToPurchase = () => {
    history.push("/purchase");
  }
  
  return (
    <div className="SelectedProducts">
      {cart.map((objectProduct, index) => (
        <div key={objectProduct.product.id}>
        <HorizontalProduct objectProduct={objectProduct} />
        {index !== cart.length -1  && <hr className="SelectedProducts__horizontalRuler"/>}
        </div>
      ))}
      <div className="SelectedProducts__costContainer">
        <div className="SelectedProducts__totalContainer">
          <span className="SelectedProducts__totalSpan"><FormattedMessage id={keysCatalog.total} /></span>
          <span className="SelectedProducts__priceSpan">${calculatePrice(cart)}</span>
        </div>
        <span className="SelectedProducts--colorBlack"><FormattedMessage id={keysCatalog.withoutCostSend} /></span>
        <Button typeButton={cart.length === 0 ? "disabled" : "primary"} className="SelectedProducts__finishPurchase" onClick={goToPurchase}><FormattedMessage id={keysCatalog.finishBuy} /></Button>
      </div>
    </div>
  );
};

export default SelectedProducts;
