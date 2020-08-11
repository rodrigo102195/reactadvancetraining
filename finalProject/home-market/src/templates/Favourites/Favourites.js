import React, { useEffect, useState } from "react";
import "./Favourites.scss";
import Axios from "axios";
import Api from "../../API/Api";
import { useSelector } from "react-redux";
import FloatedNavbar from "../../Components/FloatedNavbar/FloatedNavbar";
import { FormattedMessage } from "react-intl";
import { FAVOURITES as keysFavourites } from "../../constants/i18nKeys";
import { Loader } from "semantic-ui-react";
import Product from "../../Components/Product/Product";

const Favourites = () => {
  const [list, setList] = useState([]);
  const userId = useSelector((state) => state.login.id);
  const [searchRequested, setSearchRequested] = useState(false);

  useEffect(() => {
    if(userId) 
      fetchData();
  }, []); //Wait to the user id to fetch the data

  useEffect(() => {
    if(userId)
      fetchData();
  },[userId])

  const fetchData = async () => {
    try {
      setSearchRequested(true);
      const fetchedData = await Axios.all([
        Api.get("/products"),
        Api.get("/categories"),
        Api.get("/purchases", { params: {userId} } ),
      ]);
      const products = fetchedData[0].data;
      const categories = fetchedData[1].data;
      const purchases = fetchedData[2].data;
      const filterProductsByPurchases = products.filter((product) =>
        purchases.some((purchase) =>
          purchase.productIds.some((idProduct) => idProduct === product.id)  
        )
      );
      const listProductsByCategories = []
      for (let category of categories) {
        let newObject = {categoryName: category.name};
        newObject.products = filterProductsByPurchases.filter(product => product.categoryId === category.id);
        listProductsByCategories.push(newObject);
      }
      setList(listProductsByCategories);
      setSearchRequested(false);
    } catch (error) {
      setSearchRequested(false);
      console.log(error);
    }
  };

  return (
    <>
      <FloatedNavbar indexSelected={6}>
        <h1 className="Favourites__title  form--centerText">
          <FormattedMessage id={keysFavourites.title} />
        </h1>
        <h3 className="Favourites__subtitle form--centerText">
          <FormattedMessage id={keysFavourites.subtitle} />
        </h3>
      </FloatedNavbar>
      {searchRequested ? (
        <Loader className="Favourites__loader" active inline="centered" />
      ) : (
        <div className="Favourites__allContainer">
          {list.map((objectCategory) => (
            objectCategory.products.length > 0 &&
            <div key={objectCategory.categoryName}>
            <h1 className="Favourites__title form--centerText">
              {objectCategory.categoryName}
            </h1>
            <div className="Favourites__listContainer">
            {objectCategory.products.map(product => <Product key={product.id} product={product} optionBuy />)}
            </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;
