import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import { createStore } from "phenyl-todo-core";
import NavigationService from "./navigation-service";

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

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
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
