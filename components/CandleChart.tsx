import { View, Text } from "react-native";
import React from "react";
import Svg from "react-native-svg";
import Candle, { Candle as CandleModel } from "./Candle";
import {scaleLinear} from 'd3-scale'

interface CandleChartProps {
  candles: CandleModel[];
  caliber: number;
  size: number;
//   domain: [number, number];
  domain: number[];
}

const CandleChart = ({ candles, caliber, size, domain }: CandleChartProps) => {
    const scaleY = scaleLinear().domain(domain).range([size, 0])
    const scaleBody = scaleLinear().domain([0, domain[1] - domain[0]]).range([0, size])
  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle key={index} {...{ candle, caliber, scaleY, scaleBody, index }} />
      ))}
    </Svg>
  );
};

export default CandleChart;
