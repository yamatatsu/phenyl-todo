// @flow
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

const TodoList = connect(
  null,
  null
)(props => {
  return (
    <View style={styles.container}>
      <Text>TodoList</Text>
    </View>
  );
});

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
