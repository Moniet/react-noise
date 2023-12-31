# react-noise

`react-noise` is a light-weight react component that helps achieve a high-def 'noisy' texture effect. It supports both static and animated rendering as well as themeing.

https://github.com/Moniet/react-noise/assets/20152320/6f46e060-3715-46b8-8a70-85ffa3a9f383

## Installation

```
// with pnpm :
pnpm i react-noise

//with npm :
npm i react-noise

// with yarn
with yarn : yarn add react-noise`
```

## Usage

### Without config

```jsx
"use client" // if using next.js

import { Noise, NoiseContent } from "react-noise"
import "react-noise/css" // 🚧 required for base styling and animation

const cardStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '20px'
  backgroundImage: "var(--bg-image)",
  overflow: 'hidden' // 🚧 to prevent noise overflow, not applied by default
}

const labelStyle = {
  fontSize: '4rem',
  color: 'white'
}

const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}


const NoisyImageCard = ({  bgImage, label, animate }) => {

  return (
    <Noise
      isAnimated={animate} // ✨
      style={{
        ...cardStyle,
        '--bg-image': bgImage
      }}
    >
      {/*👇 an (optional) helper for easier content styling (recommended) */}
      <NoiseContent style={contentStyle}>
        <div style={labelStyle}>
          {label}
        </div>
      </NoiseContent>
    </Noise>
  )
}

```

### With config

```jsx
...

useNoiseConfig({ // should be set at top level, e.g App.tsx
  key: "img-noise",  // 🚧 needed as a cache key, and when referencing in the <Noise /> component
  color: "50 50 50", // rgb pattern
  opacity: 0.25      // 0-1 range
}, [deps_array])

const NoisyImageCard = ({  bgImage, label, animate }) => {
  return (
    <Noise
      isAnimated={animate} // ✨
      style={{
        ...cardStyle,
        '--bg-image': bgImage
      }}
      noiseKey="img-noise" // this refers to the cached noise config, see "Noise Config" to learn more
    >
      <NoiseContent style={contentStyle}>
        <div style={labelStyle}>
          {label}
        </div>
      </NoiseContent>
    </Noise>
  )
}

```

## Noise Component Props

| Prop         | Type            | Default Value |
| ------------ | --------------- | ------------- |
| `opacity`    | `number`        | `1`           |
| `className`  | `string`        | `""`          |
| `noiseKey`   | `string`        | `"default"`   |
| `isAnimated` | `boolean`       | `false`       |
| `style`      | `CSSProperties` | `{}`          |

## Noise Config

The noise config enables :

- Dark/Light mode theming
- Controlling noise resolution (can help save memory)
- Setting noise opacity
- Setting the noise color

### Usage

```jsx
  const isDarkMode = useDarkMode()

  useConfig({
    key: 'custom',
    color: isDarkMode ? "255 255 255" : "0 0 0",
    opacity: isDarkMode ? 0.2 : 0.5 // from 0-1
  }, [isDarkMode])  // taking the dependency arr to re-render

    useConfig({
    key: 'custom-2',
    color: isDarkMode ? "50 50 50" : "10 10 10",
    opacity: isDarkMode ? 0.25 : 0.45
  }, [isDarkMode])

  <Noise noiseKey="custom"  />
  <Noise noiseKey="custom-2" />

```

## `useNoiseConfig` props

| Property     | Type     | Default Value | Description                        |
| ------------ | -------- | ------------- | ---------------------------------- |
| `key`        | `string` | `'default'`   | Cache key to track configs         |
| `color`      | `string` | `'50 50 50'`  | RGB values representing the color  |
| `opacity`    | `number` | `0.1`         | Opacity value, ranging from 0 to 1 |
| `resolution` | `object` | `1920x1080px` | Definition of the Noise            |

### 🚧 Config Tip

To save memory & computation, it may be advisable to reduce the resolution
if you don't require default `1920x1080` size.

## How it works

The noise is created using the `canvas` api. To improve performance the
noise is only rendered [off-screen](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas), once per noise config. This rendering (kind-of) happens in the `useNoiseConfig`. This is why we pass the `noiseKey` to the `Noise` component so we can retrieve the cached canvas value and then render the noise based on those settings.

## 🏗️ Coming Soon

### SSR support

The SSR only version of the component is in the works. Ideally we should be able
to generate the noise image on the server-side to reap the benefits RSC.

This can be potentially achieved through the node `canvas` library. The downside might be
the large img file we would need to generate per component.

### Gradient Noise

SVG fractal noise enables some cool effects, it would be cool to abstract this into a react
component and optionally enable some animation.

## References

- https://stackoverflow.com/questions/22003491/animating-canvas-to-look-like-tv-noise#22003901
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
