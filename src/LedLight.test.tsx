import React from 'react';
import { render } from '@testing-library/react';
import LedLight from './LedLight';
import '@testing-library/jest-dom';

describe('LedLight Component', () => {
    it('renders with the correct classes', () => {
        const { container } = render(<LedLight color="red" glow={true} shine={true} />);

        // Check for the presence of 'Led' and 'Glow' classes
        const glowDiv = container.querySelector('.Glow');
        expect(glowDiv).toBeInTheDocument();
        expect(glowDiv).toHaveClass('Glow');

        // Check for the 'Led' class and style
        const ledDiv = container.querySelector('.Led');
        expect(ledDiv).toBeInTheDocument();
        expect(ledDiv).toHaveClass('Led');
        expect(ledDiv).toHaveStyle('background-color: red');

        // Check for 'Shine' class
        const shineDiv = container.querySelector('.Shine');
        expect(shineDiv).toBeInTheDocument();
    });

    it('does not render Shine when shine prop is false', () => {
        const { container } = render(<LedLight shine={false} />);
        const shineDiv = container.querySelector('.Shine');
        expect(shineDiv).not.toBeInTheDocument();
    });

    it('does not apply Glow class when glow prop is false', () => {
        const { container } = render(<LedLight glow={false} />);
        const glowDiv = container.querySelector('.Glow');
        expect(glowDiv).not.toBeInTheDocument();
    });

    it('has the corresponding styles when glow and shine props are true, and the color is red', () => {
        const { container } = render(<LedLight color="red" glow={true} shine={true} />);

        // Check for the 'Glow' class and glow effect style
        const glowDiv = container.querySelector('.Glow');
        expect(glowDiv).toBeInTheDocument();
        expect(glowDiv).toHaveClass('Glow');
        expect(glowDiv).toHaveStyle('box-shadow: 0 0 8px red');

        // Check for the 'Led' class and color style
        const ledDiv = glowDiv?.firstChild;
        expect(ledDiv).toHaveClass(`Led`);
        expect(ledDiv).toHaveStyle('background-color: red');

        // Check for the 'Shine' class presence within the component
        const shineDiv = container.querySelector('.Shine');
        expect(shineDiv).toBeInTheDocument();
    });

    it('has the corresponding styles when glow and shine props present (true), and the color is #D900FFFF', () => {
        const { container } = render(<LedLight color="#D900FFFF" glow shine />);

        // Check for the 'Glow' class and glow effect style
        const glowDiv = container.querySelector('.Glow');
        expect(glowDiv).toBeInTheDocument();
        expect(glowDiv).toHaveClass('Glow');
        expect(glowDiv).toHaveStyle('box-shadow: 0 0 8px #D900FFFF');

        // Check for the 'Led' class and color style
        const ledDiv = glowDiv?.firstChild;
        expect(ledDiv).toHaveClass(`Led`);
        expect(ledDiv).toHaveStyle('background-color: rgb(217, 0, 255)');

        // Check for the 'Shine' class presence within the component
        const shineDiv = container.querySelector('.Shine');
        expect(shineDiv).toBeInTheDocument();
    });
});
