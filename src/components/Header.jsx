import { StyleSheet } from 'react-native'

import { Layout, Text, Icon } from '@ui-kitten/components'

import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { locatitonActiveSelector } from '../redux/selectors'

import { ShareIcon, MenuIcon } from './icons'

const Header = () => {
    const location = useSelector(locatitonActiveSelector)

    return (
        <Layout style={styles.container}>
            <Text style={styles.heading}>{location}</Text>
            <Layout style={styles.containerIcon}>
                <ShareIcon style={[styles.sizeIcon, { marginRight: 24 }]} />
                <MenuIcon style={styles.sizeIcon} />
            </Layout>
        </Layout>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sizeIcon: {
        width: 24,
        height: 24,
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})
