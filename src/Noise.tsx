import { CSSProperties, ReactNode, forwardRef } from "react"
import useNoise from "./useNoise"

import styles from "./index.module.css"

export type NoiseProps = {
  children?: ReactNode
  className?: string
  noiseKey?: string
  isAnimated?: boolean
  style?: CSSProperties
  opacity?: number
}

const Noise = forwardRef<HTMLDivElement, NoiseProps>(
  (
    {
      children,
      className = "",
      noiseKey = "default",
      isAnimated = false,
      style = {},
      opacity = 1
    },
    ref
  ) => {
    const canvasRef = useNoise(noiseKey)

    return (
      <div
        ref={ref}
        style={style}
        data-noise="container"
        data-noise-anim={isAnimated}
        className={`${styles.container} ${className}`}
      >
        <canvas
          ref={canvasRef}
          data-noise="canvas"
          className={styles.canvas}
          style={{ "--opacity": opacity } as any}
        ></canvas>
        <div data-noise="children" className={styles.children}>
          {children}
        </div>
      </div>
    )
  }
)

export default Noise
