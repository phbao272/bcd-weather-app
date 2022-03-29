import { TouchableOpacity } from 'react-native'
import React from 'react'

import { Layout, Text, Button } from '@ui-kitten/components'

import { SearchIcon, BackIcon, SettingIcon } from '../components/icons'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../constants/index'

const SelectLocationPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleGoToSearchPage = () => {
        navigation.navigate('Search')
    }

    return (
        <Layout style={globalStyles.container}>
            <Layout style={globalStyles.flexRowSpace}>
                <TouchableOpacity onPress={handleGoBack}>
                    <BackIcon />
                </TouchableOpacity>
                <Layout style={globalStyles.flexRowCenterAlign}>
                    <TouchableOpacity
                        style={{ marginRight: 24 }}
                        onPress={handleGoToSearchPage}
                    >
                        <SearchIcon />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <SettingIcon />
                    </TouchableOpacity>
                </Layout>
            </Layout>
            <Text>SelectLocationPage</Text>
        </Layout>
    )
}

export default SelectLocationPage
