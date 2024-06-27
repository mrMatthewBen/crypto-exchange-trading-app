import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  // const { loading, isLogged } = useGlobalContext();
  const loading = false;
  const isLogged = true;

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <View
      className="w-full justify-center items-center h-full"
    >
      <Text>Edit app/index.tsx to.</Text>

    </View>
  );
}
