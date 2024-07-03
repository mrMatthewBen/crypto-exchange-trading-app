import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ProfileContext from "@/contexts/ProfileContext";
import { formatUSD } from "@/utils/formatPrice";
import { formatCryptoNameOnly } from "@/utils/formatText";

interface TradeInputFormProps {
  copiedPrice: string;
}

const TradeInputForm = ({ copiedPrice }: TradeInputFormProps) => {
  const [price, setPrice] = useState<string>("0");
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [isBuyToggle, setIsBuyToggle] = useState<boolean>(true);

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("must use ProfileContext");
  }

  const { state, dispatch } = context;

  const availableUsdAmount =
    state.cryptoAssets?.find((asset) => asset.ticker === "USDT")?.total || 0;
  const ticker = state.selectedCrypto;
  const cryptoName = formatCryptoNameOnly(ticker);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResponse = await axios.get(
          "https://api.binance.com/api/v3/ticker/price",
          {
            params: { symbol: ticker },
          }
        );

        setPrice(parseFloat(priceResponse.data.price).toString());
      } catch (error) {
        console.error("error fetching price", error);
      }
    };

    fetchData();
  }, [ticker]);

  useEffect(() => {
    setPrice(copiedPrice);

    const newTotalAmountCopied = parseFloat(copiedPrice) * parseFloat(cryptoAmount)
    setTotalAmount(newTotalAmountCopied.toString())
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

  const showInsufficientAlert = () => {
    Alert.alert(
      "Insufficient Amount",
      "You do not have enough funds to complete this transaction",
      [
        {
          text: "OK",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const showAmountNotInputtedAlert = () => {
    Alert.alert(
      "Amount Not Inputted",
      "Make sure to input the amount",
      [
        {
          text: "OK",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleCryptoBuySell = () => {
    if (isBuyToggle) {
      const totalAmountNum = parseFloat(totalAmount)
      if (totalAmountNum > availableUsdAmount) showInsufficientAlert();
      if (totalAmountNum === 0 || totalAmount === "") showAmountNotInputtedAlert();
      else {
        const updatedUsdtAmount = availableUsdAmount - parseFloat(totalAmount);
        dispatch({
          type: "ADD_OPEN_ORDER",
          payload: {
            ticker,
            price,
            amount: cryptoAmount,
          },
        });
        dispatch({
          type: "UPDATE_USDT_AMOUNT",
          payload: {
            name: "USDT Tether",
            ticker: "USDT",
            amount: updatedUsdtAmount,
            total: updatedUsdtAmount,
          },
        });
        setTotalAmount("");
        setCryptoAmount("");
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={() => setIsBuyToggle(true)}>
            <View
              style={[
                styles.buySellToggle,
                { backgroundColor: isBuyToggle ? "green" : "#333b3d" },
              ]}
            >
              <Text style={styles.smallFont}>Buy</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setIsBuyToggle(false)}>
            <View
              style={[
                styles.buySellToggle,
                { backgroundColor: !isBuyToggle ? "red" : "#333b3d" },
              ]}
            >
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
          <Text style={styles.smallFont}>{formatUSD(availableUsdAmount)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleCryptoBuySell}>
        <View
          style={[
            styles.buySellButton,
            { backgroundColor: isBuyToggle ? "green" : "red" },
          ]}
        >
          <Text style={styles.mediumFont}>{`${
            isBuyToggle ? `Buy ${cryptoName}` : `Sell ${cryptoName}`
          }`}</Text>
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
