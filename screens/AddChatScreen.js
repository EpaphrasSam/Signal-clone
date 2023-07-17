import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
    });
  }, []);

  const createChat = async () => {
    try {
      await addDoc(collection(db, "chats"), {
        chatName: input,
      });
      setInput("");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Error adding Chat");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={setInput}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={createChat} title="Create new chat" />
    </SafeAreaView>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
