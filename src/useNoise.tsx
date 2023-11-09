import { useEffect, useRef, useSyncExternalStore } from "react"
import noiseStore from "./noiseStore"

const useNoise = (key: string) => {
  const ref = useRef<HTMLCanvasElement>(null)

  const { renderNoise, init, setConfig, configs } = useSyncExternalStore(
    noiseStore.subscribe,
    noiseStore.getSnapshot,
    noiseStore.getServerSnapshot
  )

  const currentConfig = configs[key]

  useEffect(() => {
    if (!configs[key]) {
      return undefined
    }

    init(key)
    const cleanup = renderNoise(ref.current, key)

    return () => {
      cleanup?.()
    }
  }, [currentConfig, key])

  return ref
}

export default useNoise
