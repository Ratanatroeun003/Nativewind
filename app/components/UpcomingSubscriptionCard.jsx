import { View } from 'react-native'
import { formatCurrency } from '../../lib/utils'
import ThemedCard from './ThemedCard'
import ThemedText from './ThemedText'
const UpcomingSubscriptionCard = ({ name, price, dayLeft, icon, currency }) => {
  const IconComponent = icon.library;
  return (
    <ThemedCard variant='upcoming'>
      <View className='upcoming-row'>
        <View className='upcoming-icon'>
          <IconComponent name={icon.name} size={24} color="#3b82f6" />
        </View>
        <View className='upcoming-info'>
          <ThemedText variant='title'>{formatCurrency(price, currency)}</ThemedText>
          <ThemedText variant='label' numberOfLines={1}>{dayLeft > 1 ? `${dayLeft} days left` : 'Last day'}</ThemedText>
        </View>
      </View>
      <ThemedText variant='title'>{name}</ThemedText>
    </ThemedCard>
  )
}

export default UpcomingSubscriptionCard