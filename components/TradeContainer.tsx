import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import OrderBook from "./OrderBook";
import TradeInputForm from "./TradeInputForm";

const TradeContainer = () => {
  const [copiedPrice, setCopiedPrice] = useState<string>('0')

  // TODO: already copy the price but missing new total calculation
  const handleCopyPrice = (price: string) => {
    setCopiedPrice(price)
  }

  return (
    <View style={styles.container}>
      <TradeInputForm copiedPrice={copiedPrice} />
      <OrderBook onCopyPrice={handleCopyPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 450,
  },
});

export default TradeContainer;
