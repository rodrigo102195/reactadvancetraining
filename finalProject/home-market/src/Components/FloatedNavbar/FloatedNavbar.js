import React, { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { CATALOG as keysCatalog } from "../../constants/i18nKeys";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import shoppingCartImage from "../../assets/navbar/shoppingCart.png";
import myProfileImage from "../../assets/navbar/myProfile.png";
import searchImage from "../../assets/navbar/search.png";
import notificationsImage from "../../assets/navbar/notifications.png";
import questionImage from "../../assets/navbar/question.png";
import trackingImage from "../../assets/navbar/tracking.png";
import bookmarkImage from "../../assets/navbar/bookmark.png";
import recipesImage from "../../assets/navbar/recipes.png";
import offersImage from "../../assets/navbar/offers.png";
import catalogImage from "../../assets/navbar/catalog.png";
import logOutImage from "../../assets/navbar/logOut.png";
import shoppingCartBlackImage from "../../assets/navbar/shoppingCart--black.png";
import { ReactComponent as HamburgerMenu } from "../../assets/navbar/open-menu.svg";
import "./FloatedNavbar.scss";
import SearchBar from "../SearchBar/SearchBar";
import { logOut } from "../../actions";
import { calculatePrice } from "../../utils";
import SelectedProducts from "../SelectedProducts/SelectedProducts";

const FloatedNavbar = ({ children, indexSelected, callbackSearch }) => {
  const intl = useIntl();
  const cart = useSelector((state) => state.shoppingCart.cart);
  const name = useSelector((state) => state.login.name);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showShopping, setShowShopping] = useState(false);
  const navbarData = [
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.shoppingCart }),
      image: shoppingCartBlackImage,
      secondValue: `$${calculatePrice(cart)}`,
      to: "/purchase",
      disabled: calculatePrice(cart) === "0.00",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.myProfile }),
      image: myProfileImage,
      to: "/editProfile",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.admin }),
      image: questionImage,
      to: "",
      onlyAdmin: true,
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.search }),
      image: searchImage,
      to: "/search",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.notifications }),
      image: notificationsImage,
      to: "",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.tracking }),
      image: trackingImage,
      to: "",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.bookmark }),
      image: bookmarkImage,
      to: "/favourites",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.recipes }),
      image: recipesImage,
      to: "",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.offers }),
      image: offersImage,
      to: "/offers",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.catalog }),
      image: catalogImage,
      to: "/catalog",
    },
    {
      text: intl.formatMessage({ id: keysCatalog.navbar.logOut }),
      image: logOutImage,
      to: "/",
      callback: () => {
        dispatch(logOut());
      },
    },
  ];
  navbarData[indexSelected].selected = true;

  const redirectTo = (route, callback, disabled) => {
    if(!disabled) {
      if (callback) 
        callback();
      history.push(route);
    }
  };

  const toggleMenu = () => {
    const classes = document.getElementById("options").classList;
    if (classes.contains("hidden")) classes.remove("hidden");
    else classes.add("hidden");
  };

  const itemShouldBeRender = (item) => {
    return (item.onlyAdmin && role === "ADMIN") || !item.onlyAdmin;
  };

  const toggleShopping = () => {
    setShowShopping(!showShopping);
  };

  return (
    <div className="floatedContainer noPadding">
      <nav className="navbar">
        <div className="navbar__leftSideContainer">
          <HamburgerMenu onClick={toggleMenu} />
          <ul id="options" className="hidden">
            {navbarData.map(
              (item, index) =>
                itemShouldBeRender(item) && (
                  <li
                    key={index}
                    className={item.selected ? "backgroundPrimaryRed" : ""}
                  >
                    <div className="navbar__listItemLeftSide">
                      <img
                        src={item.image}
                        alt={item.text}
                        className={"navbar__imageItem "+(item.disabled ? "navbar__imageItem--normalPointer" : "")}
                        onClick={() => redirectTo(item.to, item.callback, item.disabled)}
                      />
                      <span>{item.disabled}</span>
                      {item.disabled ? (
                        <span>{item.text}</span>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={item.callback ? item.callback : () => {}}
                        >
                          {item.text}
                        </Link>
                      )}
                    </div>
                    {item.secondValue && (
                      <span className="navbar__secondOptions">
                        {item.secondValue}
                      </span>
                    )}
                  </li>
                )
            )}
          </ul>

          <span className="navbar__greetingText">
            <FormattedMessage
              id={keysCatalog.greeting}
              values={{ name: name }}
            />
          </span>
        </div>
        <div className="navbar__rightSideContainer">
          <SearchBar callbackSearch={callbackSearch}/>
          <img
            src={shoppingCartImage}
            alt="shopping cart"
            className="navbar__shoppingCart"
            onClick={toggleShopping}
          />
        </div>
        {showShopping && <SelectedProducts />}
      </nav>
      {children}
    </div>
  );
};

export default FloatedNavbar;
