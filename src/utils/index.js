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
    return time ? moment(time * 1000).format(format) : ''
}

const ConvertKToC = (kelvin) => {
    return kelvin ? (kelvin - 273.15).toFixed() : ''
}

const ConvertVisibility = (visibility) => {
    return visibility ? (visibility / 1000).toFixed() : ''
}

const ConvertWindSpeed = (speed) => {
    return speed ? (speed * 3.6).toFixed() : ''
}

const ConvertWindDeg = (deg) => {
    let res = ''

    if (deg >= 22.5 && deg <= 112.5) {
        res = 'đông - đông bắc'
    } else if (deg > 112.5 && deg < 202.5) {
        res = 'nam - đông nam'
    } else if (deg > 202.5 && deg < 292.5) {
        res = 'tây - tây nam'
    } else {
        res = 'bắc - tây bắc'
    }

    return res
}

const ConvertPop = (value) => {
    return value ? (value * 100).toFixed() : ''
}

export {
    ConvertKToC,
    ConvertUnixTimeToUTC,
    ConvertVisibility,
    ConvertWindSpeed,
    ConvertWindDeg,
    ConvertPop,
}
