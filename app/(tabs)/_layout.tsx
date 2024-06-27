import { View, Text, ImageSourcePropType, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { icons } from "../../constants"

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-semibold" : "font-normal"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
    return (
      <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#F5F5F5",
            tabBarInactiveTintColor: "#C9C8C7",
            tabBarStyle: {
              backgroundColor: "#161622",
              borderTopWidth: 1,
              borderTopColor: "#232533",
              height: 84,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="discover"
            options={{
              title: "Discover",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.discover}
                  color={color}
                  name="Discover"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="trade"
            options={{
              title: "Trade",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.discover}
                  color={color}
                  name="Trade"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="market"
            options={{
              title: "Market",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.chart}
                  color={color}
                  name="Market"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="wallet"
            options={{
              title: "Wallet",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.wallet}
                  color={color}
                  name="Wallet"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </>
    );
  };

export default TabsLayout;
