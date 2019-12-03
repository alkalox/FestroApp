import React, { Component } from 'react';
import { View, ScrollView, FlatList, Clipboard, Text, ActivityIndicator, ToastAndroid} from 'react-native';

import PurchasedTicket from '../../../components/PurchasedTicketCard.js'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import firebase from 'react-native-firebase';

export default class PurchasedTickets extends Component {
  static navigationOptions = {
    title: 'My Tickets',
    }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userKey').then((item) => this.getTickets(item))
  }

  componentDidUpdate() {
    if (this.animation) {
      this.animation.play()
    }
  }
  
  async getTickets(key) {
    try {
      let response = await fetch('https://festro.co/api/ticket/history/', {
        method: 'GET',
        headers : {
          'Authorization': `Token ${key}`,
          'Content-Type': 'application/json',
        },
      })
      let data = await response.json()
      this.setState({
        dataSource: data
      })
      
    }
    catch (e) {
      ToastAndroid.showWithGravityAndOffset(
        'Error. Network request failed, Try again.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        275,
      )
      
    }
    }

  render() {
    firebase.analytics().setCurrentScreen('PurchasedTickets')
    if (!this.state.dataSource) {
      TicketView = <ActivityIndicator size="small" color="#fc6643" />
    }
    else if (this.state.dataSource.length === 0) {
      TicketView = 
      <View style = {{ marginTop: '15%', justifyContent:'center', alignItems :'center'}}>
        <LottieView
          ref={animation => this.animation = animation }
          source={require('../../../assets/animations/ticket.json')}
          loop = {false}
          speed = {1.2}
          style = {{height: hp('15%'), width: wp('15%'),}}
        />
        <Text style = {{ margin: 20, fontSize: 18, fontFamily: 'Lato-Regular', color: '#585858'}}>
          You haven't booked any ticket yet!
        </Text>
    </View>
    }
    else if (this.state.dataSource.length > 0) {
      TicketView = 
      <FlatList
        data={this.state.dataSource}
        renderItem={({item}) => <PurchasedTicket {...item} /> }
        showsVerticalScrollIndicator = {false}
        keyExtractor={(item, index) => index.toString()}
      />
    }
    return (
      <ScrollView 
        style = {{ padding: 10, backgroundColor: "#fdfaf8"}}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{justifyContent: 'center', alignItems:'center'}}
      >
        {TicketView}
      </ScrollView>
    );
  }
}