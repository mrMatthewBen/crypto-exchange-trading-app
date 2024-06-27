import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

interface CryptoCardProps {
  name: string;
  nameShort: string;
  price: string;
  priceChange: number;
}

const CryptoCard = ({
  name,
  nameShort,
  price,
  priceChange,
}: CryptoCardProps) => {
  return (
    <TouchableOpacity className="flex-column">
      <View className="flex-row justify-between items-center p-2">
        <View className="flex-column justify-start">
          <Text>{name}</Text>
          <Text>{nameShort}</Text>
        </View>

        <View className="flex-column justify-end items-end">
          <Text>{price}</Text>
          <Text>{priceChange}</Text>
        </View>
      </View>
      <View className="border-t border-gray-300 my-2" />
    </TouchableOpacity>
  );
};

export default CryptoCard;
