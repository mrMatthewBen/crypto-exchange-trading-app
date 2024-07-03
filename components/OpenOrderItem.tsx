import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { OpenOrder } from "@/types/ProfileType";

const OpenOrderItem = ({ ticker, price, amount }: OpenOrder) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={[styles.whiteText, styles.bigText]}>{ticker}</Text>
        <View style={styles.valueSection}>
          <Text style={[styles.grayText, styles.smallText]}>Amount</Text>
          <Text style={[styles.whiteText, styles.smallText]}>{`0 / ${amount}`}</Text>
        </View>
        <View style={styles.valueSection}>
          <Text style={[styles.grayText, styles.smallText]}>Price</Text>
          <Text style={[styles.whiteText, styles.smallText]}>{price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10,
  },
  innerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  whiteText: {
    color: "white",
  },
  grayText: {
    color: "gray",
  },
  bigText: {
    fontSize: 14,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 11.5,
  },
  valueSection: {
    width: "30%",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OpenOrderItem;
