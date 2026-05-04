import dayjs from "dayjs";
import { FlatList, Image, View } from "react-native";
import { HOME_BALANCE, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "../../assets/constants/data";
import { icons } from "../../assets/constants/icons";
import avatar from "../../assets/images/user.png";
import "../../global.css";
import { formatCurrency } from "../../lib/utils";
import ListHeading from "../components/ListHeading";
import Spacer from '../components/Spacer';
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import UpcomingSubscriptionCard from "../components/UpcomingSubscriptionCard";
const index = () => {
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
      <View className='home-balance-card'>
        <ThemedText variant="title">Current Balance</ThemedText>
        <View className='home-balance-row'>
          <ThemedText variant="subtitle">{formatCurrency(HOME_BALANCE.amount)}</ThemedText>
          <ThemedText variant="subtitle">{dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}</ThemedText>
        </View>
      </View>
      <Spacer />
      <View>
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
      </View>
    </ThemedView>

  )
}

export default index