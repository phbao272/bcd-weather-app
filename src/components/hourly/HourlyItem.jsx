import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme-context'

import {
    ConvertKToC,
    ConvertUnixTimeToUTC,
    ConvertWindSpeed,
    ConvertPop,
} from '../../utils/index'

const HourlyItem = (props) => {
    const { data, active } = props

    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#F5F5F5'

    // console.log(data)

    return (
        <Layout
            style={[
                styles.container,
                active ? { backgroundColor: bgcolor } : '',
            ]}
        >
            <Text>{ConvertKToC(data?.temp)}°</Text>
            <Text style={styles.textPop}>
                {ConvertPop(data?.pop) == 0 ? ' ' : ConvertPop(data?.pop) + '%'}
            </Text>
            <Text>Ảnh thời tiết</Text>
            <Text>{ConvertWindSpeed(data?.wind_speed)} km/h</Text>
            <Text>Hướng gió</Text>
            <Text>{ConvertUnixTimeToUTC(data?.dt, 'hh:mm')}</Text>
        </Layout>
    )
}
export default HourlyItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderRadius: 8,
    },
    textPop: {
        color: '#4f7bff',
    },
})
