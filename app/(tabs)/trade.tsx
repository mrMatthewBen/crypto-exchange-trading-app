import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import TradeContainer from "@/components/TradeContainer";
import OpenOrderContainer from "@/components/OpenOrderContainer";
import CryptoPicker from "@/components/CryptoPicker";
import { useContext } from "react";
import ProfileContext from "@/contexts/ProfileContext";
import { CryptoAsset, OpenOrder } from "@/types/ProfileType";
import TradingViewChart from "@/components/TradingViewChart";

const Trade = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("must use ProfileContext");
  }

  const { state, dispatch } = context;

  const openOrderItems: OpenOrder[] = state.openOrders;
  const ticker = state.selectedCrypto;

  const handleTickerChange = (tickerChange: string) => {
    dispatch({ type: "UPDATE_SELECTED_CRYPTO", payload: tickerChange });
  };

  const handleFinishOrder = (orderSummary: CryptoAsset[]) => {
    dispatch({ type: "ADD_CRYPTO_ASSET", payload: orderSummary });
    dispatch({ type: "REMOVE_OPEN_ORDER" });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <CryptoPicker name={ticker} onTickerChange={handleTickerChange} />
        <ScrollView>
          <TradingViewChart ticker={ticker} />
          <TradeContainer />
          <OpenOrderContainer
            openOrderItems={openOrderItems}
            onFinishOrder={handleFinishOrder}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
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
