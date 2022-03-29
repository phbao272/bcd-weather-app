import { TouchableOpacity } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React from 'react'

import globalStyles from '../constants/index'
import { ExpandIcon } from './icons'
import { ConvertUnixTimeToUTC } from '../utils/index'

import { useNavigation } from '@react-navigation/native'

const Summary = () => {
    const navigation = useNavigation()

    const handleGoToDailyPage = () => {
        navigation.navigate('DailyPage')
    }

    return (
        <Layout>
            <Layout style={globalStyles.flexRowCenterAlign}>
                <Text style={{ fontSize: 60, marginRight: 12 }}>22&#176;C</Text>
                <Layout style={globalStyles.flexRow}>
                    <Text
                        style={{
                            transform: [{ translateY: -5 }],
                            fontSize: 24,
                        }}
                    >
                        22&#176;C
                    </Text>
                    <Text style={{ fontSize: 24, marginHorizontal: 4 }}>/</Text>
                    <Text
                        style={{
                            transform: [{ translateY: 5 }],
                            fontSize: 24,
                        }}
                    >
                        18&#176;C
                    </Text>
                </Layout>
            </Layout>

            <Layout>
                <Text status="basic" style={{ opacity: 0.7, marginBottom: 8 }}>
                    {ConvertUnixTimeToUTC(1648539456, 'dddd, Do MMMM')}
                </Text>
                <Text category="s2" style={{ fontSize: 16, marginBottom: 8 }}>
                    Mây đen u ám
                </Text>
                <TouchableOpacity
                    onPress={handleGoToDailyPage}
                    activeOpacity={0.7}
                >
                    <Text status="basic" style={{ opacity: 0.7, width: '95%' }}>
                        Hôm nay - Mưa nhẹ. Gió đông - đông nam, tốc độ 9km/h.
                        Khả năng mưa 30%.
                    </Text>
                    <ExpandIcon
                        style={{
                            width: 16,
                            height: 16,
                            position: 'absolute',
                            bottom: 8,
                            right: 5,
                        }}
                    />
                </TouchableOpacity>
            </Layout>
        </Layout>
    )
}

export default Summary
