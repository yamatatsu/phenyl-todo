import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "react-navigation";

const First = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text>first</Text>
      <Button title="To second" onPress={() => navigation.navigate("Second")} />
    </View>
  );
};
const Second = () => {
  return (
    <View style={styles.container}>
      <Text>Second</Text>
    </View>
  );
};

const RootNavigator = createStackNavigator({
  First: {
    screen: First,
  },
  Second: {
    screen: Second,
  },
});

const App = () => {
  return <RootNavigator />;
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
