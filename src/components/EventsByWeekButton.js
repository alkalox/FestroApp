import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { withNavigation } from 'react-navigation';

const EventbyWeek = props => (
  <TouchableNativeFeedback 
    onPress={() => props.navigation.navigate('FilterScreen', { filter: props.title})}
    background={TouchableNativeFeedback.Ripple('#ffb4a5')}
  >
    <View style = {styles.view}> 
      <Text style = {styles.text}> 
          {props.title}
      </Text>
    </View>
  </TouchableNativeFeedback>
)

const styles = StyleSheet.create({
    view: {
        paddingVertical: 12, 
        paddingHorizontal: wp('5%'), 
        marginRight:10, 
        backgroundColor: '#fff', 
        borderWidth: 1, 
        borderColor:'#f9bfb3', 
        borderRadius: 5, 
        elevation: 3,
    },
    text: {
        fontSize: hp('1.9%'), 
        fontFamily:'Lato-Bold', 
        color: '#585858', 
        textTransform:'capitalize',
    }
})

export default withNavigation(EventbyWeek);