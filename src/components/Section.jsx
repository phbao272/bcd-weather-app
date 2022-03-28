import React from 'react'

import { Layout, Text } from '@ui-kitten/components'

const Section = (props) => {
    return <Layout style={{ marginBottom: 16 }}>{props.children}</Layout>
}

export const SectionTitle = (props) => {
    return (
        <Layout style={{ marginVertical: 12 }}>
            <Text category="s1">{props.children}</Text>
        </Layout>
    )
}

export const SectionBody = (props) => {
    return <Layout>{props.children}</Layout>
}

export default Section
