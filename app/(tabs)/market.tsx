import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CryptoCard from '@/components/CryptoCard'

// TODO: mock data remove this, and change to api call
const cryptosData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    quote: {
      "USD": {
        price: "61226",
        percent_change_24h: -0.20545205,
      }
    }
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    quote: {
      "USD": {
        price: "3400",
        percent_change_24h: 0.6808097,
      }
    }
  },
  {
    id: 3,
    name: "Tether USDt",
    symbol: "USDT",
    quote: {
      "USD": {
        price: "0.9990920565344819",
        percent_change_24h: -0.0565876,
      }
    }
  },
]

const Market = () => {
  return (
    <SafeAreaView>
      <View className="p-2 bg-gray-200">
        <TextInput className="bg-white p-2 rounded border-gray-300"/>
      </View>
      <ScrollView>
        {cryptosData?.map((crypto) => (
          <CryptoCard 
            key={crypto.id}
            name={crypto.name}
            nameShort={crypto.symbol}
            price={crypto.quote.USD.price}
            priceChange={crypto.quote.USD.percent_change_24h}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Market