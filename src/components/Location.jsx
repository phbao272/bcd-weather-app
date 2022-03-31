import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

import * as Location from 'expo-location'

import { setLocationActive } from '../redux/slices/WeatherSlice'
import { useDispatch } from 'react-redux'

import { getLocationNameByCoordinates } from '../apis'

const LocationTest = () => {
    const [coordinates, setCoordinates] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }

            let location = await Location.getCurrentPositionAsync({})
            setCoordinates({
                lon: location.coords.longitude,
                lat: location.coords.latitude,
            })
        })()
    }, [])

    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            console.log(coordinates)
            getLocationNameByCoordinates(coordinates.lon, coordinates.lat).then(
                (res) => {
                    console.log(res.data[0].local_names.vi)
                    dispatch(setLocationActive(res.data[0].local_names.vi))
                },
            )
        }
    }, [coordinates])

    return (
        <Layout style={styles.container}>
            <Text style={styles.paragraph}>{JSON.stringify(coordinates)}</Text>
        </Layout>
    )
}

export default LocationTest

const styles = StyleSheet.create({})
