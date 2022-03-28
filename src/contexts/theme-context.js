import { createContext, useState, useEffect } from 'react'
const ThemeContext = createContext()
import AsyncStorage from '@react-native-async-storage/async-storage'

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        ;(async () => {
            try {
                const theme = await AsyncStorage.getItem('@theme')
                setTheme(theme || 'dark')
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@theme', value)
        } catch (e) {
            console.log(e)
        }
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        storeData(theme === 'dark' ? 'light' : 'dark')
    }

    const value = {
        theme,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
