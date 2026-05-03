import { Link, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const SubscriptionDetails = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>SubscriptionDetail{id}:</Text>
            <Link href='/'>
                Go Back
            </Link>
        </View>
    )
}

export default SubscriptionDetails