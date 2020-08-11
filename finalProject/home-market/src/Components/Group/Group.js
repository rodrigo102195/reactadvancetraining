import React from "react";
import groupIdToImage from "../../constants/groupIdtoImage";
import "./Group.scss";

const Group = ({selected, label, id, onClick}) => {
  const imageId = groupIdToImage[id] ? id : 1;
  const imageSrc = require(`../../assets/groups/${groupIdToImage[imageId]}`);
  

  return (
    <div className="Group" onClick={onClick}>
      <div className={"Group__circle " + (selected && "Group__circle--selected")}>
        <img src={imageSrc} alt={label} className="Group__image"/>
      </div>
      <span className="Group__label">{label}</span>
      <hr className={"Group__horizontalRuler "+ (!selected && "hidden")}/>
    </div>
  );
}

export default Group;