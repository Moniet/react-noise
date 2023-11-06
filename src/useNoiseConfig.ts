import { useEffect } from "react"
import { setConfig } from "./noiseStore"
import { NoiseConfig } from "./types"

const useNoiseConfig = (
  config: NoiseConfig & { key: string },
  deps: any[] = []
) => {
  useEffect(() => {
    setConfig(config, config.key)
  }, deps)
}

export default useNoiseConfig
