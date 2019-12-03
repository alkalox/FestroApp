import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import { StackActions} from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';

export default class Confirmation extends Component {
  static navigationOptions = {
    header: null
  }
  
  onBackButtonPress = () => {
    this.props.navigation.navigate('Home')
    return true
  }

  componentDidMount() {
    this.animation.play()
  }

  popToTickets = () => {
    this.props.navigation.dispatch(StackActions.popToTop()) 
    this.props.navigation.navigate('PurchasedTickets')
  }
  render() {
    firebase.analytics().setCurrentScreen('Confirmation')
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPress}>
        <View style = {{flex: 1, padding: hp('3%'), backgroundColor: "#fdfaf8", justifyContent:'flex-start', alignItems:'center'}}>
          <View style = {{alignItems:'center', marginTop: '20%'}}>
            <LottieView
              ref={animation => this.animation = animation }
              source={require('../../../assets/animations/success.json')}
              loop = {false}
              speed = {1.5}
              style = {{height: hp('30%'), width: wp('30%')}}
            /> 
            <Text style = {{marginTop: 5, fontFamily:'Lato-Regular', fontSize: 17, color:'#585858'}}> 
                Your tickets have been successfully booked! 
            </Text>
          </View>
          <View style = {{flex:1, marginTop: '15%', alignItems:'center'}}>
            <TouchableOpacity 
              style = {{width: Dimensions.get('window').width/2, borderRadius: 25,  height: hp('7%'), backgroundColor:'#fc6643', justifyContent:'center', alignItems:'center'}}
              activeOpacity = {0.5}
              onPress = {() => this.popToTickets()}
            >
              <Text style = {{fontSize: 16, fontFamily:'Lato-Regular', color: '#fff', textTransform:'uppercase'}}>
                  See your tickets
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AndroidBackHandler>
      );
  }
}
