// dist/index.d.ts
declare module 'react-led-light' {
    interface LedLightProps {
        color?: 'green' | 'orange' | 'red';
    }

    export default function LedLight(props: LedLightProps): JSX.Element;
}
