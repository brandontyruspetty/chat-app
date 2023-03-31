# **Chat-App**

## **Objective**

A chat app for mobile devices using React Native. 
The app provides users with a chat interface and includes options to share images and user locations

### **Tech Stack**
+ React Native
- React Native Gifted Chat
- Expo
* JavaScript
+ Google Firestore Database


### **User Stories**
+ As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
+ As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### **Key Features**
+ A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images and location data.
+ Data gets stored online and offline.

### Getting Started With Develpment Environment
+ Install Expo CLI: `npm install expo-cli -g` and login with an Expo account: `expo login`
+ Install necessary dependencies: `npm i`
* Install Expo Go App from Apple App Store or Google Play Store to test project on mobile device
+ Install Android Studio for Android Emulator or Xcode for iOS Simulator to test app

### Setting Up Database
+ Sign in at Google Firebase
- Create new project in test mode
* Create a Firestore Database
* In 'Settings-> General-> Your Apps-> Firestore for Web' generate your configuration object
+ In the App.js file replace the `firebaseconfig` variable with the configuration info from your own Firestore database

### Run the Project
- Start app by running `npx expo start` or `expo start`
+ Using the Expo Go app start Chat-App by scanning QR code in terminal with your mobile device
* Using the Emulator/Simulator press `a` for Android or `i` for iOS

### Dependencies
```
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "expo": "~48.0.6",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.13.0",
    "react": "18.2.0",
    "react-native": "0.71.4",
    "react-native-gifted-chat": "^2.0.0",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "@react-native-community/netinfo": "9.3.7",
    "@react-native-async-storage/async-storage": "1.17.11",
    "expo-image-picker": "~14.1.1",
    "expo-location": "~15.1.1",
    "react-native-maps": "1.3.2"
 
