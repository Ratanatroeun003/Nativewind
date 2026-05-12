import cx from 'clsx';
import { Pressable, Text, View } from 'react-native';
import { formatCurrency, formatSubscriptionDateTime } from '../../lib/utils';

const SubscriptionCart = ({
    name,
    price,
    plan,
    icon,
    category,
    renewalDate,
    billing,
    paymentMethod,
    status,
    currency,
    onPress,
    expanded,
    color,
}) => {
    const IconComponent = icon?.library;
    const isActive = status?.toLowerCase() === 'active';

    return (
        <Pressable
            onPress={onPress}
            style={{ backgroundColor: color ? `${color}20` : '#f8fafc' }}
            className={cx('p-4 rounded-xl mb-3 border', expanded && 'border-border')}
        >
            <View className='flex-row justify-between items-center'>
                {/* Icon */}
                <View
                    style={{ backgroundColor: color || '#334155' }}
                    className='w-12 h-12 rounded-2xl items-center justify-center'
                >
                    {IconComponent ? (
                        <IconComponent
                            name={icon?.name}
                            size={24}
                            color="#FFFFFF"
                        />
                    ) : (
                        <Text style={{ color: '#fff', fontSize: 18 }}>?</Text>
                    )}
                </View>

                <View className='flex-1 px-3'>
                    <Text numberOfLines={1} className='text-lg font-sans-bold text-foreground'>
                        {name}
                    </Text>
                    <Text className='text-sm font-sans text-muted-foreground'>
                        {category?.trim() || plan?.trim() || ''}
                    </Text>
                </View>

                <View className='items-end'>
                    <Text className='text-lg font-sans-bold text-foreground'>
                        {formatCurrency(price, currency)}
                    </Text>
                    <Text className='text-[10px] uppercase tracking-wider font-sans-medium text-muted-foreground'>
                        {billing}
                    </Text>
                </View>
            </View>

            {/* Expanded Details */}
            {expanded && (
                <View className='mt-3 pt-3 border-t border-border gap-y-3'>
                    <View className='items-center justify-between flex-row'>
                        <Text className="text-muted-foreground text-sm font-sans">Payment Method</Text>
                        <Text className="text-foreground text-sm font-sans-medium">
                            {paymentMethod}
                        </Text>
                    </View>
                    <View className='items-center justify-between flex-row'>
                        <Text className="text-muted-foreground text-sm font-sans">Renewal Date</Text>
                        <Text className="text-foreground text-sm font-sans-medium">
                            {formatSubscriptionDateTime(renewalDate)}
                        </Text>
                    </View>
                    <View className='items-center justify-between flex-row'>
                        <Text className="text-muted-foreground text-sm font-sans">Status</Text>
                        <View className={cx('rounded-full px-2 py-1', isActive ? 'bg-success/20' : 'bg-slate-100')}>
                            <Text className={cx('text-xs font-sans-medium', isActive ? 'text-success' : 'text-slate-600')}>
                                {status?.charAt(0).toUpperCase() + status?.slice(1)}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    );
};

export default SubscriptionCart;