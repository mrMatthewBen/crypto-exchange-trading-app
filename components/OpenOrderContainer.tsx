import { View, Text, StyleSheet } from "react-native";
import React from "react";
import OpenOrderItem from "./OpenOrderItem";

const OpenOrderContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Open Orders</Text>
      <OpenOrderItem />
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
