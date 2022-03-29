import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import {
    Layout,
    Text,
    Button,
    Autocomplete,
    AutocompleteItem,
} from '@ui-kitten/components'
import { getWeatherData } from '../apis'
import { SearchIcon, BackIcon, SettingIcon } from '../components/icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import provins from '../data/ProvinVN'
import globalStyles from '../constants/index'

const SearchPage = () => {
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const filter = (item, query) =>
        item.name.toLowerCase().includes(query.toLowerCase())

    const [value, setValue] = useState(null)
    const [data, setData] = useState(provins)
    const [placement, setPlacement] = useState('bottom')

    const onSelect = (index) => {
        const currentSelection = data.find(
            (item) => item.name === data[index].name,
        )

        setValue(currentSelection.name)
        // setLocationName(currentSelection.name);
        // setCoordinates({
        //     longitude: currentSelection.coord.lon,
        //     latitude: currentSelection.coord.lat,
        // });
        console.log(currentSelection.coord.lon, currentSelection.coord.lat)

        getWeatherData(
            currentSelection.coord.lon,
            currentSelection.coord.lat,
        ).then((res) => {
            console.log(res.data)
        })
    }

    const onChangeText = (query) => {
        setValue(query)
        setData(provins.filter((item) => filter(item, query)))
    }

    const renderOption = (item, index) => (
        <AutocompleteItem key={index} title={item.name} />
    )

    return (
        <Layout style={globalStyles.container}>
            <Layout style={globalStyles.flexRowSpace}>
                <TouchableOpacity onPress={handleGoBack}>
                    <BackIcon />
                </TouchableOpacity>
            </Layout>
            <Text>Search Page</Text>
            <Autocomplete
                placeholder="Place your Text"
                value={value}
                placement={placement}
                onChangeText={onChangeText}
                onSelect={onSelect}
            >
                {data.map(renderOption)}
            </Autocomplete>
        </Layout>
    )
}

export default SearchPage

const styles = StyleSheet.create({
    flexDirectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
