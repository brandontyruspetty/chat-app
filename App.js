//import styling from react-native
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import screens you want to navigate
import Start from './components/Start';
import Chat from './components/Chat';
//import 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//create navigator
const Stack = createNativeStackNavigator();


//initializing connection to Firestore
import { initializeApp } from "firebase/app";

//App's main Chat component that renders Chat UI
const App = () => {
  //component object declaration
  const firebaseConfig = {
    apiKey: "AIzaSyAucRWXGg32PFJyFS6rEelyozHKmZwCBgw",
    authDomain: "chat-app-f1b9a.firebaseapp.com",
    projectId: "chat-app-f1b9a",
    storageBucket: "chat-app-f1b9a.appspot.com",
    messagingSenderId: "570261438273",
    appId: "1:570261438273:web:fceac46669ecc0d6bbabc0"
  };
  //initialize Firebase
  const app = initializeApp(firebaseConfig);

  //initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
    Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat 
          isConnected={connectionStatus.isConnected} 
          db={db} 
          storage={storage}
          {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
