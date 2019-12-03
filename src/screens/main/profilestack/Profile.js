import React, { Component } from 'react';
import { ScrollView, View, Text, Linking, TouchableNativeFeedback, StyleSheet} from 'react-native';

import { LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { Freshchat, FreshchatConfig, FreshchatUser } from 'react-native-freshchat-sdk';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';

import MiniCard from '../../../components/MiniCard.js'

export default class Profile extends Component {
  // static navigationOptions = {
  //   title: 'Profile',
  //   }
  constructor(props) {
    super(props);
    this.state = {
      LoginProvider: null,
    }
  }

  

  render() {
    firebase.analytics().setCurrentScreen('Profile')
     if (this.state.userInfo && this.state.userInfo.name) {
       user = 
       <View>
          <Text style = {{color: '#585858', fontSize: 18, fontFamily:'Lato-Bold'}}>
            {this.state.userInfo.name}
          </Text>
          <Text style = {{color: '#686868', fontSize: 15, fontFamily:'Lato-Regular'}}>
            {this.state.userInfo.email}
          </Text>
      </View>
     }
     else {
       user = null
     }
    return (
        <ScrollView style={{ flex:1 , backgroundColor: '#fdfaf8' }}>
          <View style = {{ flexDirection: 'row', justifyContent: 'center', marginTop: hp(2)}}>
            {user}
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center', marginTop: hp(4)}}>
            <MiniCard 
              name = 'My Tickets' 
              icon = {require('../../../assets/icons/ticket.png')} 
              navigates = {() => this.props.navigation.navigate('PurchasedTickets')} 
              imgWidth = {20} 
              imgHeight = {20}
            />
            
            <MiniCard 
              name = 'Change Interests' 
              icon = {require('../../../assets/icons/interest.png')} 
              navigates = {() => this.props.navigation.navigate('Interests')}
              imgWidth = {20} 
              imgHeight = {18.5} 
            />

            <MiniCard 
              name = 'Create & Manage Events' 
              icon = {require('../../../assets/icons/addevent.png')} 
              navigates = {() => Linking.openURL('http://festro.co')}
              imgWidth = {20} 
              imgHeight = {20} 
            /> 

            <MiniCard 
              name = 'Support' 
              icon = {require('../../../assets/icons/support.png')} 
              navigates = {() => Freshchat.showConversations() }
              imgWidth = {20} 
              imgHeight = {20} 
            />

            <MiniCard 
              name = 'FAQ' 
              icon = {require('../../../assets/icons/faq.png')} 
              navigates = {() => this.props.navigation.navigate('FAQ') }
              imgWidth = {20} 
              imgHeight = {20.3} 
            />

          </View>
          <View style = {{justifyContent:'center', alignItems:'center',height: 1, backgroundColor: '#EEEEEC', margin: 20, marginBottom: 5, width:'90%'}}/>
            <TouchableNativeFeedback 
              onPress={() => this.props.navigation.navigate('ContactUs')}
              background={TouchableNativeFeedback.Ripple('#ff795e')}
            >
              <View style = {styles.textButton}>
                <Text 
                  style = {styles.textButtontext}
                >
                  About us
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback 
              onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.festroapp.festro')}
              background={TouchableNativeFeedback.Ripple('#ff795e')}
            >
              <View style = {styles.textButton}> 
                <Text 
                  style = {styles.textButtontext}
                >
                  Rate Us
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback 
              onPress={this._signoutMethod}
              background={TouchableNativeFeedback.Ripple('#ff795e')}
            >
              <View style = {styles.textButton}> 
                <Text 
                  style = {styles.textButtontext}
                >
                  Log out
                </Text>
              </View>
            </TouchableNativeFeedback>
            
        </ScrollView>
    );
  }

  _signoutMethod = () => {
    if (this.state.LoginProvider === 'Google') {
      this._GoogleLogOut()
    }
    else if (this.state.LoginProvider === 'Facebook') {
      this._FacebookLogOut()
    }
  }

  

  _GoogleLogOut = async () => {
    const keys = ['userToken', 'userKey', 'firstLaunch', 'LoginProvider', 'userInfo']
    await AsyncStorage.multiRemove(keys)
    await this._configureGoogleSignIn()
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    await Freshchat.resetUser()
    this.props.navigation.navigate('Auth') 
  }
  

  _FacebookLogOut = async () => {
    const keys = ['userToken', 'userKey', 'firstLaunch', 'LoginProvider', 'userInfo']
    await AsyncStorage.multiRemove(keys)
    await LoginManager.logOut()
    await Freshchat.resetUser()
    this.props.navigation.navigate('Auth');
  }

} //end of component

const styles = StyleSheet.create({
  textButton: {
    alignSelf: 'flex-start',
    backgroundColor:'#fdfaf8',
    margin: 15, 
    marginBottom: 0, 
    padding: 5, 
    paddingBottom: 0, 
    paddingTop: 0,
  },
  textButtontext: {
    color:'#2a2a2a', 
    fontSize: 15,
  }
})