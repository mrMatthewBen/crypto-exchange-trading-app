import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CryptoAsset } from "@/types/ProfileType";

const CryptoAssetItem = ({ ticker, name, amount, total }: CryptoAsset) => {
  return (
    <View style={style.container}>
      <View style={style.cryptoNameSection}>
        <Text style={[style.whiteText, style.smallText]}>{ticker}</Text>
        <Text style={[style.grayText, style.smallText]}>{name}</Text>
      </View>
      <Text style={[style.whiteText, style.smallText]}>{amount}</Text>
      <Text style={[style.whiteText, style.smallText]}>{total}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  cryptoNameSection: {
    flexDirection: "column",
  },
  whiteText: {
    color: "#fafafa",
  },
  grayText: {
    color: "gray",
  },
  smallText: {
    fontSize: 12,
  },
});

export default CryptoAssetItem;
