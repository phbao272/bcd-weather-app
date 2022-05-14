import React, { useState, useEffect, useRef } from 'react'
import { Image, Dimensions, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Layout, Spinner, Text, Button } from '@ui-kitten/components'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

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
import { setLocationActive, setLocations, addLocation } from '../redux/slices/locationSlice'
import { setToken } from '../redux/slices/userSlice'

import {
    dailySelector,
    hourlySelector,
    currentDataSelector,
    getLoadingSelector,
    getAirPollutionSelector,
    getLocationsSelector,
} from '../redux/selectors'

import { ConvertKToC, ConvertWindDeg, ConvertWindSpeed, ConvertPop } from '../utils'

import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

import { sendPushNotification } from '../utils'
import descriptionWeather from '../../assets/data/desc-weather.json'

const screen = Dimensions.get('screen')

const HomePage = () => {
    const [isLoading, setLoading] = useState(true)
    const [coordinates, setCoordinates] = useState({})
    const [locationName, setLocationName] = useState(null)
    const [turnOnLocation, setTurnOnLocation] = useState(false)

    const dispatch = useDispatch()

    const loading = useSelector(getLoadingSelector)

    const [dailyWeather, setDailyWeather] = useState({ weather: [] })

    const dailyWeatherData = useSelector(dailySelector)

    useEffect(() => {
        if (Array.isArray(dailyWeatherData)) {
            console.log('dailyWeatherData', dailyWeatherData[0])
            setDailyWeather(dailyWeatherData[0])
        }
    }, [dailyWeatherData])

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

    // TODO: Lấy vị trí hiện tại từ Local Storage
    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@location-active')

                let data = []

                // TODO: Xử lý chuỗi JSON lấy lon, lat
                if (jsonValue !== null) {
                    data = jsonValue
                        .slice(1, jsonValue.length - 2)
                        .split(',')
                        .map((item) => item.split(':'))

                    const lon = Number(data[1][1])
                    const lat = Number(data[2][1])

                    setCoordinates({
                        lon: lon,
                        lat: lat,
                        currPosition: false,
                    })
                    // console.log(data)
                    // console.log({ lon, lat })
                }
            } catch (e) {
                // error reading value
            }
        }

        // getData()
    }, [])

    // console.log(coordinates)

    // Note: Cập nhật coordinates theo Storage
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
            currPosition: true,
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
                    currPosition: coordinates.currPosition,
                }),
            )
                .unwrap()
                .then((originalPromiseResult) => {
                    setLocationName(originalPromiseResult.name)
                })
        }
    }, [coordinates])

    // TODO: Lấy dữ liệu One Call
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            dispatch(getWeatherData({ lon: coordinates.lon, lat: coordinates.lat }))

            dispatch(getAirPollution({ lon: coordinates.lon, lat: coordinates.lat }))
        }
    }, [coordinates])

    const locations = useSelector(getLocationsSelector)

    // TODO: Thêm vị trí hiện tại vào Locations
    useEffect(() => {
        if (coordinates.lon && coordinates.lat && currentData) {
            if (locations.length > 0) {
                if (locationName && !_.find(locations, { name: locationName })) {
                    dispatch(
                        addLocation({
                            id: uuidv4(),
                            name: locationName,
                            lon: coordinates.lon,
                            lat: coordinates.lat,
                            currPosition: coordinates.currPosition,
                            icon: currentData.weather[0].icon || '10d',
                            temp: currentData.temp,
                        }),
                    )
                }
            } else {
                dispatch(
                    addLocation({
                        id: uuidv4(),
                        name: locationName,
                        lon: coordinates.lon,
                        lat: coordinates.lat,
                        currPosition: coordinates.currPosition,
                        icon: currentData.weather[0].icon || '10d',
                        temp: currentData.temp,
                    }),
                )
            }

            // console.log(currentData)
        }
        // console.log({ locations })
    }, [coordinates, currentData])

    const navigation = useNavigation()

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

    // const handleGoToWelcomePage = () => {
    //     navigation.navigate('WelcomePage')
    // }

    const viewShot = useRef()

    const captureAndShareScreenshot = () => {
        viewShot.current.capture().then((uri) => {
            console.log('do something with ', uri)
            Sharing.shareAsync('file://' + uri)
        }),
            (error) => console.error('Oops, snapshot failed', error)
    }

    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            dispatch(setToken(token))
            setExpoPushToken(token)
        })

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification)
            },
        )

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response)
            },
        )

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }, [])

    async function scheduleAndCancel() {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hey!',
            },
            trigger: { seconds: 5, repeats: true },
        })
        await Notifications.cancelScheduledNotificationAsync(identifier)
    }

    const [message, setMessage] = useState({ title: '', body: '' })

    useEffect(() => {
        setMessage({
            title: `${ConvertKToC(currentData?.temp)}°C - ${
                descriptionWeather[currentData?.weather[0]?.id]
            } | Cao: ${ConvertKToC(dailyWeather?.temp?.max)}°C - Thấp: ${ConvertKToC(
                dailyWeather?.temp?.min,
            )}°C`,
            body: `Hôm nay - ${
                descriptionWeather[dailyWeather?.weather[0]?.id]
            }. Gió ${ConvertWindDeg(dailyWeather?.wind_deg)}, tốc độ ${ConvertWindSpeed(
                dailyWeather?.wind_speed,
            )} km/h. ${
                ConvertPop(dailyWeather?.pop)
                    ? `Khả năng mưa ${ConvertPop(dailyWeather?.pop)}%.`
                    : ''
            }`,
        })
    }, [currentData, dailyWeather])

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
                        <Header captureAndShareScreenshot={captureAndShareScreenshot} />
                    </Layout>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                        <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 1 }}>
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
                            {/* Summary */}
                            <Section>
                                <SectionBody>
                                    <Summary />
                                </SectionBody>
                            </Section>
                            {/* Detail */}
                            <Section>
                                <SectionTitle>CHI TIẾT</SectionTitle>
                                <SectionBody>
                                    <Detail />
                                </SectionBody>
                            </Section>
                            {/* Hourly */}
                            <Section>
                                <SectionTitle expand={true} onPress={handleGoToHourlyPage}>
                                    HÀNG GIỜ
                                </SectionTitle>
                                <SectionBody>
                                    <Hourly />
                                </SectionBody>
                            </Section>
                            {/* Daily */}
                            <Section>
                                <SectionTitle expand={true}>HÀNG NGÀY</SectionTitle>
                                <SectionBody>
                                    <Daily />
                                </SectionBody>
                            </Section>
                            {/* Chart */}
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
                            {/* Air Pollution */}
                            <Section>
                                <SectionTitle expand={true} onPress={handleGoToAirPollutionPage}>
                                    CHẤT LƯỢNG KHÔNG KHÍ
                                </SectionTitle>
                                <SectionBody>
                                    <AirPollution data={airPollutionData.pm25} />
                                    <AirPollutionInfo data={airPollutionData.aqi} />
                                </SectionBody>
                            </Section>
                            {/* Sun */}
                            <Section>
                                <SectionTitle>MẶT TRỜI</SectionTitle>
                                <SectionBody>
                                    <Sun
                                        sunrise={currentData?.sunrise}
                                        sunset={currentData?.sunset}
                                    />
                                </SectionBody>
                            </Section>
                            {/* Moon */}
                            <Section>
                                <SectionTitle>MẶT TRĂNG</SectionTitle>
                                <SectionBody>
                                    <Moon data={currentData} />
                                </SectionBody>
                            </Section>
                            {/* Dark Mode */}
                            <Section>
                                <SectionTitle>Dark Mode</SectionTitle>
                                <SectionBody>
                                    <DarkMode />
                                </SectionBody>
                            </Section>

                            <Section>
                                <SectionBody>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await sendPushNotification(
                                                expoPushToken,
                                                message.title,
                                                message.body,
                                            )
                                        }}
                                    >
                                        <Text>Get Token</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={scheduleAndCancel}>
                                        <Text>scheduleAndCancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={async () => {
                                            await Notifications.cancelAllScheduledNotificationsAsync()
                                        }}
                                    >
                                        <Text>cancelAllScheduledNotificationsAsync</Text>
                                    </TouchableOpacity>
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
                        </ViewShot>
                    </ScrollView>
                </>
            )}
        </Layout>
    )
}

export default HomePage

async function registerForPushNotificationsAsync() {
    let token
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!')
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
    } else {
        alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    return token
}

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: screen.width,
        borderRadius: 12,
    },
})
