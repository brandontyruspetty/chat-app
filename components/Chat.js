import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

//adding renderBubble prop to GiftedChat component
const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#000"
      },
      left: {
        backgroundColor: "#FFF"
      }
    }}
  /> 
}

//define Chat component as default of the module
export default function Chat({ navigation, route, db }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //get name and color values from navigation prop
    let name = route.params.name;
    let color = route.params.color;

    //set header background color to color value
    navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
    });

    //listen for updates on the messages collection 
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        const fetchedMessage = doc.data();
        fetchedMessage.createdAt = new Date(
          fetchedMessage.createdAt.seconds * 1000
        );
        fetchedMessages.push(fetchedMessage);
      });
      setMessages(fetchedMessages);
    });

    //clean up listener
    return () => {
      unsubscribe();
    };
  }, [navigation, route.params.name, route.params.color, db]);
  
  //function onSend() adds new message to "messages" collection in Firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), {
      ...newMessages[0],
      createdAt: new Date(),
      user: {
        _id: route.params.userID,
        name: route.params.name,
      },
    });
  };

    return (
      <View style={[styles.container, {backgroundColor: route.params.color }]}
      >
       <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          onSend={onSend}
          user={{
            _id: route.params.userID,
            name: route.params.name,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
        <Button title="Leave Chat" onPress={() => navigation.navigate("Start")} />
    </View>
   )
 };
      
const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

