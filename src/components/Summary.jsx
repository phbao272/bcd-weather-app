import { TouchableOpacity } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React, { useState, useEffect } from 'react'

import globalStyles from '../constants/index'
import { ExpandIcon } from './icons'
import { ConvertUnixTimeToUTC, ConvertKToC } from '../utils/index'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { dailySelector, currentDataSelector } from '../redux/selectors'

const Summary = () => {
    const [dailyWeather, setDailyWeather] = useState([])
    const [currentWeatherData, setCurrentWeatherData] = useState({})

    const navigation = useNavigation()

    const handleGoToDailyPage = () => {
        navigation.navigate('DailyPage')
    }

    const dailyWeatherData = useSelector(dailySelector)

    useEffect(() => {
        if (Array.isArray(dailyWeatherData)) {
            console.log('dailyWeatherData', dailyWeatherData[0])
            setDailyWeather(dailyWeatherData[0])
        }
    }, [dailyWeatherData])

    const currentData = useSelector(currentDataSelector)

    useEffect(() => {
        if (currentData !== undefined) {
            setCurrentWeatherData(currentData)
            console.log('currentData', currentData)
        }
    }, [currentData])

    return (
        <Layout>
            <Layout style={globalStyles.flexRowCenterAlign}>
                <Text style={{ fontSize: 60, marginRight: 12 }}>
                    {ConvertKToC(currentWeatherData?.temp)}&#176;C
                </Text>
                <Layout style={globalStyles.flexRow}>
                    <Text
                        style={{
                            transform: [{ translateY: -5 }],
                            fontSize: 24,
                        }}
                    >
                        {ConvertKToC(dailyWeather?.temp?.max)}&#176;C
                    </Text>
                    <Text style={{ fontSize: 24, marginHorizontal: 4 }}>/</Text>
                    <Text
                        style={{
                            transform: [{ translateY: 5 }],
                            fontSize: 24,
                        }}
                    >
                        {ConvertKToC(dailyWeather?.temp?.min)}&#176;C
                    </Text>
                </Layout>
            </Layout>

            <Layout>
                <Text status="basic" style={{ opacity: 0.7, marginBottom: 8 }}>
                    {ConvertUnixTimeToUTC(
                        currentWeatherData?.dt,
                        'dddd, Do MMMM',
                    )}
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
