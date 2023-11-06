import { ReactNode, forwardRef } from "react"
import useNoise from "./useNoise"

import "./index.css"

export type NoiseProps = {
  children?: ReactNode
  className?: string
  noiseKey?: string
  isAnimated?: boolean
}

const Noise = forwardRef<HTMLDivElement, NoiseProps>(
  (
    { children, className = "", noiseKey = "default", isAnimated = false },
    ref
  ) => {
    const canvasRef = useNoise(noiseKey)

    return (
      <div
        ref={ref}
        data-noise="container"
        className={className}
        data-noise-anim={isAnimated}
      >
        <canvas ref={canvasRef} data-noise="canvas"></canvas>
        <div data-noise="children">{children}</div>
      </div>
    )
  }
)

export default Noise
