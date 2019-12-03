import React from 'react';
import { View, TouchableOpacity, Dimensions, Image, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';


const LoginButton = props => (
  <View style = {{justifyContent:'center', alignItems:'center'}}>
    <TouchableOpacity 
      style = {[styles.button, {backgroundColor: props.backgroundColor }]} 
      onPress = {props.onPress}
      activeOpacity = {0.7}
    >
      <View style = {{flexDirection:'row', alignItems:'center'}}>
        <View style = {styles.imageView}>
          <Image 
            style = {{height : 21, width: 21}}
            source={props.icon}
          />
        </View>
        <Text style = {styles.buttonText}>
          {props.title}
        </Text> 
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  button: {
    marginBottom: 10, 
    padding:10, 
    width: Dimensions.get('window').width * 0.6, 
    borderRadius: 5,
  },
  imageView: {
    backgroundColor:'#fff', 
    padding: 2, 
    borderRadius: 3,
  },
  buttonText: {
    marginLeft: 20, 
    fontSize: heightPercentageToDP(2), 
    fontFamily: 'Lato-Bold', 
    color: '#fff', 
    marginRight: 45,
  }
 })

export default LoginButton
  