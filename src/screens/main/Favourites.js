import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, ActivityIndicator, ToastAndroid, Clipboard } from 'react-native';

import Card from '../../components/Card.js'

import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';

export default class Favourites extends Component {
    static navigationOptions = {
        title: 'My Favourites',
      }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
      refreshing: false,
    };
  }

  componentDidMount() {
    //AsyncStorage.getItem('userKey').then((item) => this.getFavourites(item))
    this.willFocusSubscription = this.props.navigation.addListener( 
      'willFocus', () => { AsyncStorage.getItem('userKey').then((item) => this.getFavourites(item)) }
    )
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  componentDidUpdate() {
    if (this.animation) {
      this.animation.play()
    }
  }

  async getFavourites(key) {
    try {
    let response = await fetch('https://festro.co/api/user/favorites/', {
      method: 'GET',
      headers : {
          'Authorization': `Token ${key}`,
          'Accept': 'application/json',
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
    //alert(JSON.stringify(this.state.dataSource))
    //Clipboard.setString(JSON.stringify(this.state.dataSource))
  }

  render() {
    firebase.analytics().setCurrentScreen('Favourites')
    if (!this.state.dataSource)  {
      FavouritesView = 
      <ActivityIndicator size="small" color="#fc6643" />
    }
    else if (this.state.dataSource.length === 0) {
      FavouritesView = 
      <View style = {{flex: 1, justifyContent:'center',alignItems :'center', marginTop: 20}}>
        <LottieView
          ref={animation => this.animation = animation }
          source={require('../../assets/animations/whale.json')}
          style = {{height: wp('40%'), width: wp('40%')}}
        />
          <Text style = {{ margin: 20, fontSize: 17, fontFamily: 'Lato-Regular', color: '#585858'}}>
            You have no favourites! Tap on ❤ in an event to save it here and not miss out on an upcoming event.
          </Text>
      </View>
    }
    else if (this.state.dataSource.length > 0) {
      FavouritesView = 
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Card {...item} navigation={this.props.navigation} /> }
          showsVerticalScrollIndicator = {false}
          keyExtractor={(item, index) => index.toString()}
        />
    }
    return (
      <ScrollView showsVerticalScrollIndicator = {false} style = {{ flex: 1, padding: 10, backgroundColor: '#fdfaf8'}}>
        {FavouritesView}
      </ScrollView>
    );
  }
}
 //end of component