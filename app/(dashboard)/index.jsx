import { useAuth, useClerk, useUser } from '@clerk/expo'
import Ionicons from '@expo/vector-icons/Ionicons'
import dayjs from "dayjs"
import { Redirect } from 'expo-router'
import { styled } from 'nativewind'
import { useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, UPCOMING_SUBSCRIPTIONS } from "../../assets/constants/data"
import "../../global.css"
import { formatCurrency } from "../../lib/utils"
import ListHeading from "../components/ListHeading"
import SubscriptionCart from "../components/SubscriptionCart"
import UpcomingSubscriptionCard from "../components/UpcomingSubscriptionCard"

export default function Index() {
  const SafeAreaView = styled(RNSafeAreaView)
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [expendedSubscriptionId, setExpendedSubscriptionId] = useState(null)

  if (!isLoaded) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#f07b62" />
      </View>
    )
  }
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }
  return (
    <SafeAreaView className='flex-1 bg-background'>
      {/* --- HEADER --- */}
      <View className='flex-row justify-between items-center px-6 py-4'>
        <View className='flex-row items-center gap-3'>
          <View className='w-12 h-12 rounded-full overflow-hidden justify-center items-center bg-card border border-border'>
            {user?.imageUrl ? (
              <Image source={{ uri: user.imageUrl }} className='w-full h-full' />
            ) : (
              <Ionicons name="person" size={24} color="#94a3b8" />
            )}
          </View>
          <View>
            <Text className="text-muted-foreground text-[10px] uppercase tracking-wider font-sans-medium">Welcome back</Text>
            <Text className="text-foreground text-lg font-sans-bold">
              {user?.firstName || user?.username || 'User'}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => signOut()}
          className="w-10 h-10 bg-card rounded-full justify-center items-center border border-border active:opacity-60"
        >
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
        </Pressable>
      </View>
      {/* --- BALANCE CARD --- */}
      <View className="px-6">
        <View className="mx-3 p-6 rounded-tl-2xl rounded-br-2xl bg-primary gap-2 shadow-sm">
          <Text className="text-white/80 text-sm font-sans-medium">Current Balance</Text>
          <View className='flex-row justify-between items-end mt-2'>
            <Text className="text-white text-4xl font-sans-bold">
              {formatCurrency(HOME_BALANCE.amount)}
            </Text>
            <View className="bg-white/20 px-3 py-1 rounded-full border border-white/10">
              <Text className="text-white text-[10px] font-sans-bold">
                NEXT: {dayjs(HOME_BALANCE.nextRenewalDate).format('MMM DD')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* --- UPCOMING SECTION --- */}
      <View className="mt-6">
        <ListHeading title='Upcoming' />
        <View className="mt-3">
          <FlatList
            data={UPCOMING_SUBSCRIPTIONS}
            renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
            ListEmptyComponent={
              <Text className="text-muted-foreground text-sm italic px-6 font-sans">No upcoming renewals</Text>
            }
          />
        </View>
      </View>

      {/* --- ALL SUBSCRIPTIONS SECTION --- */}
      <View className='flex-1 mt-4'>
        <ListHeading title='All Subscriptions' />
        <FlatList
          data={HOME_SUBSCRIPTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-3 px-6">
              <SubscriptionCart
                {...item}
                expanded={expendedSubscriptionId === item.id}
                onPress={() => setExpendedSubscriptionId(
                  expendedSubscriptionId === item.id ? null : item.id
                )}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 4 }}
          ListEmptyComponent={
            <Text className="text-muted-foreground text-sm italic px-6 font-sans">No subscriptions found</Text>
          }
        />
      </View>
    </SafeAreaView>
  )
}