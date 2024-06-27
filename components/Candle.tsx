import { View, Text } from "react-native";
import { ScaleLinear } from "d3-scale";
import { Line, Rect } from "react-native-svg";

export interface Candle {
  date: string;
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandleProps {
  candle: Candle;
  caliber: number;
  scaleY: ScaleLinear<number, number>;
  scaleBody: ScaleLinear<number, number>;
  index: number;
}

const Candle = ({
  candle: { low, high, open, close },
  caliber,
  scaleY,
  scaleBody,
  index,
}: CandleProps) => {
  const x = caliber * index + 0.5 * caliber;
  const color = open > close ? "#4AFA9A" : "E33F64";
  return (
    <>
      <Line
        x1={x}
        x2={x}
        y1={scaleY(high)}
        y2={scaleY(low)}
        stroke={color}
        strokeWidth={1}
      />
      <Rect
        x={0}
        y={scaleY(Math.max(open, close))}
        width={caliber}
        height={scaleBody(Math.max(open, close) - Math.min(open, close))}
      />
    </>
  );
};

export default Candle;
