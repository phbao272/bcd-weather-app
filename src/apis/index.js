import axios from 'axios'

const BASE_URL = 'http://api.openweathermap.org'

export const API_KEY = '928d7cbdb515f2cae3f4c4fa3f9a7893'

const apis = {
    getCoordinatesByLocationName: (cityName, limit = 5) =>
        axios.get(
            `${BASE_URL}/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`,
        ),

    getLocationNameByCoordinates: (lon, lat, limit = 5) =>
        axios.get(
            `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`,
        ),
    getWeatherData: (lon, lat) =>
        axios.get(
            `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}`,
        ),
    getWeatherIcon: (id) => `http://openweathermap.org/img/wn/${id}@2x.png`,
    getAirPollution: (lon, lat) =>
        axios.get(
            `${BASE_URL}/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        ),
}

// export const getWeatherData = (lon, lat) =>
//     axios.get(
//         `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API_KEY}`,
//     )

export default apis
