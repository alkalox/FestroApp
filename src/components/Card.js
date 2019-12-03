import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';

import { withNavigation } from 'react-navigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Card = props => (
  <TouchableOpacity 
    style = {{alignItems: 'center', backgroundColor: '#fff', borderColor: '#ff7358', marginBottom: 20, borderWidth: 0.5, borderColor:'#dbdbdb', elevation: 4}}
    activeOpacity = {0.85}
    onPress = {() => 
      props.navigation.navigate('Details', {
        event_id : props.id,
        title: props.title,
        poster: props.poster_link,
        startdate : props.start_date,
        start_time: props.start_time,
        enddate : props.end_date,
        description: props.description,
        venue: props.venue,
        address: props.address,
        favourite: props.user_has_favorite,
        phone: props.phone,
        email: props.email,
        facebook: props.facebook,
        instagram: props.instagram,
        website: props.website,
        tickets: props.tickets,
        terms: props.terms,
        is_paid: props.is_paid,
        organizer_name: props.organizer_name,
      })}
  >
    <ImageBackground
      style = {{ height: windowHeight * 0.35, width: windowWidth * 0.95 }}
      source={{uri: props.poster_link}}
      resizeMode= 'stretch'
    >
      <View style = {{flex: 1, justifyContent: 'flex-end', alignItems:'flex-end',paddingBottom: 10, paddingRight: 10}}>
        <View style = {{backgroundColor: '#31AE6A', padding: 5, borderRadius: 10}}>
          <Text style = {{color: '#fff', fontSize: 13, fontFamily: "Lato-Bold"}}>
            {props.main_category}
          </Text>
        </View>
      </View>
    </ImageBackground> 
    <View style = {{ flexDirection: 'row'}}>
        <View style = {{flex: 1, margin: 5, marginLeft: 10}}>
          <Text style ={{fontSize: 17, fontFamily: "Lato-Bold", color:"#323232"}}>
            {props.title}
          </Text>
          <View style = {{flexDirection:'column'}}>
            <View style = {{flexDirection: 'row'}}>
              <Image 
                style = {{marginTop: 10, height : 12.5, width: 12.5}}
                source={require('../assets/calendar.png')}
              />
              <Text style ={{marginTop:8.5, fontSize: 14, fontFamily: "Lato-Regular", color:'#65646b', paddingLeft: 10}}>
                  {props.start_date}
              </Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              <View style = {{marginTop: 5, marginLeft:0.5}}>
                <Image 
                  style = {{height : 12, width: 10.5}}
                  source={require('../assets/location2.png')}
                />
              </View>
                <Text style ={{marginTop:4, fontSize: 14, fontFamily: "Lato-Regular", color:'#65646b', paddingLeft: 12}}>
                  {props.venue}
                </Text>
            </View>    
          </View>
        </View>
    </View>
  </TouchableOpacity>
) 

export default withNavigation(Card);