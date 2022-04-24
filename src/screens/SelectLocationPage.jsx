import { TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native'
import React from 'react'

import { Layout, Text, Avatar } from '@ui-kitten/components'

import { SearchIcon, BackIcon, SettingIcon } from '../components/icons'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../constants/index'
import apis from '../apis/index'
import { Icon } from '@ui-kitten/components'

const savedLocation = [
    {
        locationName: 'Đồng Đa',
        temp: 26,
        backgroundImg: '../../assets/locationBackground1.jpg',
    },
    {
        locationName: 'Hưng Yên',
        temp: 25,
        backgroundImg: '../../assets/locationBackground2.jpg',
    },
]

const LocationItem = () => {
    return (
        <Layout style={[styles.itemContainer]}>
            <ImageBackground
                source={require('../../assets/locationBackground1.jpg')}
                style={[styles.image]}
                imageStyle={{ borderRadius: 4 }}
                resizeMode="cover"
            >
                <Layout
                    style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 26 }}>Đống Đa</Text>
                    <Avatar
                        style={{
                            padding: 6,
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        }}
                        source={{
                            uri: apis.getWeatherIcon('01n'),
                        }}
                    ></Avatar>
                </Layout>
                <Layout
                    style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 52, fontWeight: '100' }}>
                        26&#176;C
                    </Text>
                    <Icon
                        name="more-vertical-outline"
                        fill="#fff"
                        style={{ width: 24, height: 24 }}
                    />
                </Layout>
            </ImageBackground>
        </Layout>
    )
}

const SelectLocationPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleGoToSearchPage = () => {
        navigation.navigate('Search')
    }

    return (
        <Layout style={[globalStyles.container]}>
            <Layout style={globalStyles.flexRowSpace}>
                <TouchableOpacity onPress={handleGoBack}>
                    <BackIcon />
                </TouchableOpacity>
                <Layout style={globalStyles.flexRowCenterAlign}>
                    <TouchableOpacity style={{ marginRight: 24 }} onPress={handleGoToSearchPage}>
                        <SearchIcon />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <SettingIcon />
                    </TouchableOpacity>
                </Layout>
            </Layout>
            <ScrollView style={{ marginTop: 12 }}>
                <LocationItem />
                <LocationItem />
                <LocationItem />
            </ScrollView>
        </Layout>
    )
}

export default SelectLocationPage

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: 180,
        marginBottom: 6,
    },
    image: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
})
