// @flow
import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import { actions } from "phenyl-todo-core";

const Login = connect(
  null,
  dispatch => ({
    handleLogin: (email, password) =>
      dispatch(actions.loginRequested(email, password)),
  })
)(props => {
  const { handleLogin } = props;
  return (
    // TODO: refactor: add type
    // TODO: refactor: devide by atomic
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={values => {
        // TODO: refactor: devide function
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          // TODO: use other npm library
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        handleLogin(values.email, values.password);
        setSubmitting(false);
      }}
      render={({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={text => setFieldValue("email", text)}
            value={values.email}
          />
          {touched.email && errors.email && <Text>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={text => setFieldValue("password", text)}
            value={values.password}
          />
          {touched.password &&
            errors.password && <Text>{errors.password}</Text>}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderWidth: 1,
  },
  submitButton: {
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {},
});
