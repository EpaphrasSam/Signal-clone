import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats", id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setChatMessages(snapshot.docs.map((doc) => doc.data()));
        }
      ),
    [db]
  );

  return (
    <TouchableOpacity>
      <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
        <Avatar
          rounded
          source={{
            uri:
              chatMessages[0]?.photoURL ||
              "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            {chatName}
          </ListItem.Title>
          {chatMessages.length !== 0 && (
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              {chatMessages[0]?.displayName}: {chatMessages[0]?.message}
            </ListItem.Subtitle>
          )}
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
