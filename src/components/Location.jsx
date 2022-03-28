import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

import * as Location from 'expo-location'

import { setLocationActive } from '../redux/slices/WeatherSlice'
import { useDispatch } from 'react-redux'

import { getLocationNameByCoordinates } from '../apis'

const LocationTest = () => {
    const [coordinates, setCoordinates] = useState({})
    const [errorMsg, setErrorMsg] = useState(null)

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
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
            })
        })()
    }, [])

    let text = 'Waiting..'
    if (errorMsg) {
        text = errorMsg
    } else if (location) {
        text = JSON.stringify(location)
    }

    useEffect(() => {
        if (coordinates.longitude && coordinates.latitude) {
            console.log(coordinates)
            getLocationNameByCoordinates(
                coordinates.longitude,
                coordinates.latitude,
            ).then((res) => {
                console.log(res.data[0].local_names.vi)
                dispatch(setLocationActive(res.data[0].local_names.vi))
            })
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
