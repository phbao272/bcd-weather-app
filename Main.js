import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { Provider } from 'react-redux'
import store from './src/redux/store'

import { useContext } from 'react'
import { ThemeContext } from './src/contexts/theme-context'

import { default as themeCustom } from './src/theme/custom-theme.json'

import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import {
    ApplicationProvider,
    Layout,
    IconRegistry,
} from '@ui-kitten/components'

import Header from './src/components/Header'
import Search from './src/components/Search'
import LinkTo from './src/components/LinkTo'
import DarkMode from './src/components/DarkMode'
import Location from './src/components/Location'

import Section, { SectionTitle, SectionBody } from './src/components/Section'

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
                    <Layout style={styles.container}>
                        <Layout level="1">
                            <Header />
                        </Layout>

                        <Section>
                            <SectionTitle>Search</SectionTitle>
                            <SectionBody>
                                <Search />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>Link To</SectionTitle>
                            <SectionBody>
                                <LinkTo />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>Location</SectionTitle>
                            <SectionBody>
                                <Location />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>Dark Mode</SectionTitle>
                            <SectionBody>
                                <DarkMode />
                            </SectionBody>
                        </Section>
                    </Layout>
                </Provider>
                <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            </ApplicationProvider>
        </>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
})
