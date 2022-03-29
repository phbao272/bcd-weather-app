import React from 'react'
import { Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Layout, Avatar } from '@ui-kitten/components'

import Header from '../components/Header'
import Search from '../components/Search'
import LinkTo from '../components/LinkTo'
import DarkMode from '../components/DarkMode'
import Location from '../components/Location'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import globalStyles from '../constants/index'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

const HomePage = () => {
    console.log(screen)

    return (
        <Layout style={globalStyles.container}>
            <Layout style={{ paddingTop: 44, opacity: 0.7 }}>
                <Header />
            </Layout>

            <ScrollView>
                <Section>
                    <SectionBody>
                        <Image
                            style={styles.imageStyle}
                            source={{
                                uri: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                            }}
                        />
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
            </ScrollView>
        </Layout>
    )
}

export default HomePage

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: screen.width,
        borderRadius: 12,
    },
    summary: {},
})
