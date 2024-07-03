import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import OpenOrderItem from "./OpenOrderItem";
import { CryptoAsset, OpenOrder } from "@/types/ProfileType";
import { formatNameFromTicker } from "@/utils/formatText";

interface props {
  openOrderItems: OpenOrder[];
  onFinishOrder: (orderSummary: CryptoAsset[]) => void;
}

const OpenOrderContainer = ({ openOrderItems, onFinishOrder }: props) => {

  const handleFinishOrder = () => {
    const tickerMap: Record<
      string,
      CryptoAsset
    > = {};

    openOrderItems.forEach((purchase) => {
      const ticker = purchase.ticker;
      const amount = parseFloat(purchase.amount.toString());

      if (!tickerMap[ticker]) {
        tickerMap[ticker] = {
          name: formatNameFromTicker(ticker),
          ticker,
          amount,
          total: amount,
        };
      }

      tickerMap[ticker].total += amount;
      tickerMap[ticker].amount += amount;
    });

    const result: CryptoAsset[] = [];

    for (const tick in tickerMap) {
      const { name, ticker, amount, total } = tickerMap[tick];
      result.push({
        name,
        ticker,
        amount,
        total,
      });
    }

    onFinishOrder(result)
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Open Orders</Text>
        {/* Because no fill order, this button will finish the order as if the order was filled */}
        <TouchableWithoutFeedback onPress={handleFinishOrder}>
          <Text style={{ color: "white" }}>Finish Order</Text>
        </TouchableWithoutFeedback>
      </View>
      {openOrderItems.map((item, index) => (
        <OpenOrderItem
          key={index}
          ticker={item.ticker}
          price={item.price}
          amount={item.amount}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    paddingHorizontal: 8,
    color: "white",
  },
});

export default OpenOrderContainer;
