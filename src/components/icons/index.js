import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme-context'
import { Icon } from '@ui-kitten/components'

const SearchIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="search"
            {...props}
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
        />
    )
}

const ShareIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="share-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            {...props}
        />
    )
}

const MenuIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="menu-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            {...props}
        />
    )
}

export { SearchIcon, ShareIcon, MenuIcon }
