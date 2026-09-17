import React from 'react';
import './styles/LedLight.css';
import shineHighlight from './styles/shine-highlight.png';

export type LedVariant = 'simple' | 'realistic' | 'chrome';
export type LedAnimationType = 'blink' | 'pulse';
export type LedEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step';

export interface LedAnimationConfig {
    type: LedAnimationType;
    duration?: number;
    minBrightness?: number;
    easing?: LedEasing;
}

export interface LedLightProps extends React.AriaAttributes {
    color?: string;
    variant?: LedVariant;
    size?: number;
    on?: boolean;
    glow?: boolean;
    shine?: boolean;
    animation?: LedAnimationConfig;
    className?: string;
    style?: React.CSSProperties;
    role?: string;
}

type CSSPropertiesWithVars = React.CSSProperties & { [customProperty: `--${string}`]: string | number };

const ANIMATION_DEFAULTS: Record<LedAnimationType, Required<Omit<LedAnimationConfig, 'type'>>> = {
    blink: { duration: 1000, minBrightness: 0, easing: 'step' },
    pulse: { duration: 1200, minBrightness: 0.25, easing: 'ease-in-out' },
};

const OFF_BRIGHTNESS = 0.35;
const COMPACT_SIZE_THRESHOLD = 12;

/**
 * Generate the box-shadow property for the specified glow color
 * @param color {string} - the color to generate the glow effect with
 */
const generateGlow = (color: string = '#FFFFFF') => {
    return `0 0 8px ${color}`;
};

/**
 * LedLight
 *
 * @param color {string} - the color of the LED light, any valid CSS color (default 'orange')
 * @param variant {'simple' | 'realistic' | 'chrome'} - flat indicator, dimensional socket/bevel, or brushed-chrome conical bezel (default 'simple')
 * @param size {number} - diameter in pixels (default 16)
 * @param on {boolean} - whether the LED is lit; off LEDs stay visible but dim and never animate (default true)
 * @param glow {boolean} - specify if the led light will have a glow effect
 * @param shine {boolean} - specify if the led light will have a shine shading on
 * @param animation {LedAnimationConfig} - optional blink/pulse animation, ignored while `on` is false
 */
export default function LedLight({
    color = 'orange',
    variant = 'simple',
    size = 16,
    on = true,
    glow = false,
    shine = false,
    animation,
    className,
    style,
    role,
    ...ariaProps
}: LedLightProps) {
    const isCompact = size <= COMPACT_SIZE_THRESHOLD;
    const isBare = variant === 'simple' && !glow && !shine;
    const effectiveGlow = glow && on;
    const isAnimated = Boolean(animation) && on;
    const resolvedAnimation = animation ? { ...ANIMATION_DEFAULTS[animation.type], ...animation } : undefined;

    // Animation (and the glow it drives) is scoped to the light itself via the LightDisc
    // wrapper below, so a blink/pulse never dims the encasing realistic/chrome ring.
    const rootStyle: CSSPropertiesWithVars = {
        '--led-size': `${size}px`,
        '--led-color': color,
    };

    if (!on) {
        rootStyle.filter = `brightness(var(--led-off-brightness, ${OFF_BRIGHTNESS}))`;
    }

    if (shine) {
        rootStyle['--led-shine-image'] = `url(${shineHighlight})`;
    }

    const lightDiscStyle: CSSPropertiesWithVars = {
        boxShadow: effectiveGlow ? generateGlow(color) : 'none',
    };

    if (isAnimated && resolvedAnimation) {
        lightDiscStyle['--led-anim-min-brightness'] = resolvedAnimation.minBrightness;
        lightDiscStyle.animationName = resolvedAnimation.easing === 'step' ? 'led-blink-step' : 'led-oscillate';
        lightDiscStyle.animationDuration = `${resolvedAnimation.duration}ms`;
        lightDiscStyle.animationTimingFunction = resolvedAnimation.easing === 'step' ? 'linear' : resolvedAnimation.easing;
        lightDiscStyle.animationIterationCount = 'infinite';
    }

    const rootClassName = [
        'Led-root',
        `Led-root--${variant}`,
        isCompact && 'Led-root--compact',
        isBare && 'Led-root--bare',
        !on && 'Led-root--off',
        className,
    ].filter(Boolean).join(' ');

    const lightDiscClassName = [
        'LightDisc',
        effectiveGlow && 'Glow',
        isAnimated && 'LightDisc--animated',
    ].filter(Boolean).join(' ');

    const hasExplicitAria = role != null || Object.keys(ariaProps).length > 0;

    return (
        <div
            className={rootClassName}
            style={{ ...rootStyle, ...style }}
            role={role}
            aria-hidden={hasExplicitAria ? undefined : true}
            {...ariaProps}
        >
            {variant !== 'simple' && <div className="Socket" />}
            <div className={lightDiscClassName} style={lightDiscStyle}>
                <div className="Led" style={{ backgroundColor: color }} />
                {shine && <div className="Shine" />}
            </div>
        </div>
    );
}
