import moment from 'moment'

moment.locale('vi')

moment.updateLocale('vi', {
    weekdays: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
    months: [
        'THÁNG 1',
        'THÁNG 2',
        'THÁNG 3',
        'THÁNG 4',
        'THÁNG 5',
        'THÁNG 6',
        'THÁNG 7',
        'THÁNG 8',
        'THÁNG 9',
        'THÁNG 10',
        'THÁNG 11',
        'THÁNG 12',
    ],
})

// 'dddd, Do MMMM'
// 'hh:mm'
const ConvertUnixTimeToUTC = (time, format) => {
    return moment(time * 1000).format(format)
}

const ConvertKToC = (kelvin) => {
    return (kelvin - 273.15).toFixed()
}

export { ConvertKToC, ConvertUnixTimeToUTC }
