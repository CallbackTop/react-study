import React from 'react'

const themes = {
  light: {
    foreground: 'white',
    background: 'black',
  },
  dark: {
    foreground: 'black',
    background: 'white',
  }
}

const ThemeContext = React.createContext({
  theme: themes.light,
  toggle: () => {

  }
})

export default function StudyContext() {

  const [theme, setTheme] = React.useState(themes.light)

  return (
    <ThemeContext.Provider value={{
      theme,
      toggle: () => {
        setTheme(theme => theme === themes.dark ? themes.light : themes.dark)
      }
    }}>
      <Toolbar/>
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  return <ThemeButton/>
}

function ThemeButton() {

  const context = React.useContext(ThemeContext)

  return (
    <button 
      style={
        {
          fontSize: '32px', 
          color: context.theme.foreground, 
          backgroundColor: context.theme.background
        }
      } onClick={() => {context.toggle()}}>Click Me</button>
  )
}