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

    describe('variant', () => {
        it('defaults to the simple variant with no Socket element', () => {
            const { container } = render(<LedLight />);
            expect(container.querySelector('.Led-root')).toHaveClass('Led-root--simple');
            expect(container.querySelector('.Socket')).not.toBeInTheDocument();
        });

        it('renders a Socket element for the realistic variant', () => {
            const { container } = render(<LedLight variant="realistic" />);
            const root = container.querySelector('.Led-root');
            expect(root).toHaveClass('Led-root--realistic');
            expect(container.querySelector('.Socket')).toBeInTheDocument();
        });

        it('renders a Socket element for the chrome variant', () => {
            const { container } = render(<LedLight variant="chrome" />);
            const root = container.querySelector('.Led-root');
            expect(root).toHaveClass('Led-root--chrome');
            expect(container.querySelector('.Socket')).toBeInTheDocument();
        });
    });

    describe('bare simple variant', () => {
        it('marks the default simple/no-glow/no-shine LED as bare', () => {
            const { container } = render(<LedLight />);
            expect(container.querySelector('.Led-root')).toHaveClass('Led-root--bare');
        });

        it('is not bare once glow or shine is enabled', () => {
            const { container: withGlow } = render(<LedLight glow />);
            expect(withGlow.querySelector('.Led-root')).not.toHaveClass('Led-root--bare');

            const { container: withShine } = render(<LedLight shine />);
            expect(withShine.querySelector('.Led-root')).not.toHaveClass('Led-root--bare');
        });

        it('is not bare for the realistic or chrome variants', () => {
            const { container } = render(<LedLight variant="realistic" />);
            expect(container.querySelector('.Led-root')).not.toHaveClass('Led-root--bare');
        });
    });

    describe('size', () => {
        it('defaults --led-size to 16px', () => {
            const { container } = render(<LedLight />);
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(root.style.getPropertyValue('--led-size')).toBe('16px');
            expect(root).not.toHaveClass('Led-root--compact');
        });

        it('applies a custom size and marks small sizes as compact', () => {
            const { container } = render(<LedLight size={32} />);
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(root.style.getPropertyValue('--led-size')).toBe('32px');
            expect(root).not.toHaveClass('Led-root--compact');
        });

        it('applies the compact modifier at or below the compact threshold', () => {
            const { container } = render(<LedLight size={12} />);
            expect(container.querySelector('.Led-root')).toHaveClass('Led-root--compact');
        });
    });

    describe('on / off', () => {
        it('is on by default with no off class', () => {
            const { container } = render(<LedLight />);
            expect(container.querySelector('.Led-root')).not.toHaveClass('Led-root--off');
        });

        it('applies the off class and dims when on is false', () => {
            const { container } = render(<LedLight on={false} />);
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(root).toHaveClass('Led-root--off');
            expect(root.style.filter).toContain('var(--led-off-brightness, 0.35)');
        });

        it('suppresses glow when off even if glow is true', () => {
            const { container } = render(<LedLight on={false} glow />);
            expect(container.querySelector('.Glow')).not.toBeInTheDocument();
        });

        it('ignores animation entirely when off', () => {
            const { container } = render(<LedLight on={false} animation={{ type: 'blink' }} />);
            const lightDisc = container.querySelector('.LightDisc') as HTMLElement;
            expect(lightDisc).not.toHaveClass('LightDisc--animated');
            expect(lightDisc.style.animationName).toBe('');
        });
    });

    describe('animation', () => {
        it('applies blink defaults', () => {
            const { container } = render(<LedLight animation={{ type: 'blink' }} />);
            const lightDisc = container.querySelector('.LightDisc') as HTMLElement;
            expect(lightDisc).toHaveClass('LightDisc--animated');
            expect(lightDisc.style.animationName).toBe('led-blink-step');
            expect(lightDisc.style.animationDuration).toBe('1000ms');
            expect(lightDisc.style.animationTimingFunction).toBe('linear');
            expect(lightDisc.style.getPropertyValue('--led-anim-min-brightness')).toBe('0');
        });

        it('applies pulse defaults', () => {
            const { container } = render(<LedLight animation={{ type: 'pulse' }} />);
            const lightDisc = container.querySelector('.LightDisc') as HTMLElement;
            expect(lightDisc).toHaveClass('LightDisc--animated');
            expect(lightDisc.style.animationName).toBe('led-oscillate');
            expect(lightDisc.style.animationDuration).toBe('1200ms');
            expect(lightDisc.style.animationTimingFunction).toBe('ease-in-out');
            expect(lightDisc.style.getPropertyValue('--led-anim-min-brightness')).toBe('0.25');
        });

        it('respects explicit overrides', () => {
            const { container } = render(
                <LedLight animation={{ type: 'pulse', duration: 500, minBrightness: 0.6, easing: 'linear' }} />
            );
            const lightDisc = container.querySelector('.LightDisc') as HTMLElement;
            expect(lightDisc.style.animationName).toBe('led-oscillate');
            expect(lightDisc.style.animationDuration).toBe('500ms');
            expect(lightDisc.style.animationTimingFunction).toBe('linear');
            expect(lightDisc.style.getPropertyValue('--led-anim-min-brightness')).toBe('0.6');
        });

        it('uses the hard-cut keyframe whenever easing is step, regardless of type', () => {
            const { container } = render(<LedLight animation={{ type: 'pulse', easing: 'step' }} />);
            const lightDisc = container.querySelector('.LightDisc') as HTMLElement;
            expect(lightDisc.style.animationName).toBe('led-blink-step');
            expect(lightDisc.style.animationTimingFunction).toBe('linear');
        });

        it('never applies animation styles to the encasing ring', () => {
            const { container } = render(
                <LedLight variant="realistic" glow animation={{ type: 'pulse' }} />
            );
            const socket = container.querySelector('.Socket') as HTMLElement;
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(socket.style.animationName).toBe('');
            expect(root.style.animationName).toBe('');
            // the glow halo itself lives on the animated LightDisc, not the root/ring
            const lightDisc = container.querySelector('.LightDisc') as HTMLElement;
            expect(lightDisc).toHaveClass('Glow');
            expect(lightDisc.style.animationName).toBe('led-oscillate');
        });
    });

    describe('accessibility', () => {
        it('defaults to aria-hidden when no label or role is given', () => {
            const { container } = render(<LedLight />);
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(root).toHaveAttribute('aria-hidden', 'true');
            expect(root).not.toHaveAttribute('role');
        });

        it('does not force aria-hidden when an aria-label is given', () => {
            const { container } = render(<LedLight aria-label="Connected" />);
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(root).not.toHaveAttribute('aria-hidden');
            expect(root).toHaveAttribute('aria-label', 'Connected');
        });

        it('does not force aria-hidden when a role is given', () => {
            const { container } = render(<LedLight role="status" />);
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(root).not.toHaveAttribute('aria-hidden');
            expect(root).toHaveAttribute('role', 'status');
        });
    });

    describe('className / style passthrough', () => {
        it('merges a custom className and style onto the root element', () => {
            const { container } = render(<LedLight className="custom-class" style={{ marginLeft: '4px' }} />);
            const root = container.querySelector('.Led-root') as HTMLElement;
            expect(root).toHaveClass('custom-class');
            expect(root.style.marginLeft).toBe('4px');
            expect(root.style.getPropertyValue('--led-size')).toBe('16px');
        });
    });
});
