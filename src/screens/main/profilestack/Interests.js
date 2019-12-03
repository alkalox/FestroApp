import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import { StackActions} from 'react-navigation';

import MiniButton from '../../../components/MiniButton.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

export default class Interests extends Component {
  static navigationOptions = {
    title: 'My Interests',
    header: null,
  }
    
  constructor(props) {
    super(props);
    this.state = {
      interestArray : [],
      buttonDisabled: true,
      buttonTitle: 'SELECT ATLEAST 3 INTERESTS',
    };
  }
      
  addInterest = (interest) => {
    this.setState(prevState => ({
      interestArray: [...prevState.interestArray, interest]
    }))
    if(this.state.interestArray.length >= 2) {
      this.setState({buttonDisabled: false, buttonTitle:'ADD INTERESTS'})
    }
  }

  removeInterest = (interest) => {
    let newInterests = this.state.interestArray.filter(item => item !== interest)
    this.setState({
      interestArray: [...newInterests]
    })
    if(this.state.interestArray.length < 4) {
      this.setState({buttonDisabled: true, buttonTitle:'SELECT ATLEAST 3 INTERESTS'})
    }
  }
    

  async setInterests(key) {
    try {
      let response = await fetch(`https://festro.co/api/interest/${this.state.interestArray}`, 
      {
        method: 'PUT',
        headers : {
          'Authorization': `Token ${key}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      let data = await response.json()
      //alert(JSON.stringify(data))
      if (data.flag === true) {
        this.props.navigation.dispatch(StackActions.popToTop())
        this.props.navigation.navigate('Explore')
      }
      
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
    firebase.analytics().setCurrentScreen('Interests')
    return (
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between'}}
        style = {{ flex: 1, backgroundColor: '#fdfaf8' }}>
        <View style = {{ margin: 15, marginTop: 40}}>
          <Text style = {{ fontSize: hp('2.9%'), fontFamily: 'Lato-Bold', color: '#fc6643'}}> 
            What are your interests?
          </Text>
          <Text style = {{ marginTop: 10, paddingLeft: 6, fontSize: hp('2%'), fontFamily: 'Lato-Regular', color: '#585858'}}> 
            We'll use them to show you events according to your interests.
          </Text>
          <View style= {{flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 30 }}>
            <MiniButton value = 'Fest' title = 'College Festivals' width = {wp('47%')} marginRight = {10}  selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Tech' title = 'Tech Events' width = {wp('40%')} marginRight = {10}  selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Cultural' title = 'Cultural Events' message = 'Dance, Music, Literature, Art etc' width = {wp('47%')}  marginTop = {15} marginRight = {10} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Talks' title = 'Talks' message = 'TedX, Conferences, Seminars' width = {wp('40%')}  marginTop = {15} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Concert' title = 'Concerts & Live Music' width = {wp('47%')}  marginTop = {15} marginRight = {10} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Entrepreneurship' title = 'Entrepreneurship' width = {wp('40%')}  marginTop = {15} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'MUN' title = 'Model United Nations' width = {wp('47%')}  marginTop = {15} marginRight = {10} selection={this.addInterest} removal = {this.removeInterest}/>
            <MiniButton value = 'Travel' title = 'Adventure & Travel' width = {wp('40%')}  marginTop = {15} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Workshop' title = 'Workshop & Training' width = {wp('47%')}  marginTop = {15} marginRight = {10} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Partying' title = 'Partying'  width = {wp('40%')}  marginTop = {15} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Others' title = 'Other Events' message = 'Gaming, Fun, Online Events, Sports' width = {wp('47%')}  marginTop = {15} marginRight = {10} selection={this.addInterest} removal = {this.removeInterest} />
            <MiniButton value = 'Comedy' title = 'Comedy' width = {wp('40%')}  marginTop = {15} selection={this.addInterest} removal = {this.removeInterest} />
          </View>

        </View>
        <View style = {{flex:1, justifyContent:'center', alignItems: 'center'}} >
          <TouchableOpacity 
            style = {{ position: 'absolute', bottom: 0, justifyContent:'center', alignItems:'center',  width: Dimensions.get('window').width, height: 50, backgroundColor: this.state.buttonDisabled ? '#607D8B' : '#fc8468'}}
            onPress = {() => AsyncStorage.getItem('userKey').then((item) => this.setInterests(item))}
            disabled={this.state.buttonDisabled}
            activeOpacity = {0.5}
            >
              <Text style = {{fontSize: 16, color: '#fff', fontFamily:'Lato-Regular'}}>
                {this.state.buttonTitle}
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}