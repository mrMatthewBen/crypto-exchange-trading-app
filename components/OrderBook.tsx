import { formatAmount, formatPrice, formatTickerPrice } from "@/utils/formatPrice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface OrderBookProps {
  onCopyPrice: (price: string) => void;
}

const OrderBook = ({ onCopyPrice }: OrderBookProps) => {
  const [orderBook, setOrderBook] = useState<{
    bids: string[][];
    asks: string[][];
  }>({ bids: [], asks: [] });
  const [priceData, setPriceData] = useState<{
    price: string;
    color: string;
  }>({ price: "", color: "black" });
  const [priceChangeData, setPriceChangeData] = useState<number>(0);

  useEffect(() => {
    // const fetchInitialSnapshot = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://api.binance.com/api/v3/depth",
    //       {
    //         params: { symbol: "BTCUSDT", limit: 7 },
    //       }
    //     );
    //     setOrderBook({
    //       bids: response.data.bids.slice(0, 7),
    //       asks: response.data.asks.slice(0, 7),
    //     });
    //   } catch (error) {
    //     console.error("Error fetching initial snapshot:", error);
    //   }
    // };

    // fetchInitialSnapshot();

    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");

    ws.onopen = () => {
      console.log("Websocket connection opened");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //   setOrderBook((prevOrderBook) => {
      //     const updatedBids = [...prevOrderBook.bids, ...data.b].slice(0, 7);
      //     const updatedAsks = [...prevOrderBook.asks, ...data.a].slice(0, 7);
      //     return { bids: updatedBids, asks: updatedAsks };
      //   });
      setOrderBook({
        bids: data.b.slice(0, 7),
        asks: data.a.slice(0, 7).reverse(),
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    const priceWs = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    );
    priceWs.onopen = () => {
      console.log("Price WebSocket connection opened");
    };
    priceWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = data.c;
      const priceChange = parseFloat(data.p);
      //   TODO: still need to figure out price change color
      const priceColor = priceChange > priceChangeData ? "green" : "red";
      setPriceChangeData(priceChange);
      setPriceData({
        price: newPrice,
        color: priceColor,
      });
    };
    priceWs.onerror = (error) => {
      console.error("Price WebSocket error", error);
    };
    priceWs.onclose = () => {
      console.log("Price WebSocket connection closed");
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={styles.section}>
      <View style={styles.obPriceList}>
        {/* Ask section */}
        <View style={styles.priceItem}>
          <Text style={styles.smallFont}>{`Price\n(USD)`}</Text>
          <Text style={styles.smallFont}>{`Amount\n(BTC)`}</Text>
        </View>
        {orderBook.asks.map((ask, index) => (
          <View style={styles.priceItem} key={index}>
            <Text style={[styles.smallFont, styles.askPrice]}>
              {formatPrice(ask[0])}
            </Text>
            <Text style={styles.smallFont}>{formatAmount(ask[1])}</Text>
          </View>
        ))}
      </View>
      {/* Latest Price Section */}
      {/* <Text style={styles.smallFont}>{formatAmount(price)}</Text> */}
      <TouchableOpacity
        onPress={() => onCopyPrice(formatTickerPrice(priceData.price))}
      >
        <Text style={[styles.tickerPrice, { color: priceData.color }]}>
          {formatTickerPrice(priceData.price)}
        </Text>
      </TouchableOpacity>
      {/* Bid section */}
      <View style={styles.obPriceList}>
        {orderBook.bids.map((bid, index) => (
          <View style={styles.priceItem} key={index}>
            <Text style={[styles.smallFont, styles.bidPrice]}>
              {formatPrice(bid[0])}
            </Text>
            <Text style={styles.smallFont}>{formatAmount(bid[1])}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  section: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "33%",
  },
  obPriceList: {
    flexDirection: "column",
    borderColor: "white",
    borderWidth: 0.5,
    padding: 4,
  },
  smallFont: {
    fontSize: 12,
    color: "#fafafa",
  },
  askPrice: {
    color: "red",
  },
  bidPrice: {
    color: "green",
  },
  tickerPrice: {
    fontSize: 16,
    fontWeight: 600,
  },
});

export default OrderBook;
