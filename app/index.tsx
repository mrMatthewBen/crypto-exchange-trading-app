import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  // const { loading, isLogged } = useGlobalContext();
  const loading = false;
  const isLogged = true;

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView>
      <View>
        <Text>Edit app/index.tsx to.</Text>

      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
