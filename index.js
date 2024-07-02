import React from 'react';
import './styles/LedLight.css';

const LedLight = ({ color = 'orange' }) => {
  return <div className={`Led Led--${color}`}></div>;
};

export default LedLight;
