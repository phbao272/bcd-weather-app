import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

import { BackIcon } from '../components/icons'
import Section, { SectionBody, SectionTitle } from '../components/Section'

import globalStyles from '../constants/index'

const HourlyPage = () => {
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
                            48 Giờ tiếp
                        </Text>
                    </Layout>
                </SectionTitle>
                <SectionBody>
                    <Text>DailyPage</Text>
                </SectionBody>
            </Section>
        </Layout>
    )
}

export default HourlyPage
