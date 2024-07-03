import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-native-modal";

interface props {
  name: string;
  onTickerChange: (tickerChange: string) => void;
}

const modalCryptolistMock = [
  {
    symbol: "BTCUSDT",
  },
  {
    symbol: "ETHUSDT",
  },
  {
    symbol: "BNBUSDT",
  },
];

const CryptoPicker = ({ name, onTickerChange }: props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectCrypto = (ticker: string) => {
    onTickerChange(ticker);
    toggleModal();
  };

  return (
    <View style={style.container}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <Text style={{ color: "white" }}>{name}</Text>
      </TouchableWithoutFeedback>
      <Modal
        style={style.bottomModalView}
        isVisible={isModalVisible}
        backdropOpacity={0}
        onBackdropPress={toggleModal}
      >
        <View style={style.modalContent}>
          {modalCryptolistMock?.map((crypto, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleSelectCrypto(crypto.symbol)}
            >
              <Text>{crypto.symbol}</Text>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  bottomModalView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: "80%",
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default CryptoPicker;
