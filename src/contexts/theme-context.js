import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Restart } from 'fiction-expo-restart'

const ThemeContext = createContext()

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
        // Restart app
        // Restart()
    }

    const value = {
        theme,
        toggleTheme,
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeProvider, ThemeContext }
