import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

import { Layout, Text } from '@ui-kitten/components';

const slides = [
    {
        key: 'one',
        title: 'BCD WEATHER',
        image: require('../../assets/welcome-image/intro.png'),
        text: 'Một ứng dụng thời tiết đẹp và dễ sử dụng',
        backgroundColor: '#59b2ab',
    },
    {
        key: 'two',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../../assets/welcome-image/intro.png'),
        backgroundColor: '#febe29',
    },
];

const WelcomePage = () => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={item.image}></Image>
                </View>

                <View style={styles.textContainer}>
                    <Text>{item.title}</Text>
                    <Text>{item.text}</Text>
                </View>
            </View>
        );
    };

    return <AppIntroSlider data={slides} renderItem={renderItem} />;
};

export default WelcomePage;

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        position: 'relative',
        alignItems: 'center',
    },

    imageContainer: {
        height: screen.height / 2,
        overflow: 'hidden',
    },

    image: {
        width: screen.width,
    },

    textContainer: {
        justifyContent: 'flex-start',
        flex: 1,
    },
});
