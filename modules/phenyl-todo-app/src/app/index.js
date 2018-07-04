// @flow
import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { createStore } from "phenyl-todo-core";
import NavigationService from "./navigation-service";
import navigationMiddleware from "./navigation-middleware";
import Login from "../pages/login.container.js";
import TodoList from "../pages/todo-list";

const RootNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  TodoList: {
    screen: TodoList,
  },
});

const store = createStore(navigationMiddleware);

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
