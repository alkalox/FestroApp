import React from "react";
import { ScrollView, Image, Dimensions, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Linking, Share, ToastAndroid } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import Collapsible from 'react-native-collapsible';
import ViewMoreText from 'react-native-view-more-text';
import firebase from 'react-native-firebase';

export default class EventDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Event Details'),
      headerRight: (
        <TouchableOpacity
          onPress={() => { 
            Share.share({
              message: `${navigation.getParam('title')} is happening! Get the details and more on Festro : https://play.google.com/store/apps/details?id=com.festroapp.festro`,
            },
            {
            dialogTitle: 'Share ' + navigation.getParam('title'),
            })
          }}
          style = {{padding: 5}}
        >

          <Image 
            style = {{height : 24, width: 23, marginRight: 5}} 
            source={require('../../../assets/Share.png')}
          />
          
        </TouchableOpacity>
      ),
      }
  }

  constructor(props) {
    super(props);
    this.state = {
      isFavourite: this.props.navigation.getParam('favourite'),
      event_id: this.props.navigation.getParam('event_id'),
      keyword: '',
      tickets: this.props.navigation.getParam('tickets'),
      isCollapsed: true,
    };
  }

  onHeartPress = () => {
    if (this.state.isFavourite == true) {
      this.setState({ 
        isFavourite: false,
        keyword: 'remove', 
      })
      AsyncStorage.getItem('userKey').then((item) => this.setFavourites(item))
    }
    else {
      this.setState({ 
        isFavourite: true ,
        keyword: 'add',
      }, () => this.animation.play())
      AsyncStorage.getItem('userKey').then((item) => this.setFavourites(item))
    }
  }

  async setFavourites(key) {
    try {
      let response = await fetch(`https://festro.co/api/favorite/${this.state.keyword}/${this.state.event_id}`, {
        method: 'PUT',
        headers : {
            'Authorization': `Token ${key}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
      })
      let data = await response.json()
      //alert(JSON.stringify(data))
    }
    catch (e) {
      ToastAndroid.showWithGravityAndOffset(
        'Network request failed 💔',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        275,
      )
    }
  }
  
  render() {
    firebase.analytics().setCurrentScreen('EventDetails')          
    let price = Math.min.apply(0, this.state.tickets.map((ticket) => ticket.price))
    if (isNaN(price) || price == Infinity) {
      price = 0
    }
    if (this.state.isFavourite) {
      heartView = 
      <LottieView
        ref={animation => this.animation = animation }
        source={require('../../../assets/animations/heart.json')}
        loop = {false}
        style = {{height: 80, width: 80}}
      />
    } else {
      heartView = 
      <Image 
        style = {{height : 26, width: 28}}
        source={require('../../../assets/h-outline.png')}
      />
    }

    let getFacebook = this.props.navigation.getParam('facebook')
    if (getFacebook.length != 0) {
      FacebookView =
      <TouchableOpacity 
        style = {{marginRight: 10, borderRadius: 25, elevation: 3}}
        onPress = {() => Linking.openURL('https://' + this.props.navigation.getParam('facebook'))}
        activeOpacity = {0.5}
      >
        <Image 
            style = {{height : 40, width: 150}}
            source={require('../../../assets/facebook.png')}
        />
    </TouchableOpacity>
    } else {
      FacebookView = null
    }

    let getInstagram = this.props.navigation.getParam('instagram')
    if (getInstagram.length != 0) {
      InstagramView =
      <TouchableOpacity 
        onPress = {() => Linking.openURL('https://' + this.props.navigation.getParam('instagram'))}
        style = {{borderRadius: 25, elevation: 3}}
        activeOpacity = {0.5}
      >
        <Image 
            style = {{height : 40, width: 150}}
            source={require('../../../assets/instagram.png')}
        />
      </TouchableOpacity>
    } else {
      InstagramView = null
    }

    let getWebsite = this.props.navigation.getParam('website')
    if (getWebsite.length != 0) {
      WebsiteView =
      <TouchableWithoutFeedback 
        onPress = {() => Linking.openURL(`http://${this.props.navigation.getParam('website')}`)}>
        <View style = {{flexDirection:'row', marginTop: 10}}>
          <Image 
              style = {{height : 16, width: 16, marginTop: 5 }}
              source={require('../../../assets/website.png')}
          />
          <View style = {{ paddingLeft: 10, marginTop: 3 }}>
            <Text style ={{ fontSize: 13, fontFamily: "Lato-Regular", color:'#7f7e86' }}>
              Tap to open Website
            </Text>
            <Text style ={{fontSize: 13, fontFamily: "Lato-Bold", color:'#727178', textDecorationLine:'underline'}}>
            {this.props.navigation.getParam('website')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    } else {
      WebsiteView = null
    }

    let TermsScrollText = 
      <Text style = {{ fontSize: 12, fontFamily: 'Lato-Bold', color: '#585858'}}> 
        Scroll down
      </Text>
    let TermsImage = 
      <Image 
        style = {{height : 15, width: 15}}
        source={require('../../../assets/down-arrow.png')}
      />

    let getTerms = this.props.navigation.getParam('terms')
    if (getTerms.length != 0) {
      TermsView =
      <View>
        <TouchableOpacity 
          style = {{padding: 15, paddingTop: 10, paddingBottom:10}}
          activeOpacity = {0.6} 
          onPress = {() => {
            this.setState(prevState => ({
              isCollapsed: !prevState.isCollapsed
              }))

          }}
        >
          <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style = {{ fontSize: 16, fontFamily: 'Lato-Bold', color: '#585858'}}>
              Terms and Conditions
            </Text>
              {this.state.isCollapsed ? TermsImage : TermsScrollText}
            
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.isCollapsed}>
          <View> 
            <Text style ={{padding : 15, paddingBottom: 5, fontSize: 14, fontFamily: "Lato-Regular", color:'#686868'}}>
            {this.props.navigation.getParam('terms')}
            </Text>
          </View>
        </Collapsible>
        <View style = {styles.divider} />
      </View>
    }
    else {
      TermsView = null
    }

    return (
      <View style={{flex: 1}}>
      <ScrollView 
        //contentContainerStyle={{ flexGrow: 1}}
        style = {{ backgroundColor: '#fdfaf8' }}
        showsVerticalScrollIndicator = {false}
      >
        
        <Image
          style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height/2.45 }}
          source={{ uri: this.props.navigation.getParam('poster')}}
          resizeMode= 'stretch'
        />
        <View style = {{ paddingLeft: 15, padding: 10, backgroundColor:'#fdfaf8'}}>
          <Text style = {{ fontSize: 22, fontFamily: 'Lato-Bold', color: '#585858'}}> 
            {this.props.navigation.getParam('title')}
          </Text>
        </View>
        <View style = {{ padding: 15, backgroundColor:'#fdfaf8', flexDirection: 'row', elevation: 3}}>
          <View style = {{ width: '70%'}}>
            <View style = {{flexDirection:'column'}}>
              <View style = {{flexDirection: 'row'}}>
                <Image 
                  style = {{marginTop: 11, height : 14, width: 14}}
                  source={require('../../../assets/calendar.png')}
                />
                <Text style ={{marginTop:10, fontSize: 16, fontFamily: "Lato-Regular", color:'#686868', paddingLeft: 10}}>
                  {this.props.navigation.getParam('startdate')}  {this.props.navigation.getParam('start_time')} {'\n'}
                  {this.props.navigation.getParam('startdate') != this.props.navigation.getParam('enddate') &&
                  <Text>
                    Event ends on {this.props.navigation.getParam('enddate')}
                  </Text>
                  }
                </Text>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 10}}>
                <View style = {{marginTop: 7, marginLeft:1}}>
                  <Image 
                    style = {{height : 14, width: 14.1}}
                    source={require('../../../assets/location.png')}
                  />
                </View>
                <Text style ={{marginTop: 6, fontSize: 16, fontFamily: "Lato-Regular", color:'#686868', paddingLeft: 12}}>
                  {this.props.navigation.getParam('venue')}
                </Text>
              </View> 
              {this.props.navigation.getParam('is_paid') === true && 
                <Text style ={{marginTop: 18, fontSize: 16, fontFamily: "Lato-Bold", color:'#fc6643' }}>
                  Tickets from ₹ {price}
                </Text>
              }
            </View>
          </View>
          {/* heart */}
          <View style = {{width: '30%', justifyContent: 'center', alignItems:'center'}}>
            <TouchableWithoutFeedback onPress={() => this.onHeartPress()}>
              <View style = {styles.circle}>
                {heartView}
                </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
          <ViewMoreText
            numberOfLines={8}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
            textStyle={{padding : 15, paddingBottom: 5, marginTop: 7}}
          >
            <Text style ={{ fontSize: 14.5, fontFamily: "Lato-Regular", color:'#535353' }}>
              {this.props.navigation.getParam('description')} 
            </Text>
          </ViewMoreText>
        <View style = {styles.divider} />
        <View style = {{marginTop: 10, padding: 15, paddingTop: 0, paddingBottom:5}}>
          <Text style = {{ fontSize: 16, fontFamily: 'Lato-Bold', color: '#585858'}}>
            Venue
          </Text>
          <View style = {{flexDirection:'row', marginTop: 5}}>
            <View style = {{width: '60%', flexDirection: 'row', marginTop:8}}>
                <Text style ={{fontSize: 14, fontFamily: "Lato-Regular", color:'#686868'}}>
                  {this.props.navigation.getParam('address')}
                </Text>
            </View>
            <View style = {{ width:'40%', justifyContent: 'center', alignItems:'center'}}>
              <TouchableOpacity
                onPress = {() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.props.navigation.getParam('venue')}`)} 
                activeOpacity = {0.5}
                style = {{marginTop: 10, width: Dimensions.get('window').width/3, height: 40, borderRadius: 20, backgroundColor:'#fc6643', justifyContent:'center', alignItems:'center'}}
              
              >
                <Text style = {{fontSize: 14, fontFamily:'Lato-Regular', color: '#fff', textTransform:'uppercase'}}>
                  Get Directions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style = {styles.divider} />
        <View style = {{marginTop: 10, padding: 15, paddingTop: 0, paddingBottom:0}}>
          <Text style = {{ fontSize: 16, fontFamily: 'Lato-Bold', color: '#585858'}}>
            Contact Details
          </Text>
          <Text style = {{marginTop: 8, fontSize: 13, fontFamily: 'Lato-Regular', color: '#686868'}}>
            Organizer Name : {this.props.navigation.getParam('organizer_name')} 
          </Text>
          <TouchableWithoutFeedback 
            onPress = {() => Linking.openURL(`tel:${this.props.navigation.getParam('phone')}`)}>
            <View style = {{flexDirection:'row', marginTop: 15}}>
              <Image 
                  style = {{height : 16, width: 16, marginTop: 3}}
                  source={require('../../../assets/call.png')}
              />
              <View style = {{paddingLeft: 10}}>
                <Text style ={{fontSize: 14, fontFamily: "Lato-Regular", color:'#7f7e86'}}>
                  Tap to Call
                </Text>
                <Text style ={{ fontSize: 13, fontFamily: "Lato-Bold", color:'#727178', textDecorationLine:'underline'}}>
                  {this.props.navigation.getParam('phone')}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback 
            onPress = {() => Linking.openURL(`mailto:${this.props.navigation.getParam('email')}`)}>
            <View style = {{flexDirection:'row', marginTop: 15}}>
              <Image 
                  style = {{height : 16, width: 16, marginTop: 5, paddingRight: 2}}
                  source={require('../../../assets/email.png')}
              />
              <Text style ={{fontSize: 13, fontFamily: "Lato-Bold", color:'#727178', paddingLeft: 10, textDecorationLine:'underline', marginTop: 4}}>
                {this.props.navigation.getParam('email')}
              </Text>
            </View>
            </TouchableWithoutFeedback>
              {WebsiteView}
            <View style = {{flexDirection:'row', margin: 10, marginTop: 15, marginBottom: 5}}>
              {FacebookView}
              {InstagramView}
            </View>
        </View>
        <View style = {styles.divider} />
        {TermsView}
      </ScrollView>
      {this.props.navigation.getParam('is_paid') === true && 
        <TouchableOpacity
          style = {{width: Dimensions.get('window').width, height: 48, backgroundColor:'#fc6643', justifyContent:'center', alignItems:'center'}}
          activeOpacity = {0.7}
          onPress = {() => 
            this.props.navigation.navigate('TicketSummary', {
              event_id: this.props.navigation.getParam('event_id'),
              title : this.props.navigation.getParam('title'),
              startdate: this.props.navigation.getParam('startdate'),
              enddate: this.props.navigation.getParam('enddate'),
              venue: this.props.navigation.getParam('venue'),
              tickets: this.props.navigation.getParam('tickets'),
            })} 
            //figure out easier/better way to send props to next screen
        >
          <Text style = {{fontSize: 16, fontFamily:'Lato-Regular', color: '#fff', textTransform:'uppercase'}}> 
            Book tickets
          </Text>
        </TouchableOpacity>
      }
      </View>
    );
  }

  renderViewMore(onPress){
    return(
      <Text onPress={onPress} style = {{padding: 15, paddingTop: 5, paddingBottom: 5, fontSize: 15, fontFamily: "Lato-Regular", color:'#fc937b'}}>
        View more
      </Text>
      
    )
  }
  renderViewLess(onPress){
    return(
      <Text onPress={onPress} style = {{padding: 15, paddingTop: 5, paddingBottom: 5, fontSize: 15, fontFamily: "Lato-Regular", color:'#fc937b'}}>
        View less
      </Text>
    )
  }
} // end of component

  const styles = StyleSheet.create({
    circle: {
      width: 60,
      height: 60,
      borderRadius: 100/2,
      backgroundColor: '#ffffff',
      justifyContent: 'center', 
      alignItems:'center',
      elevation: 5,
    },
    divider: {
      height: 1, 
      backgroundColor: '#EEEEEC',
      margin: 8,
    }
})