import generateNoise from "../generateNoise"
import { NoiseConfig } from "../types"

type Cache<T> = {
  [index: string]: T
}

type Store = {
  caches: Cache<HTMLCanvasElement>
  initFinished: Cache<boolean>
  configs: Cache<NoiseConfig>
  init: typeof init
  renderNoise: typeof renderNoise
  setConfig: typeof setConfig
}

let store: Store = {
  renderNoise,
  setConfig,
  initFinished: {
    default: false
  },
  caches: [] as any,
  init,
  configs: {
    default: {
      opacity: 0.1,
      color: "75 75 75",
      resolution: {
        width: 1080,
        height: 1080
      }
    }
  }
}

let listeners = []

const noiseStore = {
  subscribe(listener: () => void) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getSnapshot() {
    return store
  },
  getServerSnapshot() {
    return store
  }
}

const emitEvent = () => {
  for (let listener of listeners) {
    listener()
  }
}

function setConfig(newConfig: Partial<NoiseConfig>, key = "default") {
  const { resolution: prevSize } = store.configs[key] || {}

  if (
    newConfig.resolution &&
    prevSize &&
    newConfig.resolution?.width !== prevSize.width &&
    newConfig.resolution?.height !== prevSize.height
  ) {
    store.caches[key] = null
  }

  store = {
    ...store,
    configs: {
      ...store.configs,
      [key]: {
        resolution: {
          width: 1920,
          height: 1080
        },
        ...store.configs[key],
        ...newConfig
      }
    }
  }
  store.initFinished[key] = false
  init(key)
  emitEvent()
}

function createCanvas(width = 1080, height = 1080, key: string) {
  const canvas = document.createElement("canvas")
  canvas.setAttribute("width", `${width}`)
  canvas.setAttribute("height", `${height}`)
  store.caches[key] = canvas
  return canvas
}

function init(key = "default") {
  if (store.initFinished[key]) return null

  const config = store.configs[key]
  const { width, height } = config.resolution || {}
  const canvas = store.caches[key] || createCanvas(width, height, key)
  const ctx = canvas.getContext("2d")
  generateNoise(ctx, config)

  store.initFinished[key] = true
}

function renderNoise(canvas: HTMLCanvasElement, key = "default") {
  const config = store.configs[key]
  if (!canvas || !config) return null

  const { width, height } = canvas.getBoundingClientRect()
  const { resolution } = config

  canvas?.getContext("2d").clearRect(0, 0, width, height)
  canvas.setAttribute("width", `${resolution.width}px`)
  canvas.setAttribute("height", `${resolution.height}px`)
  canvas.style.minWidth = `${resolution.width}`
  canvas.style.minHeight = `${resolution.height}`

  canvas.getContext("2d").drawImage(store.caches[key], 0, 0)

  return () => {
    canvas?.getContext("2d").clearRect(0, 0, width, height)
  }
}

export default noiseStore
export { setConfig, init, renderNoise }
