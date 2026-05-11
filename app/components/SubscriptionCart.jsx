import cx from 'clsx';
import { Pressable, Text, View } from 'react-native';
import { formatCurrency, formatSubscriptionDateTime } from '../../lib/utils';

const SubscriptionCart = ({
    name, price, plan, icon, category, renewalDate,
    billing, paymentMethod, status, currency, onPress, expanded, color,
}) => {
    const IconComponent = icon.library;
    const isActive = status.toLowerCase() === 'active';

    return (
        <Pressable
            onPress={onPress}
            style={{ backgroundColor: color ? `${color}15` : '#f8fafc' }}
            className={cx('p-4 rounded-2xl mb-3 border-2 overflow-hidden', expanded ? 'border-border' : 'border-border/40')}
        >
            <View className='flex-row justify-between items-center'>
                <View style={{ backgroundColor: color || '#334155' }} className='w-14 h-14 rounded-2xl items-center justify-center shadow-lg'>
                    <IconComponent
                        name={icon.name}
                        size={28}
                        color="#FFFFFF"
                    />
                </View>
                <View className='flex-1 px-4'>
                    <Text numberOfLines={1} className='text-lg font-sans-bold text-foreground'>
                        {name}
                    </Text>
                    <Text className='text-xs font-sans text-muted-foreground mt-1 uppercase tracking-wider'>
                        {category?.trim() || plan?.trim() ||
                            (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}
                    </Text>
                </View>
                <View className='items-end'>
                    <Text className='text-xl font-sans-bold text-foreground'>
                        {formatCurrency(price, currency)}
                    </Text>
                    <Text className='text-[9px] uppercase tracking-widest font-sans-semibold text-muted-foreground'>
                        {billing}
                    </Text>
                </View>
            </View>
            {/* ផ្នែកពង្រីក (Expanded Details) */}
            {expanded && (
                <View className='mt-4 pt-4 border-t-2 border-border/30 gap-y-3'>
                    <View className='items-center justify-between flex-row'>
                        <Text className="text-muted-foreground text-xs font-sans-medium uppercase tracking-wider">Payment Method</Text>
                        <Text className="text-foreground text-sm font-sans-semibold">
                            {paymentMethod}
                        </Text>
                    </View>
                    <View className='items-center justify-between flex-row'>
                        <Text className="text-muted-foreground text-xs font-sans-medium uppercase tracking-wider">Renewal Date</Text>
                        <Text className="text-foreground text-sm font-sans-semibold">
                            {formatSubscriptionDateTime(renewalDate)}
                        </Text>
                    </View>
                    <View className='items-center justify-between flex-row'>
                        <Text className="text-muted-foreground text-xs font-sans-medium uppercase tracking-wider">Status</Text>
                        <View className={cx('rounded-full px-3 py-1.5', isActive ? 'bg-success/20' : 'bg-slate-100')}>
                            <Text className={cx('text-xs font-sans-semibold', isActive ? 'text-success' : 'text-slate-600')}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    );
};

export default SubscriptionCart;