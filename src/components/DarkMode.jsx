import { Layout, Button, Toggle } from '@ui-kitten/components'
import React, { useState, useContext } from 'react'

import useDarkMode from '../custom-hooks/useDarkMode'
import { ThemeContext } from '../contexts/theme-context'

import AsyncStorage from '@react-native-async-storage/async-storage'

const DarkMode = () => {
    const context = useContext(ThemeContext)

    return (
        <Layout>
            <Button onPress={context.toggleTheme} appearance="outline">
                Dark Mode
            </Button>
            <Button onPress={context.toggleTheme} appearance="ghost">
                Dark Mode
            </Button>
            <Toggle
                style={{ marginTop: 8 }}
                checked={context.theme === 'dark'}
                onChange={context.toggleTheme}
            >
                Dark Mode
            </Toggle>
        </Layout>
    )
}

export default DarkMode
