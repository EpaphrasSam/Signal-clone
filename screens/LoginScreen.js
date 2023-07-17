import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import useAuth from "../hooks/useAuth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.replace("Home");
    }
  }, [navigation, user]);

  const handleSignIn = () => {
    signIn(email, password, navigation);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
        }}
        style={{ width: 120, height: 120, borderRadius: 20 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        containerStyle={styles.button}
        onPress={handleSignIn}
        title="Login"
      />
      <Button
        containerStyle={styles.button}
        type="outline"
        onPress={() => navigation.navigate("Register")}
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
