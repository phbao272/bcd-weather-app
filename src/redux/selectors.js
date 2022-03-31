export const locatitonActiveSelector = (state) => state.weather.locationActive

export const weatherDataSelector = (state) => state.weather.weatherData

export const dailySelector = (state) => state.weather.weatherData.daily

export const currentDataSelector = (state) => state.weather.weatherData.current

export const hourlySelector = (state) => state.weather.weatherData.hourly

// export const currentDailySelector = (state) =>
//     state.weather.weatherData.daily
