import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { register } = useAuth();

  const handleRegister = () => {
    register(name, email, password, imageUrl, navigation);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50, textAlign: "center" }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        onPress={handleRegister}
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
