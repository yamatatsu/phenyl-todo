// @flow
import { connect } from "react-redux";
import { actions } from "phenyl-todo-core";
import Component from "./login";

const Login = connect(
  null,
  dispatch => ({
    handleLogin: (email, password) =>
      dispatch(actions.loginRequested(email, password)),
  })
)(Component);

export default Login;
