import { SHOPPING } from "../constants/actionsTypes";

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOPPING.UPDATE_AMOUNT:
      const newCart = [
        ...state.cart.map((object) =>
          object.product.id===action.payload.product.id
            ? {product: action.payload.product, amount: action.payload.amount}
            : object
        ),
      ];
      return {
        cart: newCart,
      };
    case SHOPPING.ADD_PRODUCT:
      return {
        cart: [
          ...state.cart,
          { product: action.payload.product, amount: action.payload.amount },
        ],
      };
    case SHOPPING.REMOVE_PRODUCT:
      return {
        cart: state.cart.filter(
          (object) => object.product.id !== action.payload.product.id
        ),
      };
    case SHOPPING.RESET_CART :
      return {cart: []};
    default:
      return state;
  }
};

export default reducer;
