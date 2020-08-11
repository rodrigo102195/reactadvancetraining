import React from 'react';
import './info.scss';

const Info = ({children, title}) => (
  <div className="info">
    <span className="info__title">{title}</span>
    <div className="info__content">{children}</div>
  </div>
);

export default Info;