import { StyleSheet, TouchableOpacity } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Section, { SectionTitle, SectionBody } from '../components/Section'

import { BackIcon } from '../components/icons'

import globalStyles from '../constants'

const AirPollutionPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <Layout style={globalStyles.container}>
            <Section>
                <SectionTitle>
                    <Layout style={globalStyles.flexRowCenterAlign}>
                        <TouchableOpacity
                            onPress={handleGoBack}
                            activeOpacity={0.7}
                        >
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 24, fontSize: 20 }}>
                            Chất lượng không khí
                        </Text>
                    </Layout>
                </SectionTitle>
                <SectionBody>
                    <Text>Chất lượng không khí</Text>
                </SectionBody>
            </Section>
        </Layout>
    )
}

export default AirPollutionPage

const styles = StyleSheet.create({})
