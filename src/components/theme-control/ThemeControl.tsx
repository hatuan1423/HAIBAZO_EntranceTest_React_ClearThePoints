import { Themes } from 'defines'
import { useState } from 'react'

export const ThemeControl = () => {
  const [currentTheme, setCurrentTheme] = useState(Themes.LIGHT)
  const changeTheme = (theme: Themes) => {
    setCurrentTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div>
      {currentTheme === Themes.DARK ? (
        <button onClick={() => changeTheme(Themes.LIGHT)}>Light</button>
      ) : (
        <button onClick={() => changeTheme(Themes.DARK)}>Dark</button>
      )}
    </div>
  )
}
