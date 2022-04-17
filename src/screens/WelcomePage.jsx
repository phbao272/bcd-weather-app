import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

import { Layout, Text } from '@ui-kitten/components';

const slides = [
    {
        key: 'one',
        title: 'BCD WEATHER',
        image: require('../../assets/welcome-image/intro.png'),
        text: 'Một ứng dụng thời tiết đẹp và dễ sử dụng',
    },
    {
        key: 'two',
        title: 'CHO PHÉP QUYỀN',
        text: 'BCD Weather cần quyền truy cập vị trí của bạn để hoạt động',
        image: require('../../assets/welcome-image/intro.png'),
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
                    <Text style={{ fontSize: 26 }}>{item.title}</Text>
                    <Text style={{ fontSize: 18 }}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const _renderDoneButton = () => {
        return (
            <TouchableOpacity style={styles.doneButton}>
                <Text>CẤP QUYỀN</Text>
            </TouchableOpacity>
        );
    };

    //
    return <AppIntroSlider data={slides} renderItem={renderItem} renderDoneButton={_renderDoneButton} showNextButton={false} />;
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
        width: screen.width,
        overflow: 'hidden',
        padding: 4,
    },

    image: {
        width: '100%',
        height: screen.width,
    },

    textContainer: {
        padding: 16,
        flex: 1,
        textAlign: 'left',
    },

    doneButton: {
        backgroundColor: '#ccc',
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
});
