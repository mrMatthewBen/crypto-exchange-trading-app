import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { OrderType } from "@/constants/orderTypes";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

interface TradeInputFormProps {
  copiedPrice: string;
}

const orderOptions = [
  {
    label: "Limit Order",
    value: OrderType.LIMIT,
  },
  {
    label: "Market Order",
    value: OrderType.MARKET,
  },
];

const TradeInputForm = ({ copiedPrice }: TradeInputFormProps) => {
  const [price, setPrice] = useState<string>("0");
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [isBuyToggle, setIsBuyToggle] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<string>(OrderType.LIMIT);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResponse = await axios.get(
          "https://api.binance.com/api/v3/ticker/price",
          {
            params: { symbol: "BTCUSDT" },
          }
        );

        setPrice(parseFloat(priceResponse.data.price).toString());
      } catch (error) {
        console.error("error fetching price", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPrice(copiedPrice);
  }, [copiedPrice]);

  useEffect(() => {
    if (isUserInput) {
      calcTotalFromTotal(totalAmount);
    } else {
      calcTotalFromCrypto(cryptoAmount);
    }
  }, [copiedPrice, cryptoAmount, isUserInput]);

  const calcTotalFromCrypto = (amount: string) => {
    const cryptoAmountNum = parseFloat(cryptoAmount);
    const priceNum = parseFloat(price);
    const totalPrice = priceNum * cryptoAmountNum;

    if (isNaN(cryptoAmountNum)) {
      setTotalAmount("");
    } else {
      setIsUserInput(false);
      setTotalAmount(totalPrice.toString());
    }
  };

  const calcTotalFromTotal = (amount: string) => {
    const totalAmountNum = parseFloat(amount);
    const priceNum = parseFloat(price);
    const cryptoAmount = totalAmountNum / priceNum;
    setCryptoAmount(cryptoAmount.toString());

    if (isNaN(totalAmountNum)) {
      setCryptoAmount("");
      setIsUserInput(false);
    } else {
      setCryptoAmount(cryptoAmount.toString());
    }
  };

  const handleTotalChange = (text: string) => {
    setIsUserInput(true);
    setTotalAmount(text);
    calcTotalFromTotal(text);
  };

  console.log({isBuyToggle})

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={{ flexDirection: "row"}}>
          <TouchableWithoutFeedback onPress={() => setIsBuyToggle(true)}>
            <View style={[styles.buySellToggle, {backgroundColor: isBuyToggle ? "green" : "#333b3d"}]}>
              <Text style={styles.smallFont}>Buy</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setIsBuyToggle(false)}>
            <View style={[styles.buySellToggle, {backgroundColor: !isBuyToggle ? "red" : "#333b3d"}]}>
              <Text style={styles.smallFont}>Sell</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={[styles.priceInput, styles.marginBottomStyle]}>
            <Text style={[styles.smallFont, styles.marginBottomStyle]}>
              Price
            </Text>
            <TextInput
              style={styles.numberInputStyle}
              placeholder="0"
              placeholderTextColor="#dedcd7"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </KeyboardAvoidingView>

        <View style={[styles.amountTotalWrapper, styles.marginBottomStyle]}>
          <View style={styles.amountSection}>
            <Text style={[styles.smallFont, styles.marginBottomStyle]}>
              Amount (BTC)
            </Text>
            <TextInput
              style={styles.numberInputStyle}
              placeholder="0"
              placeholderTextColor="#dedcd7"
              keyboardType="numeric"
              value={cryptoAmount}
              onChangeText={setCryptoAmount}
            />
          </View>
          <View style={styles.amountSection}>
            <Text style={[styles.smallFont, styles.marginBottomStyle]}>
              Total (USD)
            </Text>
            <TextInput
              style={styles.numberInputStyle}
              placeholder="0"
              placeholderTextColor="#dedcd7"
              keyboardType="numeric"
              value={totalAmount}
              onChangeText={handleTotalChange}
            />
          </View>
        </View>
        <View>{/* TODO: create percentage picker */}</View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.smallFont}>Available</Text>
          <Text style={styles.smallFont}>USD 0</Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={[styles.buySellButton, {backgroundColor: isBuyToggle ? "green" : "red"}]}>
          <Text style={styles.mediumFont}>{`${isBuyToggle ? "Buy BTC" : "Sell BTC"}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "63%",
    height: "100%",
  },
  topContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "60%",
  },
  // buySellToggleWrapper: {
  //   flexDirection: "row",
  // },
  amountTotalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountSection: {
    flexDirection: "column",
    width: "48%",
  },
  priceInput: {
    flexDirection: "column",
  },
  smallFont: {
    fontSize: 12,
    color: "#fafafa",
  },
  mediumFont: {
    fontSize: 15,
    color: "#fafafa",
  },
  marginBottomStyle: {
    marginBottom: 7,
  },
  numberInputStyle: {
    borderRadius: 5,
    height: 40,
    width: "100%",
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    color: "white",

    padding: 10,
  },
  buySellToggle: {
    // TODO: need to change styling to dynamic
    width: 131,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buySellButton: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
  },
});

export default TradeInputForm;
