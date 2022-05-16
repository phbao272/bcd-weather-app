import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import Section, { SectionTitle, SectionBody } from '../components/Section'
import { BackIcon } from '../components/icons'
import { ThemeContext } from '../contexts/theme-context'
import globalStyles from '../constants'

const MENU_DATA = [
    {
        id: 1,
        title: 'Nguồn dữ liệu',
        desc: 'Open Weather Map',
    },
    {
        id: 2,
        title: 'Giao diện',
        desc: 'Sáng',
    },
    {
        id: 3,
        title: 'Góp ý',
        desc: 'Report bugs or make suggestions',
    },
    {
        id: 4,
        title: 'Về BCD Weather App',
        desc: 'Open Weather Map',
    },
]

const MenuItem = ({ title, desc }) => {
    const context = useContext(ThemeContext)
    const bgcolor = context?.theme === 'dark' ? '#1F1F1F' : '#F5F5F5'

    return (
        <Layout style={[styles.containerMenuItem, { borderBottomColor: bgcolor }]}>
            <Text style={styles.textMenuItem}>{title}</Text>
            {desc ? <Text style={{ fontSize: 14, opacity: 0.3 }}>{desc}</Text> : null}
        </Layout>
    )
}

const SettingPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <Layout style={[globalStyles.container, styles.container]}>
            <Section>
                <SectionTitle>
                    <Layout style={[globalStyles.flexRowSpace, { paddingHorizontal: 16 }]}>
                        <Layout style={globalStyles.flexRowCenterAlign}>
                            <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                                <BackIcon />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 24, fontSize: 20 }}>Cài đặt</Text>
                        </Layout>
                    </Layout>
                </SectionTitle>
                <Layout style={{ paddingHorizontal: 16 }}>
                    {MENU_DATA.map((item) => (
                        <MenuItem key={item.id} title={item.title} desc={item.desc} />
                    ))}
                </Layout>
            </Section>
        </Layout>
    )
}

export default SettingPage

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        paddingHorizontal: 0,
    },
    textMenuItem: {
        // fontWeight: '700',
        fontSize: 18,
    },
    containerMenuItem: {
        paddingVertical: 10,

        borderBottomWidth: 1,
    },
})
