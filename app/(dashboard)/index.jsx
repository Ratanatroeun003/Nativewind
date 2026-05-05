import dayjs from "dayjs";
import { useState } from "react";
import { FlatList, Image, View } from "react-native";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "../../assets/constants/data";
import { icons } from "../../assets/constants/icons";
import avatar from "../../assets/images/user.png";
import "../../global.css";
import { formatCurrency } from "../../lib/utils";
import ListHeading from "../components/ListHeading";
import Spacer from '../components/Spacer';
import SubscriptionCart from "../components/SubscriptionCart";
import ThemedCard from "../components/ThemedCard";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import UpcomingSubscriptionCard from "../components/UpcomingSubscriptionCard";
const index = () => {
  const [expendedSubscriptionId, setExpendedSubscriptionId] = useState(null);
  return (
    <ThemedView safe>
      <View className='home-header'>
        <View className='home-user'>
          <Image source={avatar} className='home-avatar' />
          <ThemedText variant="title">{HOME_USER.name}</ThemedText>
        </View>
        <icons.add.library name={icons.add.name} size={35} color="#3b82f6" />
      </View>
      <Spacer />
      <ThemedCard className="mx-5">
        <ThemedText variant="title">Current Balance</ThemedText>
        <View className='home-balance-row'>
          <ThemedText variant="subtitle">{formatCurrency(HOME_BALANCE.amount)}</ThemedText>
          <ThemedText variant="subtitle">{dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}</ThemedText>
        </View>
      </ThemedCard>
      <Spacer />
      <View className='flex-1'>
        <ListHeading title='Upcoming' />
        <FlatList data={UPCOMING_SUBSCRIPTIONS}
          renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: 20, gap: 16 }}
          ListEmptyComponent={<ThemedText variant="caption">No upcoming renewals yet</ThemedText>}
        />
      </View>
      <Spacer />
      <View>
        <ListHeading title='All Subscription' />
        <FlatList
          data={HOME_SUBSCRIPTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionCart
              {...item}
              expanded={expendedSubscriptionId === item.id}
              onPress={() => setExpendedSubscriptionId(
                expendedSubscriptionId === item.id ? null : item.id
              )}
            />
          )}
        // លុប SubscriptionCart ដែលនៅខាងក្រៅ FlatList ចេញ ព្រោះវាស្ទួន
        />
      </View>
    </ThemedView>

  )
}

export default index