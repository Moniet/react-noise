import { NoiseConfig } from "./types"
import canvas from "canvas"

/*
  basic idea inspired by :
  • https://stackoverflow.com/questions/22003491/animating-canvas-to-look-like-tv-noise#22003901 
  • https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
*/

export default function generateNoise(
  ctx: CanvasRenderingContext2D,
  config: NoiseConfig,
  ssr: boolean = false
) {
  const canvas = ctx.canvas
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
    img.data[i + 3] = rand < 0.5 ? (255 * opacity) | 0 : 0
  }

  ctx.putImageData(img, 0, 0)

  if (ssr) {
    try {
      return canvas.toDataURL()
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
