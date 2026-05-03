import dayjs from "dayjs";
import { Image, View } from "react-native";
import { HOME_BALANCE, HOME_USER } from "../../assets/constants/data";
import { icons } from "../../assets/constants/icons";
import avatar from "../../assets/images/user.png";
import "../../global.css";
import { formatCurrency } from "../../lib/utils";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
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
      <View className='home-balance-card'>
        <ThemedText variant="title">Current Balance</ThemedText>
        <View className='home-balance-row'>
          <ThemedText variant="subtitle">{formatCurrency(HOME_BALANCE.amount)}</ThemedText>
          <ThemedText variant="subtitle">{dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}</ThemedText>
        </View>
      </View>
    </ThemedView>

  )
}

export default index