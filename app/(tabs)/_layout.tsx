import { View, Text, ImageSourcePropType, Image, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { ProfileProvider } from "@/contexts/ProfileContext";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  const conditionalStyle = getStyle(focused)
  return (
    <View style={style.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={style.imageIcon}
      />
      <Text
        style={[{ color: color }, conditionalStyle.imageIconText]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <ProfileProvider>
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
      <StatusBar backgroundColor="#161622" style="light" />
    </ProfileProvider>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  imageIcon: {
    width: 22,
    height: 22,
    marginBottom: 4,
  }
})

const getStyle = (focused: boolean) => StyleSheet.create({
  imageIconText: {
    opacity: focused ? 1 : 0.7
  }
})

export default TabsLayout;
