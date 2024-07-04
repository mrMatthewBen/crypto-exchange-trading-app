import {
  formatAmount,
  formatPrice,
  formatTickerPrice,
} from "@/utils/formatPrice";
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileContext from "@/contexts/ProfileContext";

interface OrderBookProps {
  onCopyPrice: (price: string) => void;
}

const OrderBook = ({ onCopyPrice }: OrderBookProps) => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("must use ProfileContext");
  }

  const { state } = context;

  const selectedTicker = state.selectedCrypto.toLowerCase();
  const emptyOrderItems = Array.from({ length: 7 }, () => ["0", "0"])

  const [orderBook, setOrderBook] = useState<{
    bids: string[][];
    asks: string[][];
  }>({ bids: emptyOrderItems, asks: emptyOrderItems });
  const [priceData, setPriceData] = useState<{
    price: string;
    color: string;
  }>({ price: "", color: "black" });

  const orderBookWsRef = useRef<WebSocket | null>(null);
  const priceWsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (orderBookWsRef.current) {
      orderBookWsRef.current.close();
    }
    if (priceWsRef.current) {
      priceWsRef.current.close();
    }
    const orderBookWs = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedTicker}@depth10`
    );
    const priceWs = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedTicker}@ticker`
    );

    orderBookWs.onopen = () => {
      console.log("Order book Websocket connection opened");
      setOrderBook({
        bids: emptyOrderItems,
        asks: emptyOrderItems
      });
    };

    orderBookWs.onmessage = (event) => {
      const orderBook = JSON.parse(event.data);

      // Filter to get only the first 7 levels
      const bids = orderBook.bids.slice(0, 7);
      const asks = orderBook.asks.slice(0, 7);
      setOrderBook({
        bids,
        asks,
      })
    };

    orderBookWs.onerror = (error) => {
      console.error("Order book WebSocket error", error);
    };

    orderBookWs.onclose = () => {
      console.log("Order book WebSocket connection closed");
    };

    priceWs.onopen = () => {
      console.log("Price WebSocket connection opened");
      setPriceData({
        price: "0",
        color: "green",
      })
    };
    priceWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = data.c;
      setPriceData({
        price: newPrice,
        color: "green",
      });
    };
    priceWs.onerror = (error) => {
      console.error("Price WebSocket error", error);
    };
    priceWs.onclose = () => {
      console.log("Price WebSocket connection closed");
    };

    orderBookWsRef.current = orderBookWs;
    priceWsRef.current = priceWs;

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (orderBookWsRef.current) {
        orderBookWsRef.current.close();
      }
      if (priceWsRef.current) {
        priceWsRef.current.close();
      }
    };
  }, [selectedTicker]);

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
