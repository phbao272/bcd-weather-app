import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import { currentDataSelector } from '../redux/selectors'
import { useSelector } from 'react-redux'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

const NotificationPage = () => {
    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    const current = useSelector(currentDataSelector)

    const [currentData, setCurrentData] = useState(current)

    useEffect(() => {
        setCurrentData(current)
    }, [current])

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => console.log(token))

        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification)
            },
        )

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

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}
        >
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>
                    Data: {notification && JSON.stringify(notification.request.content.data)}
                    {JSON.stringify(currentData)}
                </Text>
            </View>
            <Button
                title="Press to schedule a notification"
                onPress={async () => {
                    await schedulePushNotification()
                }}
            />
        </View>
    )
}

export default NotificationPage

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Th???i ti???t h??m nay',
            body: 'test',
            data: { data: '' },
        },
        trigger: { seconds: 2 },
    })
}

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
