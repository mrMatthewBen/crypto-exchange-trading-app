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

export {
  formatAmount,
  formatPrice,
  formatTickerPrice,
};
