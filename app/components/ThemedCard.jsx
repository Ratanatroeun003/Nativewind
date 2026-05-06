import { Pressable, View } from 'react-native';

const ThemedCard = ({ children, onPress, variant = 'subscription', className = '', ...props }) => {
    const Container = onPress ? Pressable : View;
    const variants = {
        balance: 'cart-balance',
        upcoming: 'cart-upcoming',
        subscription: 'cart-subscription',
    };
    return (
        <Container
            onPress={onPress}
            className={`${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </Container>
    );
};
export default ThemedCard;