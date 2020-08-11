import React, { useState, useEffect } from "react";
import "./Offers.scss";
import Api from "../../API/Api";
import Axios from "axios";
import FloatedNavbar from "../../Components/FloatedNavbar/FloatedNavbar";
import { OFFERS as keysOffers } from "../../constants/i18nKeys";
import { FormattedMessage } from "react-intl";
import { Loader } from "semantic-ui-react";
import Product from "../../Components/Product/Product";

const Offers = () => {
  const [list, setList] = useState([]);
  const [searchRequested, setSearchRequested] = useState(false);
  
  const fetchData = async () => {
    try{
      setSearchRequested(true);
      const fetchedData =  await Axios.all([Api.get("/products"),Api.get("/categories")]);
      const products = fetchedData[0].data;
      const categories = fetchedData[1].data;
      const productsFilteredByNormalPrice = products.filter( product => {
        const { normalPrice, currentPrice} = product;
        return (normalPrice && normalPrice > currentPrice)
      } );
      const listByCategories = [];
      for (let category of categories ){
        let newObject = {categoryName: category.name};
        newObject.products = productsFilteredByNormalPrice.filter(product => product.categoryId === category.id);
        listByCategories.push(newObject);
      }
      setList(listByCategories);
      setSearchRequested(false);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchData();
  }, [])

  return (
    <>
    <FloatedNavbar indexSelected={8}>
      <h1 className="Offers__title  form--centerText">
        <FormattedMessage id={keysOffers.title} />
      </h1>
      <h3 className="Offers__subtitle form--centerText">
        <FormattedMessage id={keysOffers.subtitle} />
      </h3>
    </FloatedNavbar>
    {searchRequested ? (
      <Loader className="Offers__loader" active inline="centered" />
    ) : (
      <div className="Offers__allContainer">
        {list.map((objectCategory) => (
          objectCategory.products.length > 0 &&
          <div key={objectCategory.categoryName}>
          <h1 className="Offers__title form--centerText">
            {objectCategory.categoryName}
          </h1>
          <div className="Offers__listContainer">
          {objectCategory.products.map(product => <Product key={product.id} product={product} />)}
          </div>
          </div>
        ))}
      </div>
    )}
  </>
  );
};

export default Offers;