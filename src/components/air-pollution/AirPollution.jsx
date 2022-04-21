import { StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import _ from 'lodash'

import { Layout, Text } from '@ui-kitten/components'

import AirPollutionItem from './AirPollutionItem'

import { ConvertDateToDays } from '../../utils'

const AirPollution = (props) => {
    const { data } = props
    console.log({ data })

    const maxAvg = _.maxBy(data, (o) => o.avg)

    console.log(maxAvg)

    return (
        <Layout style={styles.container}>
            {data.map((item) => (
                <AirPollutionItem
                    key={item.day}
                    index={item.avg}
                    date={ConvertDateToDays(item.day)}
                    level="moderate"
                    maxAvg={maxAvg.avg}
                />
            ))}
        </Layout>
    )
}

export default AirPollution

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})
