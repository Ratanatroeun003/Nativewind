import dayjs from 'dayjs';
export const formatCurrency = (amount, currencyCode = 'USD') => {
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return '$0.00';

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(numericAmount);
  } catch (error) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numericAmount);
  }
};
export const formatSubscriptionDateTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('MMM DD, YYYY');
};
