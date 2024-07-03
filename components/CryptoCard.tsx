import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface CryptoCardProps {
  name: string;
  nameShort: string;
  price: string;
  priceChange: number;
  ticker: string;
  onClickCrypto: (selectedTricker: string) => void;
}

const CryptoCard = ({
  name,
  nameShort,
  price,
  priceChange,
  ticker,
  onClickCrypto,
}: CryptoCardProps) => {
  return (
    <TouchableOpacity style={style.container} onPress={() => onClickCrypto(ticker)}>
      <View style={style.sectionContainer}>
        <View style={style.nameSection}>
          <Text style={style.whiteText}>{name}</Text>
          <Text style={style.whiteText}>{nameShort}</Text>
        </View>

        <View style={style.priceSection}>
          <Text style={style.whiteText}>{price}</Text>
          <Text style={style.whiteText}>{priceChange}</Text>
        </View>
      </View>
      {/* <View className="border-t border-gray-300 my-2" /> */}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#0f0f0f",
    padding: 10,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
  },
  nameSection: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  priceSection: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  whiteText: {
    color: "white",
  }
})

export default CryptoCard;
