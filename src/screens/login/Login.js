import React from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet, Clipboard, ToastAndroid, Image, Text, Linking} from 'react-native';

import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import {heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const hp = heightPercentageToDP
const wp = widthPercentageToDP

import LoginButton from './LoginButton'

class SignInScreen extends React.Component {
  render() {
    firebase.analytics().setCurrentScreen('Login')
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor='#fdfaf8' barStyle='dark-content' />
        <View>
          <Image 
            style = {{height : 120, width: 120, marginBottom: 5}}
            source={require('../../assets/logo.png')}
          />
          <Text style = {{ textAlign: 'center', fontSize: hp(4), color:'#fc6643', fontFamily:'Lato-Bold'}}>
            Festro
          </Text>
        </View>
        <View>
          <LoginButton 
            title = "Sign in with Google"
            icon = {require('../../assets/google.png')} 
            backgroundColor = '#4285f4'
            onPress  = {this.GoogleSignIn}
          />
          <LoginButton 
            title = "Sign in with Facebook"
            icon = {require('../../assets/fb.png')} 
            backgroundColor = '#4267b2'
            onPress  = {this.FacebookSignIn}
          />
          <Text style = {{ marginTop: 15, color:'#686868', fontFamily:'Lato-Bold', fontSize: 12}}>
            By signing up you agree to our {''}
            <Text 
              onPress = {() => Linking.openURL('https://festro.co/terms/')}
              style = {styles.link}
            >
              Terms
            </Text>
            {''} and  {''}
            <Text 
              onPress = {() => Linking.openURL('https://festro.co/privacy/')}
              style = {styles.link}
            >
               Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    )
  }
  
  componentDidMount() {
    this._configureGoogleSignIn()
  }

  //Google Sign in Methods

 

  GoogleSignIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn()
      const stringifyInfo = JSON.stringify(userInfo.user)
      //Clipboard.setString(stringifyInfo)
      AsyncStorage.setItem('userInfo', stringifyInfo)
      this.GoogleSignInAsync()
    } catch (error) {
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play services not available or outdated')
      }
    }
  }

  GoogleSignInAsync = async () => {
    const Tokens = await GoogleSignin.getTokens();
    await AsyncStorage.setItem('userToken', Tokens.accessToken);
    await AsyncStorage.getItem('userToken').then((item) => this.getGoogleKey(item))
    AsyncStorage.getItem("firstLaunch").then(value => {
      if (value == null) {
        AsyncStorage.setItem('firstLaunch', 'true')
        AsyncStorage.setItem('LoginProvider', 'Google') 
        this.props.navigation.navigate('Interests')
      }
      else {
        this.props.navigation.navigate('App')
      }
    })
  }

  
  // end of Google sign in methods

  //Facebook Sign in Methods

  FacebookSignIn = async () => {
    LoginManager.logInWithPermissions(["email"]).then((result) => {
      if (result.isCancelled) {
        console.log("Login cancelled");
      } 
      else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const infoRequest = new GraphRequest(
            '/me?fields=name,email',
            null,
            this._responseInfoCallback 
          )
          new GraphRequestManager().addRequest(infoRequest).start();
          Clipboard.setString(data.accessToken.toString())
          this.FacebookSignInAsync(data)
        })
      }
    })
  } 

  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('do nothing')
    } else {
      const stringifyInfo = JSON.stringify(result)
      AsyncStorage.setItem('userInfo', stringifyInfo)
    }
  }

  FacebookSignInAsync = async (data) => {
    await AsyncStorage.setItem('userToken', data.accessToken.toString())
    await AsyncStorage.getItem('userToken').then((item) => this.getFacebookKey(item))
    AsyncStorage.getItem("firstLaunch").then(value => {
      if (value == null) {
        AsyncStorage.setItem('firstLaunch', 'true') 
        AsyncStorage.setItem('LoginProvider', 'Facebook') 
        this.props.navigation.navigate('Interests')
      }
      else {
        this.props.navigation.navigate('App');
      }
    })
  }

  
  
  //end of Facebook sign in methods

} // end of component
  
  
class AuthLoadingScreen extends React.Component {
    constructor() {
        super()
        this._bootstrapAsync();
    }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userKey = await AsyncStorage.getItem('userKey');
        if (userKey) {
          this.props.navigation.navigate('App')
        }
        else {
          await AsyncStorage.removeItem('firstLaunch')
          this.props.navigation.navigate('Auth')
        }
        //this.props.navigation.navigate(userKey ? 'App' : 'Auth');
    }
    // Render any loading content that you like here
    render() {
        return (
          <View style={styles.main}>
            <ActivityIndicator />
            <StatusBar backgroundColor='#fdfaf8' barStyle='dark-content' />
          </View>
        )
    }
}

export {SignInScreen, AuthLoadingScreen}

const styles = StyleSheet.create({
    main: {
      flex: 1, 
      alignItems: "center", 
      justifyContent: "space-evenly",
      backgroundColor: "#fdfaf8",
      padding: 10,
    },
    link : {
      color: 'blue', 
      textDecorationLine: 'underline',
    }
  })