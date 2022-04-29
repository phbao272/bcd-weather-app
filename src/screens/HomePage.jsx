import React, { useState, useEffect } from 'react'
import { Image, Dimensions, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Layout, Spinner, Text } from '@ui-kitten/components'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import Header from '../components/Header'
import Summary from '../components/Summary'
import Detail from '../components/Detail'
import Hourly from '../components/hourly/Hourly'
import Daily from '../components/daily/Daily'
import AreaChart from '../components/charts/AreaChart'
import DarkMode from '../components/DarkMode'
import AirPollution from '../components/air-pollution/AirPollution'
import AirPollutionInfo from '../components/air-pollution/AirPollutionInfo'
import Sun from '../components/Sun'
import Moon from '../components/Moon'

import globalStyles, { color } from '../constants/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Location from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { getWeatherData, getAirPollution } from '../redux/slices/WeatherSlice'
import { setLocationActive, setLocations } from '../redux/slices/locationSlice'

import {
    hourlySelector,
    currentDataSelector,
    getLoadingSelector,
    getAirPollutionSelector,
} from '../redux/selectors'

const screen = Dimensions.get('screen')

const HomePage = () => {
    const [isLoading, setLoading] = useState(true)
    const [coordinates, setCoordinates] = useState({})

    const dispatch = useDispatch()

    const loading = useSelector(getLoadingSelector)

    const [hourly, setHourly] = useState([])

    const hourlyData = useSelector(hourlySelector)

    useEffect(() => {
        setHourly(hourlyData)
    }, [hourlyData])

    const airPollution = useSelector(getAirPollutionSelector)

    const [airPollutionData, setAirPollutionData] = useState(airPollution)

    useEffect(() => {
        setAirPollutionData(airPollution)
    }, [airPollution])

    // console.log(airPollutionData)

    const current = useSelector(currentDataSelector)

    const [currentData, setCurrentData] = useState(current)

    useEffect(() => {
        setCurrentData(current)
    }, [current])

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setLoading(loading)
            }, 500)
        }
    }, [loading])

    useEffect(() => {
        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('@isFirstTime')
                // console.log({ value })
                if (value !== null) {
                    navigation.navigate('Home', { isFirstTime: false })
                } else {
                    navigation.navigate('WelcomePage', { isFirstTime: true })
                }
            } catch (error) {
                // Error retrieving data
            }
        }
        _retrieveData()
    }, [])

    // TODO: Lấy locations lưu trong Storage
    useEffect(() => {
        dispatch(setLocations())
            .unwrap()
            .then((originalPromiseResult) => {
                console.log('data: ', originalPromiseResult)
            })
    }, [])

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

    const navigation = useNavigation()

    // const handleGoToWelcomePage = () => {
    //     navigation.navigate('WelcomePage')
    // }

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
            dispatch(getWeatherData({ lon: coordinates.lon, lat: coordinates.lat }))

            dispatch(getAirPollution({ lon: coordinates.lon, lat: coordinates.lat }))
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

    const handleGoToAirPollutionPage = () => {
        navigation.navigate('AirPollutionPage')
    }

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
                            <SectionTitle expand={true} onPress={handleGoToHourlyPage}>
                                HÀNG GIỜ
                            </SectionTitle>
                            <SectionBody>
                                <Hourly />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle expand={true} onPress={handleGoToDailyPage}>
                                HÀNG NGÀY
                            </SectionTitle>
                            <SectionBody>
                                <Daily />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle expand={true} onPress={handleGoToGraphPage}>
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
                            <SectionTitle expand={true} onPress={handleGoToAirPollutionPage}>
                                CHẤT LƯỢNG KHÔNG KHÍ
                            </SectionTitle>
                            <SectionBody>
                                <AirPollution data={airPollutionData.pm25} />
                                <AirPollutionInfo data={airPollutionData.aqi} />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>MẶT TRỜI</SectionTitle>
                            <SectionBody>
                                <Sun sunrise={currentData?.sunrise} sunset={currentData?.sunset} />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>MẶT TRĂNG</SectionTitle>
                            <SectionBody>
                                <Moon data={currentData} />
                            </SectionBody>
                        </Section>

                        <Section>
                            <SectionTitle>Dark Mode</SectionTitle>
                            <SectionBody>
                                <DarkMode />
                            </SectionBody>
                        </Section>

                        {/* <Section>
                            <SectionTitle>WelcomePage</SectionTitle>
                            <SectionBody>
                                <TouchableOpacity onPress={handleGoToWelcomePage}>
                                    <Text>WelcomePage</Text>
                                </TouchableOpacity>
                            </SectionBody>
                        </Section> */}
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
    // airPollution: {
    //     height: 8,
    //     borderRadius:
    // }
})
