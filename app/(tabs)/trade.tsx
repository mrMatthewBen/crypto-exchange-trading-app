import CandleChart from "@/components/CandleChart";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import tradeData from "@/mock-data/bitcoin/data.json";
import { Candle } from "@/components/Candle";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useValues } from "react-native-redash";
import { Line } from "react-native-svg";
import TradeContainer from "@/components/TradeContainer";
import OpenOrderContainer from "@/components/OpenOrderContainer";

const Trade = () => {
  // const [x, y, state] = useValues(0, 0, State.UNDETERMINED);
  // const gestureHandler = onGestureEvent({x, y, state})

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      // Handle gesture end if needed
    },
  });

  const opacity = useSharedValue(0);

  const animatedLineXStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
      ...StyleSheet.absoluteFillObject,
    };
  });

  const animatedLineYStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
      ...StyleSheet.absoluteFillObject,
    };
  });

  const { width: size } = Dimensions.get("window");
  const candles = tradeData.slice(0, 20);
  const caliber = size / candles.length;
  const getDomain = (rows: Candle[]): [number, number] => {
    const values = rows.map(({ high, low }) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };
  const domain = getDomain(candles);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {/* <Text>Trade</Text>
          <View>
            <CandleChart {...{ candles, domain }} />
            <PanGestureHandler
              onGestureEvent={gestureHandler}
              onHandlerStateChange={gestureHandler}
            >
              <Animated.View style={StyleSheet.absoluteFill}>
                <Animated.View style={animatedLineXStyle}>
                  <Line x={0} y={size} />
                </Animated.View>
                <Animated.View style={animatedLineYStyle}>
                  <Line x={size} y={0} />
                </Animated.View>
              </Animated.View>
            </PanGestureHandler>
          </View> */}
          {/* Trade Input Section */}
          <TradeContainer />
          <OpenOrderContainer />
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
