import { StyleSheet, TouchableOpacity } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import { BackIcon } from '../components/icons'

import globalStyles from '../constants'
import { getAirPollutionSelector } from '../redux/selectors'
import moment from 'moment'

const AirPollutionPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const airPollution = useSelector(getAirPollutionSelector)

    const [data, setData] = useState(airPollution)

    // console.log(data)
    console.log(data.o3)

    useEffect(() => {
        setData(airPollution)
    }, [airPollution])

    console.log(moment('2022-04-20').format('dddd'))

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
