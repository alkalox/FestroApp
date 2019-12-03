import React from "react";
import { ScrollView, FlatList, ActivityIndicator, View, Text, ToastAndroid} from "react-native";

import Card from '../../../components/Card.js'

import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

export default class FilterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('filter') + ' Events',
      headerStyle: {
        backgroundColor: '#fbf9f8',
        elevation: 3,
      },
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
      filter: props.navigation.state.params.filter
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userKey').then((item) => this.getEventsbydate(item))
  }

  componentDidUpdate() {
    if (this.animation) {
      this.animation.play()
    }
  }  
  
  async getEventsbydate(key) {
    try {
      let response = await fetch(`https://festro.co/api/events/filter/${this.state.filter}`, {
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
      //alert(JSON.stringify(this.state.dataSource))
      //Clipboard.setString(JSON.stringify(this.state.dataSource))
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
    firebase.analytics().setCurrentScreen('FilterScreen')
    if (!this.state.dataSource) {
      CardView = <ActivityIndicator size="small" color="#fc6643" />
    }
    else if (this.state.dataSource.length === 0) {
      CardView = 
      <View style = {{ marginTop: '15%', justifyContent:'center', alignItems :'center'}}>
        <LottieView
          ref={animation => this.animation = animation }
          source={require('../../../assets/animations/emptybox.json')}
          loop = {false}
          style = {{height: 130, width: 130}}
        />
        <Text style = {{ margin: 20, fontSize: 18, fontFamily: 'Lato-Bold', color: '#585858'}}>
          No events happening. Check back later!
        </Text>
      </View>
    }
    else if (this.state.dataSource.length > 0) {
      CardView = 
      <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Card {...item} navigation={this.props.navigation} /> }
          showsVerticalScrollIndicator = {false}
          keyExtractor={(item, index) => index.toString()}
        />
    }
    return (
      <ScrollView style = {{ padding: 10, backgroundColor: '#fdfaf8'}}>
        {CardView}
      </ScrollView>
    );
  }
}