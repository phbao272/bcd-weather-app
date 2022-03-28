import { TouchableOpacity } from 'react-native'

import { Layout, Text } from '@ui-kitten/components'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { locatitonActiveSelector } from '../redux/selectors'

import { ShareIcon, MenuIcon } from './icons'

import { useNavigation } from '@react-navigation/native'

import globalStyles from '../constants/index'

const Header = () => {
    const location = useSelector(locatitonActiveSelector)

    const navigation = useNavigation()

    const handleGoToSelectLocationPage = () => {
        navigation.navigate('SelectLocation')
    }

    return (
        <Layout style={globalStyles.flexRowSpace}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{location}</Text>
            <Layout style={globalStyles.flexRowCenterAlign}>
                <TouchableOpacity>
                    <ShareIcon
                        style={[{ marginRight: 24 }, globalStyles.sizeIcon]}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleGoToSelectLocationPage}>
                    <MenuIcon />
                </TouchableOpacity>
            </Layout>
        </Layout>
    )
}

export default Header
