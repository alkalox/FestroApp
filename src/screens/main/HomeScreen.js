import React from "react";
import { ScrollView, View, Text, StyleSheet, FlatList, Clipboard, ToastAndroid, ActivityIndicator, StatusBar} from "react-native";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Card from '../../components/Card.js'
import SquareButton from '../../components/SquareButton.js'
import EventbyWeek from '../../components/EventsByWeekButton.js'
import PushNotification from '../Notification.js'

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

import firebase from 'react-native-firebase';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
    };
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        AsyncStorage.getItem('userKey').then((item) => this.getEvents(item))
      }
    )
    NetInfo.fetch().then(state => {
      if(state.isConnected === false) {
        ToastAndroid.showWithGravityAndOffset(
          'Please check your Internet Connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          275,
        )
      }
    })

  } // end of componentDidMount

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  

  render() {
    firebase.analytics().setCurrentScreen('HomeScreen')
    if (!this.state.dataSource) {
      CardView = 
      <View style = {{alignItems:'center', justifyContent: 'center'}}>
        <ActivityIndicator size="small" color="#fc6643" style = {{marginTop: hp(5)}} />
        <Text style = {{ margin: 15, fontSize: 17, fontFamily: 'Lato-Regular', color: '#585858'}}> 
          Fetching events for you..
        </Text>
      </View>
    }
    else if (this.state.dataSource.length === 0) {
      CardView = 
      <View style = {{ justifyContent:'center', alignItems :'center'}}>
        <LottieView
          ref={animation => this.animation = animation }
          source={require('../../assets/animations/emptybox.json')}
          loop = {false}
          style = {{height: hp(20), width: wp(20)}}
        />
        <Text style = {{ margin: 15, fontSize: 17, fontFamily: 'Lato-Regular', color: '#585858'}}>
          No events happening, Check back later!
        </Text>
      </View>
    }
    else if (this.state.dataSource.length > 0) {
      CardView = 
      <FlatList
        data={this.state.dataSource}
        renderItem={({item}) => <Card {...item} /> }
        showsVerticalScrollIndicator = {false}
        keyExtractor={(item, index) => index.toString()}
      />
    }
    return (
      <ScrollView 
        showsVerticalScrollIndicator = {false} 
        style= {styles.main}
        contentContainerStyle = {{flexWrap:'wrap'}}
      >
        <PushNotification />
        <StatusBar backgroundColor='#fdfaf8' barStyle='dark-content' />
        <Text style = {{fontSize: 15, fontFamily: 'Lato-Bold', fontWeight: '300', color: '#ff836b'}}>
          Shortcuts
        </Text>
        <View style = {{ flexDirection:'row', flexWrap:'wrap', alignItems:'center', justifyContent: 'center',  margin: 10, marginBottom: 20, marginLeft:0}}>
          <SquareButton 
            title = "Fests" 
            cat = "Fest" 
            icon = {require('../../assets/squareicons/fests.png')}
          />
          <View style = {styles.verticalSeparator} />
          <SquareButton 
            title = "Concerts" 
            cat = "Concert"
            icon = {require('../../assets/squareicons/concert.png')}
          />
          <View style = {styles.verticalSeparator} />
          <SquareButton 
            title = "Talks" 
            cat = "Talks" 
            icon = {require('../../assets/squareicons/talks.png')}
            />
          <View style = {styles.verticalSeparator} />
          <SquareButton 
            title = "All Events" 
            cat = "All" 
            icon = {require('../../assets/squareicons/allevents.png')}
            />
         </View>
        <View style = {{marginBottom: 15}}>
          <Text style = {{fontSize: 15, fontFamily: 'Lato-Bold', fontWeight: '300', color: '#ff836b'}}>
            Events This Week
          </Text>
          <View style = {{flexDirection:'row', flexWrap:'wrap', marginLeft: 15, marginTop: 15}}>
            <EventbyWeek title = "Today" />
            <EventbyWeek title = "Tomorrow" />
            <EventbyWeek title = "Weekend" />
          </View>
        </View>
        <Text style = {{marginBottom: 15, fontSize: 15, fontFamily: 'Lato-Bold', fontWeight: '300', color: '#ff836b'}}>
          Events For You
        </Text>
        {CardView}
      </ScrollView>
    );
  }

  } //end of component


const styles = StyleSheet.create({
main: {
    backgroundColor: "#fdfaf8",
    padding: 10,
    paddingTop: 0,
},
verticalSeparator: {
  height: '50%',
  borderLeftWidth: 1,
  borderLeftColor: '#e4e4e4',
}
})