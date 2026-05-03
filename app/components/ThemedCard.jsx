import { Pressable, View } from 'react-native';
const ThemedCard = ({
    children,
    onPress,
    className = '',
    ...props
}) => {
    const Container = onPress ? Pressable : View;
    return (
        <Container
            className={`rounded-lg bg-slate-200 dark:bg-gray-700 p-4 ${className}`}
            onPress={onPress}
            {...props}
        >
            {children}
        </Container>
    )
}

export default ThemedCard