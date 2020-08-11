import React from "react";
import { useIntl } from "react-intl";
import { CATALOG as keysCatalog } from "../../constants/i18nKeys";
import microphoneImage from "../../assets/navbar/microphone.png";
import barCodeImage from "../../assets/navbar/barCode.png";
import "./SearchBar.scss";
import { useHistory } from "react-router-dom";


const SearchBar = ({callbackSearch}) => {
  const intl = useIntl();
  const history = useHistory();

  const handleOnEnter = (e) => {
    const value = e.target.value;
    const key = e.key;
    if (key === "Enter" && value !== ""){
      console.log("mi value es "+value);
      if(callbackSearch)
        callbackSearch(value);
      else{
        history.push({
          pathname: "/search",
          state: {searched: value}
        } 
        ); 
      
      }
    }
  }

  return (
  <div className="content">
    <input type="search" placeholder={intl.formatMessage({id: keysCatalog.search})} className="input" onKeyDown={handleOnEnter}/>
    <img className="content__image" src={microphoneImage} alt={intl.formatMessage({id: keysCatalog.search})}/>
    <img className="content__image" src={barCodeImage} alt={intl.formatMessage({id: keysCatalog.navbar.barcode})} />
  </div>
  );
};

export default SearchBar;