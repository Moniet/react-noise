import { useLayoutEffect, useRef, useSyncExternalStore } from "react"
import noiseStore, { init, renderNoise } from "./noiseStore"

const useNoise = (key: string) => {
  const ref = useRef<HTMLCanvasElement>(null)

  const { configs, initFinished } = useSyncExternalStore(
    noiseStore.subscribe,
    noiseStore.getSnapshot,
    noiseStore.getServerSnapshot
  )

  const currentConfig = configs[key]

  useLayoutEffect(() => {
    if (!configs[key]) {
      return undefined
    }

    init(key)
    const cleanup = renderNoise(ref.current, key)

    return () => {
      cleanup?.()
    }
  }, [currentConfig, key])

  return [ref, !initFinished[key]] as const
}

export default useNoise
