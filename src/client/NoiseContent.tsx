import { forwardRef, ReactNode } from "react"
import styles from "./index.module.css"

type NoiseContentProps = {
  className?: string
  children?: ReactNode
}

const NoiseContent = forwardRef<HTMLDivElement, NoiseContentProps>(
  ({ className, children }, ref) => {
    return (
      <div className={`${styles.content} ${className}`} ref={ref}>
        {children}
      </div>
    )
  }
)

export default NoiseContent
