import React from 'react';
import { TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Layout, Text, Icon, Avatar } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { BackIcon } from '../components/icons';
import Section, { SectionBody, SectionTitle } from '../components/Section';

import { ConvertUnixTimeToUTC } from '../utils/index';

import globalStyles from '../constants/index';

const DailyItem = (isToday = false, iconUrl, rainChanceNight, rainChanceDay) => {
    return (
        <Layout style={styles.container}>
            <Layout style={[styles.flexRow, { alignItems: 'center', marginBottom: 4 }]}>
                <Layout style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={require(`../../assets/weather-icon/rain.png`)} />
                </Layout>
                <Layout style={{ flex: 8 }}>
                    <Text style={styles.textStyle}>{ConvertUnixTimeToUTC(1648539456, 'dddd, Do MMMM')}</Text>
                    <Text style={[styles.textStyle]}>26&#176;C/22&#176;C</Text>
                </Layout>
            </Layout>
            <Layout style={[styles.flexRow, { alignItems: 'flex-start', justifyContent: 'center' }]}>
                <Layout style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#499bf1' }}>67%</Text>
                </Layout>
                <Layout style={{ flex: 8 }}>
                    {isToday ? (
                        <Text>Hôm nay - Có mây. Gió đông với vận tốc 11km/h. Khả năng xảy ra mưa {rainChanceDay}%.</Text>
                    ) : (
                        <Text>Sáng - Có mây. Gió đông với vận tốc 11km/h. Khả năng xảy ra mưa {rainChanceDay}%.</Text>
                    )}
                    {isToday ? (
                        <Text>Tối nay - Mưa. Gió đông - đông nam với vận tốc 13km/h. Khả năng xảy ra mưa {rainChanceNight}%.</Text>
                    ) : (
                        <Text>Tối - Mưa. Gió đông - đông nam với vận tốc 13km/h. Khả năng xảy ra mưa {rainChanceNight}%.</Text>
                    )}
                </Layout>
            </Layout>
        </Layout>
    );
};

const DailyPage = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <Layout style={globalStyles.container}>
            <Section>
                <SectionTitle>
                    <Layout style={[globalStyles.flexRowCenterAlign, styles.containerFixedTop]}>
                        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 24, fontSize: 20 }}>8 Ngày tiếp</Text>
                    </Layout>
                </SectionTitle>
                <SectionBody>
                    <ScrollView>
                        <DailyItem isToday="true" rainChanceDay="12" rainChanceNight="37" />
                        <DailyItem rainChanceDay="12" rainChanceNight="37" />
                        <DailyItem rainChanceDay="12" rainChanceNight="37" />
                        <DailyItem rainChanceDay="12" rainChanceNight="37" />
                        <DailyItem rainChanceDay="12" rainChanceNight="37" />
                        <DailyItem rainChanceDay="12" rainChanceNight="37" />
                        <DailyItem rainChanceDay="12" rainChanceNight="37" />
                        <DailyItem rainChanceDay="12" rainChanceNight="37" />
                    </ScrollView>
                </SectionBody>
            </Section>
        </Layout>
    );
};

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
    },
    leftSec: {
        flexBasis: '30%',
    },

    rightSec: {
        flexBasis: '70%',
    },

    textStyle: {
        fontSize: 18,
        fontWeight: 500,
    },

    container: {
        paddingBottom: 24,
    },

    wrapText: {
        flexWrap: 'wrap',
    },

    imageStyle: {
        width: 100,
        height: screen.width,
        borderRadius: 12,
    },
});

export default DailyPage;
