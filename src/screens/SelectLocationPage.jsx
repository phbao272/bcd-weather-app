import { TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Text, Avatar } from '@ui-kitten/components'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { SearchIcon, BackIcon, SettingIcon } from '../components/icons'
import { useNavigation } from '@react-navigation/native'

import { getLocationsSelector } from '../redux/selectors'
import { deleteLocation, editLocationActive } from '../redux/slices/locationSlice'
import { getWeatherData, getAirPollution } from '../redux/slices/WeatherSlice'

import { TrashIcon } from '../components/icons'
import globalStyles from '../constants/index'
import apis from '../apis/index'
import { ConvertKToC } from '../utils'
import { times } from 'lodash'

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

const LocationItem = (props) => {
    const dispatch = useDispatch()

    const handleDeleteItem = () => {
        dispatch(deleteLocation(props?.id))
    }

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
                    <Text style={{ color: '#ffffff', fontSize: 26 }}>{props?.locationName}</Text>
                    <Avatar
                        style={{
                            padding: 6,
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        }}
                        source={{
                            uri: apis.getWeatherIcon(props?.icon),
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
                    <Text style={{ color: '#ffffff', fontSize: 52, fontWeight: '100' }}>
                        {ConvertKToC(props?.temp)}&#176;C
                    </Text>
                    <TouchableOpacity onPress={handleDeleteItem} style={{ marginRight: 8 }}>
                        <TrashIcon />
                    </TouchableOpacity>
                </Layout>
            </ImageBackground>
        </Layout>
    )
}

const SelectLocationPage = () => {
    const dispatch = useDispatch()

    const locations = useSelector(getLocationsSelector)

    const [locationsData, setLocationsData] = useState(locations)

    useEffect(() => {
        setLocationsData(locations)
        storeData(locations)
    }, [locations])

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@locations', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    console.log({ locationsData })
    // console.log({ locations })

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleGoToSearchPage = () => {
        navigation.navigate('Search', { isFirstTime: false })
    }

    const handleGoToHomePage = () => {
        navigation.navigate('Home')
    }

    const handleSelectLocation = (item) => {
        handleGoToHomePage()

        console.log({ lon: item.lon, lat: item.lat })

        dispatch(editLocationActive({ name: item.name, lon: item.lon, lat: item.lat }))
        dispatch(getAirPollution({ lon: item.lon, lat: item.lat }))
        dispatch(getWeatherData({ lon: item.lon, lat: item.lat }))
    }

    return (
        <Layout style={[globalStyles.container, { paddingHorizontal: 0 }]}>
            <Layout style={[globalStyles.flexRowSpace, { paddingHorizontal: 16 }]}>
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
            <ScrollView style={{ marginTop: 12 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {locationsData
                    ? locationsData.map((item) => (
                          <TouchableOpacity
                              key={item.id}
                              activeOpacity={0.9}
                              onPress={() => handleSelectLocation(item)}
                          >
                              <LocationItem
                                  locationName={item.name}
                                  temp={item.temp}
                                  id={item.id}
                                  icon={item.icon}
                              />
                          </TouchableOpacity>
                      ))
                    : null}
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
