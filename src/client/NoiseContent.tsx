import { CSSProperties, forwardRef, ReactNode } from "react"
import styles from "../styles/index.module.css"

type NoiseContentProps = {
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

const NoiseContent = forwardRef<HTMLDivElement, NoiseContentProps>(
  ({ className, children, style = {} }, ref) => {
    return (
      <div className={`${styles.content} ${className}`} style={style} ref={ref}>
        {children}
      </div>
    )
  }
)

export default NoiseContent
