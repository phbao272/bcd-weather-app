import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { Layout, Text, Button } from '@ui-kitten/components'

import { SearchIcon, BackIcon, SettingIcon } from '../components/icons'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../constants/index'

const SearchPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <Layout style={globalStyles.container}>
            <Layout style={globalStyles.flexRowSpace}>
                <TouchableOpacity onPress={handleGoBack}>
                    <BackIcon />
                </TouchableOpacity>
                <Layout style={styles.flexDirectionRow}>
                    <TouchableOpacity style={{ marginRight: 24 }}>
                        <SearchIcon />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <SettingIcon />
                    </TouchableOpacity>
                </Layout>
            </Layout>
            <Text>Search Page</Text>
        </Layout>
    )
}

export default SearchPage

const styles = StyleSheet.create({
    flexDirectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
