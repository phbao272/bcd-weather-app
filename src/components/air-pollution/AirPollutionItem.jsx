import { StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

import { Layout, Text } from '@ui-kitten/components'

const AQI_COLOR = {
    good: '#9cd84e',
    fair: '#facf39',
    moderate: '#f99049',
    poor: '#f65e5f',
    veryPoor: '#a070b6',
    dangerous: '#a06a7b',
}

const AirPollutionItem = (props) => {
    const bgColor = props.level ? AQI_COLOR[props.level] : '#f5f5f5'

    const HeightOfBar = (80 * props.index) / props.maxAvg

    console.log(HeightOfBar)

    return (
        <Layout style={styles.container}>
            <Text style={styles.index}>{props.index}</Text>
            <Layout
                style={[
                    styles.bar,
                    { backgroundColor: bgColor, height: HeightOfBar },
                ]}
            ></Layout>
            <Text style={styles.date}>{props.date}</Text>
        </Layout>
    )
}

export default AirPollutionItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    index: {
        fontSize: 14,
    },
    bar: {
        height: 80,
        width: 5,
        borderRadius: 12,
        marginVertical: 8,
    },
    date: {
        opacity: 0.7,
        fontSize: 14,
    },
})

AirPollutionItem.propTypes = {
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    level: PropTypes.string,
    maxAvg: PropTypes.number.isRequired,
}
