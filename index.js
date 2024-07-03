import React from 'react';
import './styles/LedLight.css';

function LedLight({ color = 'orange' }) {
  return <div className={`Led Led--${color}`}></div>;
}

export default LedLight;
