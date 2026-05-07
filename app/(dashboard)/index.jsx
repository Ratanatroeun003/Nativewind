import Ionicons from '@expo/vector-icons/Ionicons'
import dayjs from "dayjs"
import { useState } from "react"
import { FlatList, Image, Pressable, View } from "react-native"
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  UPCOMING_SUBSCRIPTIONS
} from "../../assets/constants/data"
import "../../global.css"
import { formatCurrency } from "../../lib/utils"
import ListHeading from "../components/ListHeading"
import Spacer from '../components/Spacer'
import SubscriptionCart from "../components/SubscriptionCart"
import ThemedCard from "../components/ThemedCard"
import ThemedText from "../components/ThemedText"
import ThemedView from "../components/ThemedView"
import UpcomingSubscriptionCard from "../components/UpcomingSubscriptionCard"
const HomeScreen = () => {
  const [expendedSubscriptionId, setExpendedSubscriptionId] = useState(null)
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <ThemedView safe className='flex-1'>

      {/* Header */}
      <View className='home-header'>
        <View className='home-user'>
          <View className='avatar-container'>
            {user?.imageUrl ? (
              <Image source={{ uri: user.imageUrl }} className='avatar-image' />
            ) : (
              <View className='avatar-placeholder'>
                <Ionicons name="person" size={24} color="#666" />
              </View>
            )}
          </View>
          <ThemedText variant="heading">
            Hello {user?.firstName || user?.username || 'User'}
          </ThemedText>
        </View>
        <Pressable onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={35} color="#3b82f6" />
        </Pressable>
      </View>
      <Spacer />

      {/* Balance Card */}
      <ThemedCard variant="balance">
        <ThemedText variant="label">
          Current Balance
        </ThemedText>
        <View className='home-balance-row'>
          <ThemedText variant="heading">
            {formatCurrency(HOME_BALANCE.amount)}
          </ThemedText>
          <ThemedText variant="subtitle">
            {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
          </ThemedText>
        </View>
      </ThemedCard>
      <Spacer />
      {/* Upcoming */}
      <View className='flex-none'>
        <ListHeading title='Upcoming' />
        <FlatList
          data={UPCOMING_SUBSCRIPTIONS}
          renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
          ListEmptyComponent={
            <ThemedText variant="caption" className="px-5">
              No upcoming renewals yet
            </ThemedText>
          }
        />
      </View>

      <Spacer />
      {/* All Subscriptions */}
      <View className='flex-1'>
        <ListHeading title='All Subscriptions' />
        <FlatList
          data={HOME_SUBSCRIPTIONS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 12,
            paddingBottom: 80,
          }}
          renderItem={({ item }) => (
            <SubscriptionCart
              {...item}
              expanded={expendedSubscriptionId === item.id}
              onPress={() => setExpendedSubscriptionId(
                expendedSubscriptionId === item.id ? null : item.id
              )}
            />
          )}
          ListEmptyComponent={
            <ThemedText variant="caption" className="px-5">
              No subscriptions yet
            </ThemedText>
          }
        />
      </View>
    </ThemedView>
  )
}

export default HomeScreen