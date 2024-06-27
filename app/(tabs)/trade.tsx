import CandleChart from "@/components/CandleChart";
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import tradeData from "@/mock-data/bitcoin/data.json"

const Trade = () => {

  const { width: size } = Dimensions.get("window")
  const candles = tradeData.slice(0, 20)
  const caliber = size / candles.length
  const values = candles.map(candle => [candle.low, candle.high]).flat()
  const domain = [Math.min(...values), Math.max(...values)]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Trade</Text>
      <View style={styles.container}>
        {/* <WebView
          source={{
            uri: "https://www.tradingview.com/chart/?symbol=BITSTAMP:BTCUSD",
          }}
          style={styles.webview}
          allowFileAccessFromFileURLs={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          originWhitelist={["*"]}
          onShouldStartLoadWithRequest={() => true}
        /> */}
      </View>
      <CandleChart {...{candles, size, caliber, domain}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Trade;
