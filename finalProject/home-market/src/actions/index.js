import { LOGIN, SHOPPING } from "../constants/actionsTypes";

export const logIn = (email, password) => ({
  type: LOGIN.REQUEST,
  payload: {
    email,
    password
  }
});

export const logOut = () => ({
  type: LOGIN.LOGOUT,
});

export const storeUser = ({...user}) => ({
  type: LOGIN.STORE_USER,
  payload: {
    ...user
  }
});

export const updateAmount = (product, amount) => ({
  type: SHOPPING.UPDATE_AMOUNT,
  payload: {
    product,
    amount,
  }
});

export const addProduct = (product, amount) => ({
  type: SHOPPING.ADD_PRODUCT,
  payload: {
    product,
    amount
  }
});

export const removeProduct = (product) => ({
  type: SHOPPING.REMOVE_PRODUCT,
  payload: {
    product
  }
});

export const resetCart = () => ({
  type: SHOPPING.RESET_CART,
});

