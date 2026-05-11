import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOME_SUBSCRIPTIONS } from '../assets/constants/data';

const STORAGE_KEY = 'subscriptions';

export const loadSubscriptions = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // First time - use default data
    await saveSubscriptions(HOME_SUBSCRIPTIONS);
    return HOME_SUBSCRIPTIONS;
  } catch (error) {
    console.error('Error loading subscriptions:', error);
    return HOME_SUBSCRIPTIONS;
  }
};

export const saveSubscriptions = async (subscriptions) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  } catch (error) {
    console.error('Error saving subscriptions:', error);
  }
};

export const addSubscription = async (subscription) => {
  try {
    const current = await loadSubscriptions();
    const updated = [subscription, ...current];
    await saveSubscriptions(updated);
    return updated;
  } catch (error) {
    console.error('Error adding subscription:', error);
  }
};

export const deleteSubscription = async (subscriptionId) => {
  try {
    const current = await loadSubscriptions();
    const updated = current.filter((sub) => sub.id !== subscriptionId);
    await saveSubscriptions(updated);
    return updated;
  } catch (error) {
    console.error('Error deleting subscription:', error);
  }
};
