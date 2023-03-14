import React from 'react';
import { useState } from 'react';
//import styling from react-native
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

//set background colors
const backgroundColors = {
  black: { backgroundColor: '#090C08'},
  grey: { backgroundColor: '#474056'},
  blue: { backgroundColor: '#8A95A5'},
  green: { backgroundColor: '#B9C6AE'}
}
//

export default class Start extends React.Component  {
  constructor(props) {
    super(props);
    this.state = { name: '', color: ''};
  }
  render() {
    const { black, grey, blue, green } = backgroundColors;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={[styles.container, styles.image]}
        >
        
        <Text style={styles.title}>Welcome to the Chat App!</Text>
        
        <View style={styles.inputBox} >
        <TextInput
          style={styles.textInput}
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}
          placeholder='Type your name here'
          />

        <View>
          <Text style={styles.colorSelector}>Choose your background color</Text>
          <View style={styles.colorWrapper}>
            <TouchableOpacity
              style={[styles.color,
              black,
              this.state.color === black.backgroundColor
              ? styles.colorSelected
              : {}
            ]}
              onPress={() =>
              this.setState({ color: black.backgroundColor })
              }
          />

            <TouchableOpacity style={[
              styles.color,
              grey,
              this.state.color === grey.backgroundColor
              ? styles.colorSelected
              : {}
            ]}
              onPress={() =>
              this.setState({ color: grey.backgroundColor})
              }
          />

            <TouchableOpacity style={[
              styles.color,
              blue,
              this.state.color === blue.backgroundColor
              ? styles.colorSelected
              : {}
            ]}
              onPress={() =>
              this.setState({ color: blue.backgroundColor})
              }
          />
            <TouchableOpacity style={[
              styles.color,
              green,
              this.state.color === green.backgroundColor
              ? styles.colorSelected
              : {}
            ]}
              onPress={() =>
              this.setState({ color: green.backgroundColor})
              }
            />
         </View>
        </View>

        <TouchableOpacity
        style={[styles.textInput, styles.chatBox]}
          onPress={() => 
            this.props.navigation.navigate('Chat', 
            { 
              name: this.state.name,
              color: this.state.color
             })
            }
          >
            <Text style={[styles.colorSelector, styles.chatBoxText]}>
                Start Chatting!
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },

 title: {
  color: '#FFFFFF',
  fontSize: 45,
  fontWeight: 600,
  marginTop: 60
 },

 image: {
  flexDirection: 'column',
  justifyContent: 'space-between',
   alignItems: 'center'
 },

 inputBox: {
  backgroundColor: '#fff',
  marginBottom: 15,
  height: '44%',
  width: '88%',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 20
},

 textInput: {
  height: 50,
       width: '88%',
       borderColor: 'grey',
       borderWidth: 1,
       borderRadius: 2,
       color: '#757083',
       opacity: 50,
       fontSize: 16,
       fontWeight: '300',
       paddingLeft: 10
},

colorSelector: {
  textAlign: 'center',
  fontSize: 16,
  fontWeight: '300',
  color: '#757083',
  opacity: 100
},
 
colorWrapper: {
  flexDirection: 'row'
},

color: {
  width: 40,
  height: 40,
  borderRadius: 20,
  margin: 10
},

chatBox: {
  backgroundColor: '#757083',
  justifyContent: 'center',
  fontSize: 16
},

chatBoxText: {
  color: '#FFFFFF',
  textAlign: 'center',
  fontWeight: '600',
},

colorSelected: {
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#5f5f5f",
},

})

