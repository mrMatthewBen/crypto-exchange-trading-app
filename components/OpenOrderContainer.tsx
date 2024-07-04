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

    const sellDetected = openOrderItems.find(item => item.type === "sell")

    if (!!sellDetected) {
      tickerMap["USDT"] = {
        name: "USDT Tether",
        ticker: "USDT",
        amount: 0,
        total: 0,
      }
    }

    openOrderItems.forEach((purchase) => {
      const ticker = purchase.ticker;
      const amount = parseFloat(purchase.amount.toString());
      const total = parseFloat(purchase.total.toString());

      if (!tickerMap[ticker]) {
        if (purchase.type === "sell") {
          tickerMap["USDT"].total += total;
          tickerMap["USDT"].amount += total;
        } else {
          tickerMap[ticker] = {
            name: formatNameFromTicker(ticker),
            ticker,
            amount,
            total,
          };
        }

      } else {
        if (purchase.type === "buy") {
          tickerMap[ticker].total += total;
          tickerMap[ticker].amount += amount;
        } else {
          tickerMap["USDT"].total += total;
          tickerMap["USDT"].amount += total;
        }
      }
    });

    const orderSummary: CryptoAsset[] = [];

    for (const tick in tickerMap) {
      const { name, ticker, amount, total } = tickerMap[tick];
      orderSummary.push({
        name,
        ticker,
        amount,
        total,
      });
    }

    onFinishOrder(orderSummary)
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
    borderTopColor: "gray",
    borderTopWidth: 3,
    marginTop: 20,
    minHeight: 300,
    paddingTop: 15,
  },
  title: {
    paddingHorizontal: 8,
    color: "white",
  },
});

export default OpenOrderContainer;
