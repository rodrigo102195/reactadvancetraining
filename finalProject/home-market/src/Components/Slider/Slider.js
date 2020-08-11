import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import "./Slider.scss";

const Slider = ({children, max, workOnDesktop}) => {
  const [min, setMin] = useState(0);
  const [currentMax, setCurrentMax] = useState(max);
  const [isMobile, setIsMobile] = useState(false);
  let conditionDesktop = window.matchMedia("(min-width: 992px)");
  const [childrenArray, setChildrenArray] = useState(children.slice(min,max+1));

  useEffect(()=>{
    setChildrenArray(children.slice(min,max));
  },[children])

  const matchMediaListener = (x) => {
    if(!conditionDesktop.matches && isMobile===false){
      setIsMobile(true);
    } else if(conditionDesktop.matches && isMobile===true) {
      setIsMobile(false);
    }
  }

  conditionDesktop.addListener(matchMediaListener)
  matchMediaListener(conditionDesktop);

  const goLeft = () => {
    if (min > 0 ) {
      setChildrenArray(children.slice(min-1,currentMax-1));
      setMin(min-1)
      setCurrentMax(currentMax-1);
    }
  }

  const goRight = () => {
    if (currentMax < children.length -1 ) {
      setChildrenArray(children.slice(min+1,currentMax+1));
      setMin(min+1);
      setCurrentMax(currentMax+1);
    }
  }

  return (
    <>
    {(isMobile || workOnDesktop ) && childrenArray.length > 0 ? (
      <>
    <Icon name="angle left" className="Slider__arrowIcon" id="SliderLeft" size="huge" onClick={goLeft}/>
      {childrenArray.map(child => child)} 
    <Icon name="angle right" className="Slider__arrowIcon" id="SliderRight" size="huge" onClick={goRight}/>
    </>
    ) 
    : children}
    
    </>
  )
}

export default Slider;