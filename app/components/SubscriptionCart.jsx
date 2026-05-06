import { View } from 'react-native';
import { formatCurrency, formatSubscriptionDateTime } from '../../lib/utils';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';

const SubscriptionCart = ({
    name, price, plan, icon, category, renewalDate,
    billing, paymentMethod, status, currency, onPress, expanded,
}) => {
    const IconComponent = icon.library;
    const isActive = status.toLowerCase() === 'active';

    return (
        <ThemedCard
            variant='subscription'
            onPress={onPress}
            className={expanded ? 'sub-expanded-active' : ''}
        >
            <View className='main-row'>
                <View className='icon-wrapper'>
                    <IconComponent
                        name={icon.name}
                        size={28}
                        color="#3b82f6"
                    />
                </View>
                <View className='flex-1 px-3'>
                    <ThemedText numberOfLines={1} variant='title'>
                        {name}
                    </ThemedText>
                    <ThemedText variant='subtitle'>
                        {category?.trim() || plan?.trim() ||
                            (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}
                    </ThemedText>
                </View>
                <View className='items-end'>
                    <ThemedText variant='title'>
                        {formatCurrency(price, currency)}
                    </ThemedText>
                    <ThemedText variant='subtitle'>{billing}</ThemedText>
                </View>
            </View>
            {expanded && (
                <View className='sub-expanded-content'>
                    <View className='sub-expanded-row'>
                        <ThemedText variant='caption'>Payment</ThemedText>
                        <ThemedText variant='body'>
                            {paymentMethod}
                        </ThemedText>
                    </View>

                    <View className='sub-expanded-row'>
                        <ThemedText variant='caption'>Renewal Date</ThemedText>
                        <ThemedText variant='body'>
                            {formatSubscriptionDateTime(renewalDate)}
                        </ThemedText>
                    </View>
                    <View className='sub-expanded-row'>
                        <ThemedText variant='caption'>Status</ThemedText>
                        <View className={`status-badge ${isActive ? 'status-active' : 'status-inactive'}`}>
                            <ThemedText className={isActive ? 'status-active-text' : 'status-inactive-text'}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </ThemedText>
                        </View>
                    </View>
                </View>
            )}
        </ThemedCard>
    );
};

export default SubscriptionCart;