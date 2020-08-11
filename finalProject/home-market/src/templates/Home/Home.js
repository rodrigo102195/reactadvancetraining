import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import logoRed from "../../assets/logo-red.png";
import "./Home.scss";
import Button from "../../Components/Button/Button";
import { FormattedMessage } from "react-intl";
import benefitOneImage from "../../assets/benefitOne.png";
import benefitTwoImage from "../../assets/benefitTwo.png";
import benefitThreeImage from "../../assets/benefitThree.png";
import benefitFourImage from "../../assets/benefitFour.png";
import benefitsSearch1 from "../../assets/benefitsSearch1.png";
import benefitsSearch2 from "../../assets/benefitsSearch2.png";
import { HOME } from "../../constants/i18nKeys";
import { useSelector } from "react-redux";
import statusTypes from "../../constants/statusTypes";

const Home = ({ intl }) => {
  const benefits = [
    {
      image: benefitOneImage,
      ...HOME.benefitOne,
    },
    {
      image: benefitTwoImage,
      ...HOME.benefitTwo,
    },
    {
      image: benefitThreeImage,
      ...HOME.benefitThree,
    },
    {
      image: benefitFourImage,
      ...HOME.benefitFour,
    },
  ];

  const benefitsSearch = [
    {
      image: benefitsSearch1,
      ...HOME.benefitsSearch.benefitOne,
    },
    {
      image: benefitsSearch2,
      ...HOME.benefitsSearch.benefitTwo,
    },
  ];

  const loginStatus = useSelector(state => state.login.status);
  const history = useHistory();
  const onClickIngresar = () => {
    if(loginStatus === statusTypes.LOGGED_IN) {
      history.push("/catalog");
    } else {
      history.push("/login")
    }
  };

  return (
    <Fragment>
      <section className="login floatedContainer">
        <img className="login__logo" src={logoRed} alt="logo" />
        <Button onClick={onClickIngresar}>
          <FormattedMessage id="home.login" />
        </Button>
      </section>
      <section>
        <h4 className="section__title">
          <FormattedMessage id="home.aboutUs.title" />
        </h4>
        <p className="section__text">
          <FormattedMessage id="home.aboutUs.text" />
        </p>
      </section>
      <section className="benefits">
        {benefits.map((benefit, index) => (
          <article className="benefits__item" key={index}>
            <img
              className="benefits__image"
              src={benefit.image}
              alt={intl.formatMessage({ id: benefit.alt })}
            />
            <h4 className="benefits__title">
              <FormattedMessage id={benefit.title} />
            </h4>
            <p className="benefits__text">
              <FormattedMessage id={benefit.text} />
            </p>
          </article>
        ))}
      </section>
      <section>
        <h4 className="section__title">
          <FormattedMessage id={HOME.benefitsSearch.title} />
        </h4>
        <div className="benefits benefits--noColor">
          {benefitsSearch.map((benefit, index) => (
            <article className="benefits__item" key={index}>
              <img
                className="benefits__image searchBenefits__image"
                src={benefit.image}
                alt={intl.formatMessage({ id: benefit.alt })}
              />
              <p className="searchBenefits__text">
                <FormattedMessage id={benefit.text} />
              </p>
            </article>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default injectIntl(Home);
