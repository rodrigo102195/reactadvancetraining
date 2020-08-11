import React from "react";
import "./Hour.scss";
import imageHour from "../../assets/hour.jpg";
import { useIntl, FormattedMessage } from "react-intl";
import { PURCHASE as keysPurchase } from "../../constants/i18nKeys";

const Hour = ({ range, rangeSelected, onClick }) => {
  const intl = useIntl();
  const isSelected =
    rangeSelected.min === range.min && rangeSelected.max === range.max;
  return (
    <div className="Hour" >
      <img
        src={imageHour}
        alt={intl.formatMessage({ id: keysPurchase.hour.alt })}
        className="Hour__img"
      />
      <span onClick={onClick}
        className={"Hour__span " + (isSelected ? "Hour__span--selected" : "")}
      >
        <FormattedMessage
          id={keysPurchase.hour.range}
          values={{ min: range.min, max: range.max }}
        />
      </span>
    </div>
  );
};

export default Hour;
