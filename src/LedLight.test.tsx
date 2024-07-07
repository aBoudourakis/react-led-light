import React from 'react';
import { render } from '@testing-library/react';
import LedLight from './LedLight';
import '@testing-library/jest-dom';

describe('LedLight Component', () => {
    test('renders with default color', () => {
        const { container } = render(<LedLight />);
        expect(container.firstChild).toHaveClass('Led--orange');
    });

    test('renders with specified color green', () => {
        const { container } = render(<LedLight color="green" />);
        expect(container.firstChild).toHaveClass('Led--green');
    });

    test('renders with specified color orange', () => {
        const { container } = render(<LedLight color="orange" />);
        expect(container.firstChild).toHaveClass('Led--orange');
    });

    test('renders with specified color red', () => {
        const { container } = render(<LedLight color="red" />);
        expect(container.firstChild).toHaveClass('Led--red');
    });

    test('\'renders default orange with a not supported specified color blue', () => {
        const { container } = render(<LedLight color="blue" />);
        expect(container.firstChild).toHaveClass('Led--blue');
    });
});
