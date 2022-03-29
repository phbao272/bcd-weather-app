import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React, { useContext } from 'react'

import {
    SunIcon,
    EyeIcon,
    DropletIcon,
    ThermometerIcon,
    ThermometerPlusIcon,
    PressureIcon,
} from './icons'
import { ThemeContext } from '../contexts/theme-context'

import globalStyles from '../constants/index'

const DATA_ROW_1 = [
    {
        id: '1',
        icon: ThermometerIcon,
        title: 'Cảm Giác Như',
        data: '23°C',
    },
    {
        id: '2',
        icon: DropletIcon,
        title: 'Độ Ẩm',
        data: '86%',
    },
    {
        id: '3',
        icon: SunIcon,
        title: 'Chỉ Số UV',
        data: '3',
    },
]

const DATA_ROW_2 = [
    {
        id: '4',
        icon: EyeIcon,
        title: 'Tầm Nhìn',
        data: '10 km',
    },
    {
        id: '5',
        icon: ThermometerPlusIcon,
        title: 'Điểm Sương',
        data: '20°C',
    },
    {
        id: '6',
        icon: PressureIcon,
        title: 'Ấp Suất',
        data: '1013',
    },
]

const Item = (props) => (
    <Layout style={[styles.item, props.bgcolor]}>
        <props.icon />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.data}>{props.data}</Text>
    </Layout>
)

const Detail = () => {
    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#fafafa'

    console.log(bgcolor)

    return (
        <>
            <Layout
                style={[
                    globalStyles.flexRowSpace,
                    { marginBottom: 12, marginHorizontal: -6 },
                ]}
            >
                {DATA_ROW_1.map((item) => (
                    <Item
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        data={item.data}
                        bgcolor={{ backgroundColor: bgcolor }}
                    />
                ))}
            </Layout>
            <Layout
                style={[globalStyles.flexRowSpace, { marginHorizontal: -6 }]}
            >
                {DATA_ROW_2.map((item) => (
                    <Item
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        data={item.data}
                        bgcolor={{ backgroundColor: bgcolor }}
                    />
                ))}
            </Layout>
        </>
    )
}

export default Detail

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: 'red',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderRadius: 8,
    },
    title: {
        fontSize: 12,
        marginTop: 4,
    },
    data: {
        fontSize: 28,
        fontWeight: '300',
    },
})
