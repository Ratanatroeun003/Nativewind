// lib/utils.js
export const formatCurrency = (amount, currencyCode = 'USD') => {
  // បម្លែងទៅជាលេខ ប្រសិនបើវាជា String
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;

  // បើមិនមែនជាលេខ ឱ្យវាបង្ហាញ $0.00
  if (isNaN(numericAmount)) return '$0.00';

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode, // ប្រើ currency ដែលបញ្ជូនមក (USD, KHR, etc.)
    }).format(numericAmount);
  } catch (error) {
    // បើ currencyCode ខុស Standard ឱ្យវាប្រើ USD ជា default
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numericAmount);
  }
};
