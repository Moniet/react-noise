# react-noise

`react-noise` is a light-weight react component that helps achieve a high-def 'noisy' texture effect. It supports both static and animated rendering as well as themeing.

## Installation

with pnpm : `pnpm i react-noise`

with npm : `npm i react-noise`

with yarn : `yarn i react-noise`

## Usage

### Without config

```

import { Noise } from "react-noise"
import "react-noise/index.css" // required for base styling and animation

const cardStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '20px'
  backgroundImage: "var(--bg-image)"
}

const labelStyle = {
  fontSize: '4rem',
  color: 'white'
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
      <div style={labelStyle}>
        {label}
      </div>
    </Noise>
  )
}

```

### With config

```
...

useNoiseConfig({ // should be set at top level, e.g App.tsx
  key: "img-noise",
  color: "50 50 50",
  opacity: 25
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
      <div style={labelStyle}>
        {label}
      </div>
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

```
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

| Property     | Type     | Default Value   | Description                         |
| ------------ | -------- | --------------- | ----------------------------------- |
| `key`        | `string` | `'default'`     | Cache key to track configs.         |
| `color`      | `string` | `'255 255 255'` | RGB values representing the color.  |
| `opacity`    | `number` | `0.1`           | Opacity value, ranging from 0 to 1. |
| `resolution` | `object` | `1920x1080px`   | Definition of the Noise             |

### 🚧 Config Tip

To save memory & computation, it may be advisable to reduce the resolution
if you don't require default `1920x1080` size.

## How it works

The noise is created using the `canvas` api. To improve performance the
noise is only rendered [off-screen](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas), once per noise config. This rendering (kind-of) happens in the `useNoiseConfig`. This is why we pass the `noiseKey` to the `Noise` component so we can retrieve the cached canvas value and then render the noise based on those settings.

## 🏗️ Coming Soon

The SSR only version of the component is in the works. Ideally we should be able
to generate the noise image on the server-side to reap the benefits RSC.

This can be potentially achieved through the node `canvas` library. The downside might be
the large img file we would need to generate per component.
