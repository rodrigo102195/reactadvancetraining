import React, { useEffect, useState } from "react";
import "./Catalog.scss";
import { CATALOG as keysCatalog } from "../../constants/i18nKeys";
import { FormattedMessage } from "react-intl";
import FloatedNavbar from "../../Components/FloatedNavbar/FloatedNavbar";
import Api from "../../API/Api";
import Group from "../../Components/Group/Group";
import Slider from "../../Components/Slider/Slider";
import CategoryImage from "../../Components/CategoryImage/CategoryImage";
import Product from "../../Components/Product/Product";

const Catalog = () => {
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  const fetchFirstData = () => {
    Api.get("/groups").then((responseGroups) => setGroups(responseGroups.data));

    Api.get("/subcategories").then((responseSubcategories) =>
      setSubCategories(responseSubcategories.data)
    );

    Api.get("/categories").then((responseCategories) => {
      const categories = responseCategories.data;
      setCategories(categories);
      Api.get("/products").then((response) => {
        const products = response.data;
        setProducts(products);
        const categoriesOfGroup = categories.filter(
          (category) => category.groupId === groupSelected + 1
        );
        const offers = products.filter((product) => {
          const { normalPrice, currentPrice, categoryId } = product;
          return (
            normalPrice &&
            normalPrice > currentPrice &&
            categoriesOfGroup.some((category) => category.id === categoryId)
          );
        });
        setOffers(offers);
      });
    });
  };

  useEffect(() => {
    fetchFirstData();
  }, []);

  const onClickGroup = (groupId, indexSelected) => {
    setGroupSelected(indexSelected);
    setListProducts([]);
    const categoriesOfGroup = categories.filter(
      (category) => category.groupId === groupId
    );
    const newOffers = products.filter((product) => {
      const { normalPrice, currentPrice, categoryId } = product;
      return (
        normalPrice &&
        normalPrice > currentPrice &&
        categoriesOfGroup.some((category) => category.id === categoryId)
      );
    });
    setOffers(newOffers);
  };

  const listOnClickCategory = (categoryId) => {
    const productsOfCategory = products.filter(
      (product) => product.categoryId === categoryId
    );
    setListProducts(productsOfCategory);
  };

  const listOnClickSubCategory = (subCategoryId) => {
    const productsOfSubcategory = products.filter(product => product.subcategoryId === subCategoryId);
    setListProducts(productsOfSubcategory);
  };

  return (
    <>
      <FloatedNavbar indexSelected={9}>
        <h1 className="Catalog__title noDisplayMobile">
          <FormattedMessage id={keysCatalog.title} />
        </h1>
        <h3 className="Catalog__subtitle noDisplayMobile">
          <FormattedMessage id={keysCatalog.subtitle} />
        </h3>
        <div className="group__container">
          <Slider max={4}>
            {groups.map((group, index) => (
              <Group
                selected={index === groupSelected}
                key={group.id}
                label={group.name}
                id={group.id}
                onClick={() => onClickGroup(group.id, index)}
              />
            ))}
          </Slider>
        </div>
      </FloatedNavbar>
      <div className="CatalogCategories__containerTitle">
        <span className="CatalogCategories__title noDisplayMobile">
          {!!groups[groupSelected] && groups[groupSelected].name}
        </span>
        {offers.length > 0 && listProducts.length === 0 && (
          <span className="CatalogCategories__amountSpan noDisplayMobile">
            <FormattedMessage
              id={keysCatalog.amountOffer}
              values={{ amount: offers.length }}
            />
          </span>
        )}
      </div>
      {listProducts.length === 0 ? (
        <>
          <div className="CatalogCategories__containerImages">
            {categories.map(
              (category) =>
                category.groupId === groupSelected + 1 && (
                  <CategoryImage
                    key={category.id}
                    id={category.id}
                    title={category.name}
                    subCategories={subCategories.filter(
                      (subCategory) => subCategory.categoryId === category.id
                    )}
                    onClickCategory={listOnClickCategory}
                    onClickSubcategory={listOnClickSubCategory}
                  />
                )
            )}
          </div>
          {offers.length > 0 && (
            <div className="noDisplayMobile">
              <div className="CatalogCategories__containerTitle">
                <span className="CatalogCategories__title">
                  <FormattedMessage id={keysCatalog.offers} />
                </span>
              </div>
              <div className="Catalog__offersContainer">
                <Slider max={5} workOnDesktop>
                  {offers.map((offer) => (
                    <Product key={offer.id} product={offer} />
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="listProducts__container">
          {listProducts.map((product) => (
            <Product key={product.id} product={product} optionBuy/>
          ))}
        </div>
      )}
    </>
  );
};

export default Catalog;
