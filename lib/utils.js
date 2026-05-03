/**
 * បំប្លែងលេខទៅជាទម្រង់លុយដុល្លារ ($1,000.00)
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '$0.00';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * បង្រួមអត្ថបទឱ្យខ្លី (ឧទាហរណ៍៖ "បន្លែស្រស់ៗពីកសិដ្ឋាន..." បើវាវែងពេក)
 */
export const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * កំណត់ពណ៌តាមប្រភេទ Transaction (ឧទាហរណ៍៖ ចំណូលពណ៌បៃតង ចំណាយពណ៌ក្រហម)
 */
export const getTransactionColor = (type) => {
  return type === 'income' ? '#10b981' : '#ef4444';
};
