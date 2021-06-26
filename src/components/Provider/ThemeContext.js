import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function useUpdateTheme(){
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({children}){
    const [darkTheme, setDarkTheme] = useState(true)

    function toggleTheme(){
        setDarkTheme(theme => !theme)
    }

    return(
        <ThemeContext.Provider value={darkTheme}>
          <ThemeUpdateContext.Provider value={toggleTheme}>
              {children}
          </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}