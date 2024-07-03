import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import ProfileContext from "@/contexts/ProfileContext";
import { formatUSD } from "@/utils/formatPrice";
import CryptoAssetItem from "@/components/CryptoAssetItem";

const Wallet = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("must use ProfileContext");
  }

  const { state } = context;
  
  const cryptoAssets = state.cryptoAssets;

  const walletValueNum = cryptoAssets?.map((asset) => asset.total).reduce((total, num) => total + num, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
      <View style={styles.walletAmountWrapper}>
        <Text style={[styles.whiteText, styles.smallFont]}>Wallet Value</Text>
        <Text style={[styles.whiteText, styles.bigFont]}>
          {formatUSD(walletValueNum)}
        </Text>
      </View>
      <View>
        <Text>Crypto</Text>
        <View style={styles.cryptoAssetsSection}>
          {cryptoAssets?.map((asset, index) => (
            <CryptoAssetItem
              key={index}
              ticker={asset.ticker}
              name={asset.name}
              amount={asset.amount}
              total={asset.total}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: "#fafafa",
  },
  bigFont: {
    fontSize: 23,
    fontWeight: 900,
  },
  smallFont: {
    fontSize: 12,
  },
  walletAmountWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 85,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  cryptoAssetsSection: {
    flexDirection: "column",
  },
});

export default Wallet;
