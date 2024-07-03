import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

interface props {
    ticker: string
}

const TradingViewChart = ({ ticker }: props) => {
  const chartHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    </head>
    <body style="margin:0; padding:0; background-color:black;">
        <div id="tradingview_widget" style="width:100%; height:100vh;"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
            new TradingView.widget({
                "autosize": true,
                "symbol": "${ticker}",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#000000",
                "enable_publishing": false,
                "allow_symbol_change": false,
                "hide_top_toolbar": true,
                "hide_side_toolbar": false,
                "withdateranges": false,
                "hide_legend": true,
                "container_id": "tradingview_widget",
                "studies": [],
                "show_popup_button": false,
                "details": false,
                "hotlist": false,
                "calendar": false,
                "hideideas": true,
                "showbottomtoolbar": false,
                "hide_symbol_logo": true,
                "no_referral_id": true,
                "watchlist": [],
                "hide_marks_on_crosshair": true,
                "hide_top_toolbar": true,
                "hide_side_toolbar": true,
                "show_popup_button": false,
                "popup_width": "0",
                "popup_height": "0"
            });
        </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: chartHtml }}
        style={styles.webview}
        onError={(event) => console.error(event.nativeEvent)}
        onLoad={() => console.log("TradingView chart loaded successfully")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height / 3,
  },
  webview: {
    flex: 1,
  },
});

export default TradingViewChart;
