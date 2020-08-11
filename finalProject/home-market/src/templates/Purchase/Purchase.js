import React, { useState, useEffect } from "react";
import "./Purchase.scss";
import FloatedNavbar from "../../Components/FloatedNavbar/FloatedNavbar";
import { FormattedMessage, useIntl } from "react-intl";
import { PURCHASE as keysPurchase } from "../../constants/i18nKeys";
import Input from "../../Components/input/Input";
import { useSelector, useDispatch } from "react-redux";
import { validateAlphabeticAndNumeric } from "../../utils";
import { Link, useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Hour from "../../Components/Hour/Hour";
import { Modal, Header, Loader } from "semantic-ui-react";
import imageCheckList from "../../assets/checklist.png";
import checkMarkImage from "../../assets/checkmark.png";
import Api from "../../API/Api";
import { resetCart } from "../../actions";

const Purchase = () => {
  const addressOfProfile = useSelector((state) => state.login.address);
  const history = useHistory();
  const dispatch = useDispatch();
  const [address, setAddress] = useState(
    addressOfProfile ? addressOfProfile : ""
  );
  const [errorAddress, setErrorAddress] = useState("");
  const [step, setStep] = useState(1);
  const intl = useIntl();
  const [date, setDate] = useState(new Date());
  const rangeHours = [
    { min: 9, max: 10 },
    { min: 10, max: 12 },
    { min: 12, max: 14 },
    { min: 14, max: 16 },
    { min: 16, max: 18 },
  ];
  const [rangeSelected, setRangeSelected] = useState({ min: 9, max: 10 });
  const language = useSelector((state) => state.login.language);
  const formatterMonth = new Intl.DateTimeFormat(
    language && language === "en" ? "en" : "es",
    { month: "long" }
  );
  const [clarification, setClarification] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const userId = useSelector(state => state.login.id);
  const cart = useSelector(state => state.shoppingCart.cart);

  const onChangeAddress = (e) => {
    const value = e.target.value;
    if (value === "")
      setErrorAddress(intl.formatMessage({ id: keysPurchase.requiredField }));
    else if (value.length < 5 || value.length > 60) {
      setErrorAddress(
        intl.formatMessage({ id: keysPurchase.address.errors.length })
      );
    } else if (!validateAlphabeticAndNumeric(value)) {
      setErrorAddress(
        intl.formatMessage({ id: keysPurchase.address.errors.alphaNumeric })
      );
    } else {
      setErrorAddress("");
    }
    setAddress(value);
  };

  useEffect(() => {
    setAddress(addressOfProfile);
  }, [addressOfProfile]); //in case you directly change the route of the page you need to wait the profile information

  const submit = (event) => {
    event.preventDefault();
    setStep(step + 1);
    if (step > 2)
      setModalOpen(true);
  };

  const selectHourHandler = (range) => {
    setRangeSelected(range);
  };

  const onChangeClarification = (e) => {
    const value = e.value;
    setClarification(value);
  }

  const checkout = async () => {
    setLoader(true);
    const productIds = cart.map( object => object.product.id);
    await Api.post("/purchases", {userId,productIds});
    dispatch(resetCart());
    setLoader(false);
    setPurchased(true);
  }

  const modalCloseHandler = () => {
    if(purchased){
      history.push("/catalog");
    } else {
      setModalOpen(false);
    }
  }

  return (
    <>
      <FloatedNavbar indexSelected={0}>
        <h3 className="form__title">
          <FormattedMessage
            id={step === 1 ? keysPurchase.title : keysPurchase.calendar.title}
          />
        </h3>
        <form
          className="form__container--flex centered"
          onSubmit={(event) => submit(event)}
        >
          {step === 1 ? (
            <div className="form__container--flex centered">
              <Input
                id="address"
                value={address}
                onChange={onChangeAddress}
                borderColor={errorAddress === "" ? "black" : "red"}
              />
              <span
                className={
                  errorAddress
                    ? "form__label form__label--errorColor"
                    : "hidden"
                }
              >
                {errorAddress}
              </span>
              <Link className="Purchase__goToEditProfile" to="/editProfile">
                <FormattedMessage id={keysPurchase.address.title} />
              </Link>
            </div>
          ) : step === 2 ? (
            <Calendar
              className="Purchase__calendar"
              minDate={new Date()}
              onChange={setDate}
              value={date}
            />
          ) : (
            rangeHours.map((range, index) => (
              <Hour
                key={index}
                range={range}
                rangeSelected={rangeSelected}
                onClick={() => selectHourHandler(range)}
              />
            ))
          )}
          <Modal open={modalOpen} basic size="small" closeIcon onClose={modalCloseHandler}>
            <Header
              content={
                <h1>
                  {purchased ? intl.formatMessage({id:keysPurchase.checkout.finishedParagraph}) : intl.formatMessage({ id: keysPurchase.checkout.title })}
                </h1>
              }
            />
            <Modal.Content>
              {!purchased &&  (
              <>
              <img
                src={imageCheckList}
                alt={intl.formatMessage({ id: keysPurchase.checkout.title })}
                className="modal__image"
              />
              <p>
                <FormattedMessage
                  id={keysPurchase.checkout.subtitle}
                  values={{
                    address,
                    day: date.getDate(),
                    month: formatterMonth.format(date),
                    min: rangeSelected.min,
                    max: rangeSelected.max,
                  }}
                />
              </p>
              <p>
                <FormattedMessage id={keysPurchase.checkout.secondSubtitle} />
              </p>
              <h3><FormattedMessage id={keysPurchase.checkout.clarification.title} /></h3>
              <Input
                id="clarification"
                value={clarification}
                onChange={onChangeClarification}
                maxLength={40}
                placeholder={intl.formatMessage({id: keysPurchase.checkout.clarification.placeholder})}
              /> </>)}
             
            </Modal.Content>
            
            <Modal.Actions>
              {purchased ? <img className="Purchase__purchasedImage" src={checkMarkImage} alt={intl.formatMessage({id: keysPurchase.checkout.finished})} /> :
              loader ? 
              <Loader className="Purchase__loader" active inline="centered" />
              :<Button onClick={checkout}>
              <FormattedMessage id={keysPurchase.checkout.button} />
            </Button>
                }
              
            </Modal.Actions>
          </Modal>
          
          <Button
            className="form__button Login__button"
            type="submit"
            typeButton={
              errorAddress === "" && address !== "" ? "primary" : "disabled"
            }
          >
            <FormattedMessage id={keysPurchase.continue} />
          </Button>
        </form>
      </FloatedNavbar>
    </>
  );
};

export default Purchase;
