import { createContext, useContext, useState } from 'react';
import { HOME_SUBSCRIPTIONS } from '../assets/constants/data';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(HOME_SUBSCRIPTIONS);

  const addSubscription = (subscription) => {
    setSubscriptions((prev) => [subscription, ...prev]);
  };

  const deleteSubscription = (subscriptionId) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== subscriptionId));
  };

  return (
    <SubscriptionContext.Provider
      value={{ subscriptions, addSubscription, deleteSubscription }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      'useSubscriptions must be used within SubscriptionProvider',
    );
  }
  return context;
};
