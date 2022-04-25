import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Layout, Text, Button, Autocomplete, AutocompleteItem, Input } from '@ui-kitten/components'
import { v4 as uuidv4 } from 'uuid'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { addLocation } from '../redux/slices/locationSlice'
import { getLocationsSelector } from '../redux/selectors'

import { SearchIcon, BackIcon, SettingIcon } from '../components/icons'
import apis from '../apis'
import provins from '../data/ProvinVN'
import globalStyles from '../constants/index'

const SearchPage = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const [value, setValue] = useState('')
    const [locationsData, setLocationsData] = useState([])

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@locations', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const locations = useSelector(getLocationsSelector)

    useEffect(() => {
        setLocationsData(locations)
    }, [locations])

    const handleSubmit = () => {
        apis.getCoordinatesByLocationName(value).then((res) => {
            // console.log(res.data)
            const id = uuidv4()

            setLocationsData([
                ...locationsData,
                {
                    id,
                    name: res.data[0]?.local_names?.vi,
                    lon: res.data[0]?.lon,
                    lat: res.data[0]?.lat,
                },
            ])

            dispatch(
                addLocation([
                    ...locationsData,
                    {
                        id,
                        name: res.data[0]?.local_names?.vi,
                        lon: res.data[0]?.lon,
                        lat: res.data[0]?.lat,
                    },
                ]),
            )

            storeData([
                ...locationsData,
                {
                    id,
                    name: res.data[0]?.local_names?.vi,
                    lon: res.data[0]?.lon,
                    lat: res.data[0]?.lat,
                },
            ])
        })
    }

    // console.log({ locationsData })

    return (
        <Layout style={globalStyles.container}>
            <Layout style={globalStyles.flexRowSpace}>
                <TouchableOpacity onPress={handleGoBack}>
                    <BackIcon />
                </TouchableOpacity>
            </Layout>
            <Input
                placeholder="Place your Text"
                value={value}
                onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Button onPress={handleSubmit}>
                <SearchIcon />
            </Button>
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

// const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase())

// const [value, setValue] = useState('')
// const [data, setData] = useState(provins)
// const [placement, setPlacement] = useState('bottom')

// const onSelect = (index) => {
//     const currentSelection = data.find((item) => item.name === data[index].name)

//     setValue(currentSelection.name)
//     // setLocationName(currentSelection.name);
//     // setCoordinates({
//     //     longitude: currentSelection.coord.lon,
//     //     latitude: currentSelection.coord.lat,
//     // });
//     console.log(currentSelection.coord.lon, currentSelection.coord.lat)

//     apis.getWeatherData(currentSelection.coord.lon, currentSelection.coord.lat).then((res) => {
//         console.log(res.data)
//     })
// }

// const onChangeText = (query) => {
//     setValue(query)
//     setData(provins.filter((item) => filter(item, query)))
// }

// const renderOption = (item, index) => <AutocompleteItem key={index} title={item.name} />

// return (
//     <Layout style={globalStyles.container}>
//         <Layout style={globalStyles.flexRowSpace}>
//             <TouchableOpacity onPress={handleGoBack}>
//                 <BackIcon />
//             </TouchableOpacity>
//         </Layout>
//         <Text>Search Page</Text>
//         <Autocomplete
//             placeholder="Place your Text"
//             value={value}
//             placement={placement}
//             onChangeText={onChangeText}
//             onSelect={onSelect}
//         >
//             {data.map(renderOption)}
//         </Autocomplete>
//     </Layout>
// )
