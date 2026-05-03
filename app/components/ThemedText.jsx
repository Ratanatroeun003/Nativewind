import { Text } from 'react-native'

const ThemedText = ({
    children,
    className = '',
    variant = 'body',
    ...props
}) => {
    const variants = {
        body: 'font-sans-regular text-sm text-gray-700 dark:text-white',
        title: 'font-sans-bold text-xl text-gray-900 dark:text-white',
        subtitle: 'font-sans-semibold text-base text-gray-800 dark:text-gray-100',
        caption: 'font-sans-light text-xs text-gray-500 dark:text-gray-400',
        button: 'font-sans-medium text-sm text-white',
        heading: 'font-sans-extrabold text-2xl text-gray-900 dark:text-white',
        label: 'font-sans-medium text-sm text-gray-600 dark:text-gray-300',
    }
    return (
        <Text
            className={`${variants[variant] || variants.body} ${className}`}
            {...props}
        >
            {children}
        </Text>
    )
}

export default ThemedText