import React from 'react'

import { Layout } from '@ui-kitten/components'

import Header from '../components/Header'
import Search from '../components/Search'
import LinkTo from '../components/LinkTo'
import DarkMode from '../components/DarkMode'
import Location from '../components/Location'

import Section, { SectionTitle, SectionBody } from '../components/Section'

import globalStyles from '../constants/index'

const HomePage = () => {
    return (
        <Layout style={globalStyles.container}>
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
    )
}

export default HomePage
