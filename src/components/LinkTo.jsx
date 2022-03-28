import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '@ui-kitten/components'
import * as Linking from 'expo-linking'

const LinkTo = () => {
    const handleGoTo = (link) => {
        Linking.openURL(link)
    }

    return (
        <View>
            <Button
                onPress={() =>
                    handleGoTo('https://www.youtube.com/watch?v=ypzwpZx_nGk')
                }
            >
                Go to
            </Button>
        </View>
    )
}

export default LinkTo
