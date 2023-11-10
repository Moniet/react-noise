import { useEffect, useState } from "react"
import Noise from "../../src/client/Noise"
import "./App.css"
import useNoiseConfig from "../../src/client/useNoiseConfig"

function App() {
  const [isDarkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  useNoiseConfig(
    {
      color: isDarkMode ? "255 255 255" : "50 50 255",
      opacity: isDarkMode ? 5 : 100
    },
    [isDarkMode]
  )

  useEffect(() => {
    const mm = window.matchMedia("(prefers-color-scheme: dark)")

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    }

    mm.addEventListener("change", onChange)

    return () => {}
  }, [])

  return (
    <div>
      <Noise className="noise">
        <div style={{ width: "500px", height: "500px", padding: "50px" }}>
          <h1>My text here</h1>
        </div>
      </Noise>
    </div>
  )
}

export default App
