import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CryptoCard from "@/components/CryptoCard";
import ProfileContext from "@/contexts/ProfileContext";
import { useRouter } from "expo-router";

// TODO: mock data remove this, and change to api call
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
  // {
  //   id: 3,
  //   name: "Tether USDt",
  //   symbol: "USDT",
  //   quote: {
  //     USD: {
  //       price: "0.9990920565344819",
  //       percent_change_24h: -0.0565876,
  //     },
  //   },
  // },
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
      <View style={style.textInputContainer}>
        <TextInput style={style.textInput} />
      </View>
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
  textInputContainer: {
    padding: 10,
    backgroundColor: "gray",
  },
  textInput: {
    padding: 2,
    borderRadius: 3,
    borderColor: "gray",
    backgroundColor: "white",
  },
});

export default Market;
