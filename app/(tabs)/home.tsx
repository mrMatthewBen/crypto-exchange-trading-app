import { Text, SafeAreaView, StyleSheet } from 'react-native'

const Home = () => {
  return (
    <SafeAreaView style={style.container}>
      <Text style={{ color: "white" }}>Home screen</Text>
      <Text style={{ color: "white" }}>Please go to trade screen to trade</Text>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Home