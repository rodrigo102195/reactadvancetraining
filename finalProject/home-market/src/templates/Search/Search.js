import React, { useState, useEffect } from "react";
import { SEARCH as keysSearch } from "../../constants/i18nKeys";
import "./Search.scss";
import FloatedNavbar from "../../Components/FloatedNavbar/FloatedNavbar";
import { FormattedMessage } from "react-intl";
import Api from "../../API/Api";
import Product from "../../Components/Product/Product";
import { Loader } from "semantic-ui-react";

const Search = ({ location }) => {
  const searched = location && location.state ? location.state.searched : "";
  const [products, setProducts] = useState([]);
  const [searchRequested, setSearchRequested] = useState(false);

  const updateList = async (searched) => {
    setSearchRequested(true);
    const response = await Api.get("/products");
    const dataFiltered = response.data.filter((product) =>
      product.name.toLowerCase().includes(searched.toLowerCase())
    );
    setProducts(dataFiltered);
    setSearchRequested(false);
    console.log(dataFiltered);
  };

  useEffect(() => {
    //Ingrese al search desde el buscador y no desde el navbar
    console.log("searched es ", searched);
    if (searched && searched !== "") {
      updateList(searched);
    }
  }, []);

  return (
    <>
      <FloatedNavbar indexSelected={3} callbackSearch={updateList}>
        <h1 className="Search__title Search--colorBlack form--centerText">
          <FormattedMessage id={keysSearch.title} />
        </h1>
        <h3 className="Search__subtitle Search--colorBlack form--centerText">
          <FormattedMessage id={keysSearch.subtitle} />
        </h3>
      </FloatedNavbar>
      {searchRequested ? (
        <Loader className="Search__loader" active inline="centered" />
      ) : (
        <div className="Search__listContainer">
          {products.map((product) => (
            <Product key={product.id} product={product} optionBuy />
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
