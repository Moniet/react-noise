import { NoiseConfig } from "./types"
import { Canvas } from "canvas"

export default function generateNoise(
  canvas: HTMLCanvasElement,
  config: NoiseConfig
) {
  const ctx = canvas.getContext("2d")
  const img = ctx!.createImageData(canvas.width, canvas.height)
  const len = img.data.length

  ctx.imageSmoothingEnabled = true

  const { opacity, color } = config
  const [r, g, b] = color?.split(" ") || ["255", "255", "255"]

  for (let i = 0; i < len; i += 4) {
    const rand = Math.random()

    img.data[i] = rand < 0.5 ? parseInt(r) : 1
    img.data[i + 1] = rand < 0.5 ? parseInt(g) : 1
    img.data[i + 2] = rand < 0.5 ? parseInt(b) : 1
    img.data[i + 3] = rand < 0.5 ? opacity : 0
  }

  ctx.putImageData(img, 0, 0)
}
