import React, { useState, useEffect } from 'react'
import { Image, Dimensions, ScrollView, StyleSheet, Alert } from 'react-native'
import { Layout, Spinner } from '@ui-kitten/components'

import Header from '../components/Header'
import Summary from '../components/Summary'
import Detail from '../components/Detail'
import Hourly from '../components/hourly/Hourly'
import Daily from '../components/daily/Daily'
import AreaChart from '../components/charts/AreaChart'
import DarkMode from '../components/DarkMode'

import Section, { SectionTitle, SectionBody } from '../components/Section'

import globalStyles, { color } from '../constants/index'

import * as Location from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { getWeatherData } from '../redux/slices/WeatherSlice'
import { setLocationActive } from '../redux/slices/locationSlice'

import apis from '../apis'

import {
    weatherDataSelector,
    hourlySelector,
    dailySelector,
    getLoadingSelector,
} from '../redux/selectors'

const screen = Dimensions.get('screen')

const HomePage = () => {
    const [isLoading, setLoading] = useState(true)
    const [coordinates, setCoordinates] = useState({})

    const dispatch = useDispatch()
    const navigation = useNavigation()

    // const weatherData = useSelector(weatherDataSelector)

    // const dailyWeatherData = useSelector(dailySelector)

    const loading = useSelector(getLoadingSelector)

    const [hourly, setHourly] = useState([])

    const hourlyData = useSelector(hourlySelector)

    useEffect(() => {
        setHourly(hourlyData)
    }, [hourlyData])

    // if (Array.isArray(dailyWeatherData)) {
    //     console.log(dailyWeatherData[0])
    // }

    // console.log(dailyWeatherData)

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setLoading(loading)
            }, 1500)
        }
    }, [loading])

    // TODO: Ưu cầu bật định vị ở điện thoại
    useEffect(() => {
        handleTurnOnLocation()
    }, [])

    const handleTurnOnLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.log('permission denied')
            Alert.alert('permission denied')
            return
        }

        let location = await Location.getCurrentPositionAsync({})
        setCoordinates({
            lon: location.coords.longitude,
            lat: location.coords.latitude,
        })
    }

    // TODO: Lấy tên địa điểm
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            console.log(coordinates)
            dispatch(
                setLocationActive({
                    lon: coordinates.lon,
                    lat: coordinates.lat,
                }),
            )
        }
    }, [coordinates])

    // TODO: Lấy dữ liệu One Call
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            dispatch(
                getWeatherData({ lon: coordinates.lon, lat: coordinates.lat }),
            )
        }
    }, [coordinates])

    const handleGoToHourlyPage = () => {
        navigation.navigate('HourlyPage')
    }

    const handleGoToDailyPage = () => {
        navigation.navigate('DailyPage')
    }

    const handleGoToGraphPage = () => {
        navigation.navigate('GraphPage')
    }

    // useEffect(() => {
    //     console.log(hourlyData)
    // }, [])

    return (
        <Layout style={[globalStyles.container, { paddingHorizontal: 0 }]}>
            {isLoading ? (
                <Layout
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Spinner />
                </Layout>
            ) : (
                <>
                    <Layout style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
                        <Header />
                    </Layout>

                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    >
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
                            <SectionTitle
                                expand={true}
                                onPress={handleGoToHourlyPage}
                            >
                                HÀNG GIỜ
                            </SectionTitle>
                            <SectionBody>
                                <Hourly />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle
                                expand={true}
                                onPress={handleGoToDailyPage}
                            >
                                HÀNG NGÀY
                            </SectionTitle>
                            <SectionBody>
                                <Daily />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle
                                expand={true}
                                onPress={handleGoToGraphPage}
                            >
                                ĐỒ THỊ
                            </SectionTitle>
                            <SectionBody>
                                <AreaChart
                                    title=""
                                    data={hourly}
                                    name="Khả năng mưa"
                                    color={color.pop}
                                    color_shadow={color.pop_shadow}
                                    type="pop"
                                    y_axis_suffix="%"
                                />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>Dark Mode</SectionTitle>
                            <SectionBody>
                                <DarkMode />
                            </SectionBody>
                        </Section>
                    </ScrollView>
                </>
            )}
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
