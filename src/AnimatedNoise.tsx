import React, { ReactNode, forwardRef } from "react"
import Noise from "./Noise"

import "./animate.css"

type AnimatedNoiseProps = {
  children?: ReactNode
  className?: string
  noiseKey?: string
}

const AnimatedNoise = forwardRef<HTMLDivElement, AnimatedNoiseProps>(
  ({ children, className, noiseKey = "default" }, ref) => {
    return (
      <Noise noiseKey={noiseKey} className={className} isAnimated ref={ref}>
        {children}
      </Noise>
    )
  }
)

export default AnimatedNoise
