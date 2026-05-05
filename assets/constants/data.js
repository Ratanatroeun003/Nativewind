import { icons } from './icons';
export const tabs = [
  { name: 'index', title: 'Home', icon: icons.home },
  { name: 'subscriptions', title: 'Subscriptions', icon: icons.subscriptions },
  { name: 'insights', title: 'Insights', icon: icons.insights },
  { name: 'settings', title: 'Settings', icon: icons.settings },
];
export const HOME_USER = {
  name: 'RATANA',
  email: 'rnatt@gmail.com',
  avatar: 'https://randomuser.me/api/portraits/1.jpg',
  plan: 'Premium',
  joinDate: '2024-01-15',
};
export const HOME_BALANCE = {
  amount: 2489,
  nextRenewalDate: '2026-6-18T09:00:00.000Z',
};
export const UPCOMING_SUBSCRIPTIONS = [
  {
    id: 'spotify',
    name: 'Spotify',
    price: 9.99,
    currency: 'USD',
    icon: icons.spotify,
    dayLeft: 2,
  },
  {
    id: 'netflix',
    name: 'Netflix',
    price: 7.99,
    currency: 'USD',
    icon: icons.netflix,
    dayLeft: 5,
  },
  {
    id: 'claude',
    name: 'Claude',
    price: 9.99,
    currency: 'USD',
    icon: icons.claude,
    dayLeft: 2,
  },
];
export const HOME_SUBSCRIPTIONS = [
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe-Creative-Cloud',
    price: 54.99,
    icon: icons.adobe,
    currency: 'USD',
    plan: 'Team Plus',
    category: 'Design',
    paymentMethod: 'Visa ending in 1234',
    startDate: '2026-1-13',
    renewalDate: '2026-6-3',
    billing: 'monthly',
    category: 'Design',
    status: 'active',
  },
  {
    id: 'github',
    name: 'GitHub Pro',
    price: 4.0,
    currency: 'USD',
    icon: icons.github,
    plan: 'Team Plus',
    startDate: '2026-1-13',
    color: '#333333',
    renewalDate: '2026-05-15T09:00:00.000Z',
    billing: 'monthly',
    category: 'Developer',
    status: 'active',
    paymentMethod: 'Ac ending in 5678',
  },
];
