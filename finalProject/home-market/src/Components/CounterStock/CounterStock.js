import React from "react";
import { Icon } from "semantic-ui-react";
import "./CounterStock.scss";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, updateAmount } from "../../actions";
import { CATALOG as keysCatalog } from "../../constants/i18nKeys";
import { FormattedMessage } from "react-intl";

const CounterStock = ({ product, customizedName }) => {
  const { unit, stock, min, id } = product;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);
  const objectProduct = cart.find(object => object.product.id === id);
  const amount = objectProduct ? objectProduct.amount : 0;

  const onClickPlus = () => {
    if (amount + min <= stock) {
      if (cart.some((cartObject) => cartObject.product.id === id)) {
        dispatch(updateAmount(product, amount + min));
      } else {
        dispatch(addProduct(product, min));
      }
    }
  };

  const onClickMinus = () => {
    if (amount > 0) {
      if (amount - min <= 0) {
        dispatch(removeProduct(product));
      } else {
        dispatch(updateAmount(product, amount - min));
      }
    }
  };

  return cart.some((objectProduct) => objectProduct.product.id === id) ? (
    <div className="CounterStock">
      <Icon
        name="minus"
        size="small"
        className={
          "CounterStock__iconMinus " +
          (amount === 0 && "CounterStock__iconMinus--disabled")
        }
        onClick={onClickMinus}
      />
      
      <span className="CounterStock__amountSpan">{amount}</span>
      {unit === "KG" ? <> KG</> : <> UN</>}
      <Icon
        name="plus"
        size="small"
        className={
          "CounterStock__iconPlus " +
          (amount + min > stock && "CounterStock__iconPlus--disabled")
        }
        onClick={onClickPlus}
      />
    </div>
  ) : stock > 0 ? (
    <span className="CounterStock__buySpan" onClick={onClickPlus}>
      {customizedName ? customizedName : <FormattedMessage id={keysCatalog.buy}  /> }
    </span>
  ) : (
    <span className="CounterStock__noStockSpan">
      <FormattedMessage id={keysCatalog.noStock} />
    </span>
  );
};

export default CounterStock;
