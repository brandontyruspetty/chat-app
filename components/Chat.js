import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export default function Chat({ navigation, route, db, isConnected, storage }) {
  const [messages, setMessages] = useState([]);

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
   }
  
  let unsubMessages;

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
    if (isConnected === true) {

      if (unsubMessages) unsubMessages();
      unsubMessages = null;

    //listen for updates on the messages collection 
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
     unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
         newMessages.push({
          id: doc.id,
          text: doc.text,
          image: doc.image, 
          location: doc.location, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
         })
      });
      cacheMessages(newMessages);
      setMessages(newMessages);
    })
  } else loadCachedMessages();

    //clean up listener
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected, navigation, route.params.name, route.params.color, db]);
  

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("chat_app") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (messagesToCache) => {
    try {
        await AsyncStorage.setItem("chat_app", JSON.stringify(messagesToCache));
    } catch (error) {
        console.log(error.message);
    };
}
  
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
          renderInputToolbar={renderInputToolbar}
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

