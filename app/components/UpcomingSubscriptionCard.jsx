import React from 'react';
import { Text, View } from 'react-native';
import { formatCurrency } from '../../lib/utils';

const UpcomingSubscriptionCard = ({ name, price, dayLeft, icon, currency }) => {
  return (
    <View className='bg-card p-5 rounded-2xl mb-6 border border-border shadow-sm'>
      <View className='flex-row items-center justify-between'>
        {/* Icon Section */}
        <View className='bg-gray-300 p-4 rounded-xl'>
          {React.createElement(icon.library, {
            name: icon.name,
            size: 20,
            color: '#3b82f6',
          })}
        </View>
        {/* Price & Days Left Section */}
        <View className='ml-4'>
          <Text className='text-lg font-sans-bold text-foreground'>
            {formatCurrency(price, currency)}
          </Text>
          <Text className='text-upcoming-day' numberOfLines={1}>
            {dayLeft > 1 ? `${dayLeft} days left` : 'Last day'}
          </Text>
        </View>
      </View>

      {/* Subscription Name Section */}
      <Text className='text-base font-sans-bold mt-1 text-foreground' numberOfLines={1}>
        {name}
      </Text>
    </View>
  )
}
export default UpcomingSubscriptionCard