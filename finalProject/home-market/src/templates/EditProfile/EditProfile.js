import React, { useReducer, useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { EDITPROFILE as keysEditProfile } from "../../constants/i18nKeys";
import { initialState, reducer } from "./store";
import "./EditProfile.scss";
import Input from "../../Components/input/Input";
import {
  setNameAndLastName,
  setPhone,
  setAddress,
  setLanguage
} from "./store/actions";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Api from "../../API/Api";
import imageAvatar from "../../assets/male-avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { getIdByEmail } from "../../utils";
import Toggle from "../../Components/Toggle/Toggle";
import {storeUser} from "../../actions";

const EditProfile = () => {
  const intl = useIntl();
  const stateLogin = useSelector((state) => state.login);
  const history = useHistory();
  const [editProfileStore, editProfileDispatch] = useReducer(
    reducer,
    initialState
  );
  const [editProfileRequested, setEditProfileRequested] = useState(false);
  const {
    nameAndLastName,
    errorNameAndLastName,
    phone,
    errorPhone,
    address,
    errorAddress,
    language,
  } = editProfileStore;
  const dispatch = useDispatch();

  const updateFields = () => {
    const {address: addressStore, language: languageStore, lastName: lastNameStore, name: nameStore, phone: phoneStore} = stateLogin;
    if (nameStore && lastNameStore){
      const newNameAndLastName = nameStore + " " + lastNameStore;
      setNameAndLastName(editProfileDispatch, {intl, value: newNameAndLastName}); 
    } else if (nameStore) {
      setNameAndLastName(editProfileDispatch, {intl, value: nameStore});
    }
    if (phoneStore)
      setPhone(editProfileDispatch, {intl, value: phoneStore});
    if (addressStore) {
      setAddress(editProfileDispatch, {intl, value: addressStore});
    } 
    if (languageStore) {
      setLanguage(editProfileDispatch, {intl, value: languageStore === "en" ? true : false});
    }
  }

  useEffect(()=>{updateFields()}, []); //You are logged and navigating in the app
  useEffect(()=>{updateFields()},[stateLogin.id]); // you go directly to this route so you must wait to get all the values

  const submit = async (event) => {
    event.preventDefault();
    const error =
      errorNameAndLastName !== "" ||
      errorPhone !== "" ||
      errorAddress !== "" ||
      nameAndLastName.length === 0 ||
      phone.length === 0 ||
      address.length === 0;
    if (!error) {
      setEditProfileRequested(true);
      const namesSplited = nameAndLastName.split(" ");
      let name;
      let lastName;
      if (namesSplited.length === 1) {
        //just have a name
        name = namesSplited[0];
      } else {
        // I assume that the last name is the final word, everything else is the name
        lastName = namesSplited.pop();
        name = namesSplited.join(" ");
      }
      const id = await getIdByEmail(stateLogin.email);
      await Api.patch(`/users/${id}`, {
        name,
        lastName,
        phone,
        address,
        language,
      });
      dispatch(storeUser({name,lastName, phone, address, language}))
      setEditProfileRequested(false);
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line default-case
    switch (name) {
      case "nameAndLastName":
        setNameAndLastName(editProfileDispatch, { intl, value });
        break;
      case "phone":
        setPhone(editProfileDispatch, { intl, value });
        break;
      case "address":
        setAddress(editProfileDispatch, { intl, value });
    }
  };

  const onChangeLanguage = (e) => {
    const value = e.target.checked;
    setLanguage(editProfileDispatch, {intl, value});
  }

  return (
    <div className="floatedContainer form__container--flex">
      <h3 className="form__title">
        <FormattedMessage id={keysEditProfile.title} />
      </h3>
      <form className="form__container--flex centered" onSubmit={submit}>
        <img
          src={imageAvatar}
          alt={intl.formatMessage({ id: keysEditProfile.avatar.alt })}
          className="EditProfile__avatar"
        />
      {/*<input type="file" onChange={fileChangeHandler()} />*/ }
        <div className="form__container--flex centered">
          <label
            htmlFor="nameAndLastName"
            className={
              "form__label " +
              (errorNameAndLastName && "form__label--errorColor")
            }
          >
            <FormattedMessage id={keysEditProfile.nameAndLastName.text} /> *
          </label>
          <Input
            id="nameAndLastName"
            value={nameAndLastName}
            onChange={onChange}
            name="nameAndLastName"
            borderColor={errorNameAndLastName === "" ? "black" : "red"}
          />
          <span
            className={
              errorNameAndLastName
                ? "form__label form__label--errorColor"
                : "hidden"
            }
          >
            {errorNameAndLastName}
          </span>
        </div>
        <div className="form__container--flex centered">
          <label
            htmlFor="phone"
            className={
              "form__label " + (errorPhone && "form__label--errorColor")
            }
          >
            <FormattedMessage id={keysEditProfile.phone.text} /> *
          </label>
          <Input
            id="phone"
            value={phone}
            onChange={onChange}
            name="phone"
            borderColor={errorPhone === "" ? "black" : "red"}
          />
          <span
            className={
              errorPhone ? "form__label form__label--errorColor" : "hidden"
            }
          >
            {errorPhone}
          </span>
        </div>
        <div className="form__container--flex centered">
          <label
            htmlFor="address"
            className={
              "form__label " + (errorAddress && "form__label--errorColor")
            }
          >
            <FormattedMessage id={keysEditProfile.address.text} /> *
          </label>
          <Input
            id="address"
            value={address}
            onChange={onChange}
            name="address"
            borderColor={errorAddress === "" ? "black" : "red"}
          />
          <span
            className={
              errorAddress ? "form__label form__label--errorColor" : "hidden"
            }
          >
            {errorAddress}
          </span>
        </div>
        <div className="EditProfile__checkboxContainer">
          <span className="form__label">ESP</span>
          <div className="EditProfile__toggleContainer"><Toggle checked={language === "en"} onChange={onChangeLanguage} name="language"/></div>
          <span className="form__label">ENG</span>
        </div>
        <div className="EditProfile__buttonsContainer">
          {editProfileRequested ? (
            <Loader className="EditProfile__loader" active inline="centered" />
          ) : (
            <>
              <Button
                typeButton={"secondary"}
                onClick={() => history.push("/login")}
                className="form__button"
              >
                <FormattedMessage id={keysEditProfile.cancel} />
              </Button>

              <Button type="submit" className="form__button">
                <FormattedMessage id={keysEditProfile.save} />
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
// <Checkbox name="language" toggle checked={language === "en"} onChange={(e, {checked}) => {console.log(checked);setLanguage(editProfileDispatch, {intl, value: checked})}}/>

export default EditProfile;
