const formatNameFromTicker = (ticker: string) => {
  const quoteCurrency = "USDT";
  const splitIndex = ticker.indexOf(quoteCurrency);

  if (splitIndex === -1) {
    throw new Error(`Ticker string does not contain '${quoteCurrency}'.`);
  }

  const baseCurrency = ticker.slice(0, splitIndex);

  return `${baseCurrency} / ${quoteCurrency}`;
};

const formatCryptoNameOnly = (ticker: string) => {
  const quoteCurrency = "USDT";
  const splitIndex = ticker.indexOf(quoteCurrency);

  if (splitIndex === -1) {
    throw new Error(`Ticker string does not contain '${quoteCurrency}'.`);
  }

  const baseCurrency = ticker.slice(0, splitIndex);

  return baseCurrency;
}

export { formatNameFromTicker, formatCryptoNameOnly };
