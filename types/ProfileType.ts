type OpenOrderType = "buy" | "sell";

interface CryptoAsset {
  name: string;
  ticker: string;
  amount: number;
  total: number;
}

interface OpenOrder {
  ticker: string;
  price: number;
  amount: number;
  total: number;
  type: OpenOrderType;
}

interface CryptoState {
  selectedCrypto: string;
  cryptoAssets: CryptoAsset[];
  openOrders: OpenOrder[];
  usdBalance: number;
}

export { CryptoAsset, OpenOrder, CryptoState };
