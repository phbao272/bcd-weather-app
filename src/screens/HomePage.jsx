import React, { useState, useEffect } from 'react'
import { Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Layout } from '@ui-kitten/components'
import Header from '../components/Header'
import Summary from '../components/Summary'
import Detail from '../components/Detail'
import DarkMode from '../components/DarkMode'
// import Location from '../components/Location'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import globalStyles from '../constants/index'

import * as Location from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'
import { getLocationNameByCoordinates, getWeatherData } from '../apis'
import { setLocationActive, addWeatherData } from '../redux/slices/WeatherSlice'

import { weatherDataSelector, dailySelector } from '../redux/selectors'

const screen = Dimensions.get('screen')

const HomePage = () => {
    const [coordinates, setCoordinates] = useState({})

    const dispatch = useDispatch()

    const weatherData = useSelector(weatherDataSelector)

    const dailyWeatherData = useSelector(dailySelector)

    // if (Array.isArray(dailyWeatherData)) {
    //     console.log(dailyWeatherData[0])
    // }

    // TODO: Ưu cầu bật định vị ở điện thoại
    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('permission denied')
                return
            }

            let location = await Location.getCurrentPositionAsync({})
            setCoordinates({
                lon: location.coords.longitude,
                lat: location.coords.latitude,
            })
        })()
    }, [])

    // TODO: Lấy tên địa điểm
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

    // TODO: Lấy dữ liệu One Call
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            getWeatherData(coordinates.lon, coordinates.lat).then((res) => {
                console.log(res.data)
                dispatch(addWeatherData(res.data))
            })
        }
    }, [coordinates])

    return (
        <Layout style={[globalStyles.container, { paddingHorizontal: 0 }]}>
            <Layout style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
                <Header />
            </Layout>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                {/* Image */}
                <Section>
                    <SectionBody>
                        <Image
                            style={styles.imageStyle}
                            source={{
                                uri: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                            }}
                        />
                    </SectionBody>
                </Section>

                <Section>
                    <SectionBody>
                        <Summary />
                    </SectionBody>
                </Section>

                <Section>
                    <SectionTitle>CHI TIẾT</SectionTitle>
                    <SectionBody>
                        <Detail />
                    </SectionBody>
                </Section>

                <Section>
                    <SectionTitle>Dark Mode</SectionTitle>
                    <SectionBody>
                        <DarkMode />
                    </SectionBody>
                </Section>
            </ScrollView>
        </Layout>
    )
}

export default HomePage

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: screen.width,
        borderRadius: 12,
    },
})
