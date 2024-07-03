import React from 'react';
import '../styles/LedLight.css';

interface LedLightProps {
    color?: string;
}

/**
 * LedLight
 *
 * @param color {string} - the color of the led light:
 *  - 'green'
 *  - 'orange'
 *  - 'red'
 */
export default function LedLight({color = 'orange'}:LedLightProps) {
    return <div className={`Led Led--${color}`}></div>;
}