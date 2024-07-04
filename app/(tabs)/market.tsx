import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CryptoCard from "@/components/CryptoCard";
import ProfileContext from "@/contexts/ProfileContext";
import { useRouter } from "expo-router";

const cryptosData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    ticker: "BTCUSDT",
    quote: {
      USD: {
        price: "61226",
        percent_change_24h: -0.20545205,
      },
    },
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    ticker: "ETHUSDT",
    quote: {
      USD: {
        price: "3400",
        percent_change_24h: 0.6808097,
      },
    },
  },
];

const Market = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("must use ProfileContext");
  }

  const { dispatch } = context;

  const router = useRouter();

  const handleOpenTradeScreen = (selectedTicker: string) => {
    dispatch({ type: "UPDATE_SELECTED_CRYPTO", payload: selectedTicker })
    router.push('/trade')
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.screenTitle}>Market</Text>
      <ScrollView>
        {cryptosData?.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            name={crypto.name}
            nameShort={crypto.symbol}
            price={crypto.quote.USD.price}
            ticker={crypto.ticker}
            priceChange={crypto.quote.USD.percent_change_24h}
            onClickCrypto={handleOpenTradeScreen}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  screenTitle: {
    padding: 10,
    fontSize: 20,
    color: "white",
  }
});

export default Market;
