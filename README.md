# LED Light Component

This LED Light component provides a simple, customizable LED light indicator for React applications. It allows developers to easily integrate a visual indicator light into their projects, with customizable colors for different statuses.

## Installation

Install the LED Light component using npm:

```bash
npm install react-led-light
```

Or using yarn:

```bash
yarn add led-light-component
```


## Usage

To use the component, first import it into your React project:

```tsx
import LedLight from 'led-light-component';
```

Then, you can add it to your component:

```tsx
/...
    <div>
      <h1>LED Indicator</h1>
      <LedLight color="green" />
      <LedLight color="orange" />
      <LedLight color="red" />
    </div>
/...
```

## Props

The following props are available for the LED Light component:

| Prop  | Type   | Default  | Description                                        |
|-------|--------|----------|----------------------------------------------------|
| color | string | "orange" | Sets the color of the LED. Options: 'green', 'orange', 'red'. |

## Customization

You can style the LED Light component further by targeting the CSS classes applied to it. Each LED Light has a base class `Led` and an additional class indicating the color (`Led--green`, `Led--orange`, `Led--red`).

## Contributing

Contributions to enhance the LED Light component, add more features, and maintain the package are welcome. Please ensure to follow the existing code style, add unit tests for new features, and document any changes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
```