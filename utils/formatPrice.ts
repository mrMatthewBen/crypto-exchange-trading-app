const formatPrice = (price: number | string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));
};

const formatTickerPrice = (price: number | string): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(Number(price));
};

const formatAmount = (number: number | string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  }).format(Number(number));
};

const formatUSD = (amount: number | string): string => {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount);
    if (isNaN(amount)) {
      return '$0.00';
    }
  }
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export {
  formatAmount,
  formatPrice,
  formatTickerPrice,
  formatUSD,
};
