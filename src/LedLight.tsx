import '../styles/LedLight.css';

/**
 * Generate the box-shadow property for the specified color
 * @param color {string} - the color to generate the glow effect with
 */
const generateGlow = (color: string = '#FFFFFF') => {
    return `0 0 8px ${color}`;
};

interface LedLightProps {
    color?: string;
    glow?: boolean;
    shine?: boolean;
}

/**
 * LedLight
 *
 * @param color {string} - the color of the LED light
 * @param glow {boolean} - specify if the led light will have a glow effect
 * @param shine {boolean} - specify if the led light will have a shine shading on
 */
export default function LedLight({color = 'orange', glow = false, shine = false}: LedLightProps) {
    return <div
        className={glow ? 'Glow' : ''}
        style={{boxShadow: glow ? generateGlow(color) as string : 'none'}}
    >
        <div
            className={`Led`}
            style={{backgroundColor: color}}
        ></div>
        {shine && <div className="Shine"></div>}
    </div>;
}