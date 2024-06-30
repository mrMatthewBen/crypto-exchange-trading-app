import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Svg } from "react-native-svg";
import Candle, { Candle as CandleModel } from "./Candle";
import { scaleLinear } from "d3-scale";

export const { width: size } = Dimensions.get("window");

interface CandleChartProps {
  candles: CandleModel[];
  domain: [number, number];
}

const CandleChart = ({ candles, domain }: CandleChartProps) => {
    const width = size / candles.length;
    const scaleY = scaleLinear().domain(domain).range([size, 0]);
    const scaleBody = scaleLinear()
      .domain([0, Math.max(...domain) - Math.min(...domain)])
      .range([0, size]);
    return (
      <Svg width={size} height={size} style={{ flex: 1 }}>
        {candles.map((candle, index) => (
          <Candle
            key={candle.date}
            {...{ candle, index, width, scaleY, scaleBody }}
          />
        ))}
      </Svg>
    );
};

export default CandleChart;
