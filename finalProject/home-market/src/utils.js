import Api from "./API/Api";

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  return re.test(password);
};

export const validateOnlyNumeric = (password) => {
  const re = new RegExp("^[0-9]*$");
  return re.test(password);
};

export const validateOnlyAlphabetic = (password) => {
  const re = new RegExp("^[a-z A-Z\u00C0-\u00FF]*$");
  return re.test(password);
};

export const validateAlphabeticAndNumeric = (value) => {
  const re = new RegExp("^[a-z0-9 A-Z\u00C0-\u00FF]*$");
  return re.test(value);
};

export const getIdByEmail = async (email) => {
  const response = await Api.get("/users", {params: {email}});
  if(response && response.data && response.data.length > 0)
    return response.data[0].id;
  return null;
}

export function promiseFactory(typeRequest, endpoint, ...params) {
  return new Promise ( async (resolve, reject ) => {
    try {
      let result;
      if (typeRequest === "get") {
        result = await Api.get(endpoint, {...params});
      } else if (typeRequest === "post") {
        result = await Api.post(endpoint, {...params});
      }
      if (result)
        resolve(result)
      else 
        reject("type request not implemented")
    } catch (error){
      reject(error);
    }
  });
}

export const calculatePrice = (arrayObjects) => {
  let price = 0;
  for(let object of arrayObjects) {
    price += object.product.currentPrice * object.amount;
  }
  return price.toFixed(2);
}