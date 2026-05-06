import { Text } from 'react-native'

const ThemedText = ({
    children,
    className = '',
    variant = 'body',
    ...props
}) => {
    const variants = {
        body: 'text-body',
        title: 'text-title',
        subtitle: 'text-subtitle',
        caption: 'text-caption',
        button: 'text-button',
        heading: 'text-heading',
        label: 'text-label',
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