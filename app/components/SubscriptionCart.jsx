import { View } from 'react-native';
import { formatCurrency, formatSubscriptionDateTime } from '../../lib/utils';
import Spacer from './Spacer';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';
const SubscriptionCart = ({ name, price, plan, icon, category, renewalDate, billing, paymentMethod, status, currency, onPress, expanded }) => {
    const IconComponent = icon.library;
    return (
        <ThemedCard
            onPress={onPress}
            className='mx-5 mb-3 rounded-2xl'
        >
            <View className='flex-row items-center justify-center gap-4'>
                <View className='w-20 items-center justify-center h-20 rounded-xl bg-gray-800'>
                    <IconComponent name={icon.name} size={20} color="#3b82f6" />
                </View>
                <View>
                    <ThemedText numberOfLine={1} variant='title'>{name}</ThemedText>
                    <ThemedText variant='caption'>{category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}</ThemedText>
                </View>
                <View>
                    <ThemedText variant='title'>{formatCurrency(price, currency)}</ThemedText>
                    <ThemedText variant='subtitle'>{billing}</ThemedText>
                </View>
            </View>
            <Spacer />
            {expanded && (
                <View className='mt-4'>
                    <View className='flex-row items-center gap-2'>
                        <ThemedText variant='caption'>Payment:</ThemedText>
                        <ThemedText variant='body'>{paymentMethod}</ThemedText>
                    </View>
                    <View className='flex-row items-center gap-2'>
                        <ThemedText variant='caption'>RenewalDate:</ThemedText>
                        <ThemedText variant='body'>{renewalDate}</ThemedText>
                    </View>
                    <Spacer />
                    <View className='flex-row items-center gap-2'>
                        <ThemedText variant='caption'>Status:</ThemedText>
                        <ThemedText variant='body'>{status}</ThemedText>
                    </View>
                </View>
            )}
        </ThemedCard>
    )
}
export default SubscriptionCart