import { StatusBar } from 'expo-status-bar'

import { Provider } from 'react-redux'
import store from './src/redux/store'

import { useContext } from 'react'
import { ThemeContext } from './src/contexts/theme-context'

import { default as themeCustom } from './src/theme/custom-theme.json'

import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomePage from './src/screens/HomePage'
import SearchPage from './src/screens/SearchPage'
import SelectLocationPage from './src/screens/SelectLocationPage'
import DailyPage from './src/screens/DailyPage'
import HourlyPage from './src/screens/HourlyPage'
import GraphPage from './src/screens/GraphPage'
import AirPollutionPage from './src/screens/AirPollutionPage'

const Stack = createNativeStackNavigator()

const Main = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva}
                theme={{ ...eva[theme], ...themeCustom }}
            >
                <Provider store={store}>
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName="Home"
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="Home" component={HomePage} />
                            <Stack.Screen
                                name="Search"
                                component={SearchPage}
                            />
                            <Stack.Screen
                                name="SelectLocation"
                                component={SelectLocationPage}
                            />
                            <Stack.Screen
                                name="DailyPage"
                                component={DailyPage}
                            />
                            <Stack.Screen
                                name="HourlyPage"
                                component={HourlyPage}
                            />
                            <Stack.Screen
                                name="GraphPage"
                                component={GraphPage}
                            />
                            <Stack.Screen
                                name="AirPollutionPage"
                                component={AirPollutionPage}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Provider>
                <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            </ApplicationProvider>
        </>
    )
}

export default Main
