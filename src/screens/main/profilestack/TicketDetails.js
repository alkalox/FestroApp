import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Share } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

export default class TicketDetails extends Component {
    static navigationOptions = {
        title: 'Ticket Details',
        }
  constructor(props) {
    super(props);
    this.state = {
        user_tickets: this.props.navigation.getParam('user_tickets'),
        registration: this.props.navigation.getParam('registration'),
    };
  }

  items = () => {
    return this.state.user_tickets[0].map((data, ticket_number) => 
        (
        <Text style = {{ marginTop: 3, fontSize: 14, fontFamily:'Lato-Regular', color: '#3b3b3b'}} key = {ticket_number}>
            {data.quantity} x {data.name}
        </Text>
        )
      )
  }
  
  price = () => {
    return this.state.user_tickets[0].map((data, ticket_number) => 
        (
        <Text style = {{ marginTop: 3, fontSize: 14, fontFamily:'Lato-Regular', color: '#3b3b3b'}} key = {ticket_number}>
            {data.price}
        </Text>
        )
      )
  }

  render() {
    firebase.analytics().setCurrentScreen('TicketDetails')
    return (
    <ScrollView style = {{backgroundColor: '#fdfaf8', flex: 1}}>
        <View style = {{margin: 10, borderWidth: 2, borderColor:'#dbdbdb'}}>
            <View style = {{padding: 8, justifyContent: 'flex-start', flexWrap: 'wrap', backgroundColor:'#fff'}}>
                <Text style = {{ fontSize: 16, fontFamily:'Lato-Bold', color: '#fc6643'}} >
                    {this.state.user_tickets[1].title}
                </Text>
                <View style = {{marginTop: 8, flexDirection: 'row'}}>
                        <Image 
                            style = {{marginRight: 5, height : 15, width: 15.5}}
                            source={require('../../../assets/calendar.png')}
                        />
                        <Text style = {{ fontSize: 14, fontFamily:'Lato-Regular', color: '#3b3b3b'}}>
                            {this.state.user_tickets[1].start_date} {this.state.user_tickets[1].start_time}
                        </Text>
                </View>
                <View style = {{marginTop: 8, flexDirection: 'row'}}>
                        <Image 
                            style = {{marginRight: 5, height : 15, width: 15.2}}
                            source={require('../../../assets/location.png')}
                        />
                    <Text style = {{ fontSize: 14, fontFamily:'Lato-Regular', color: '#3b3b3b'}}>
                        {this.state.user_tickets[1].venue}
                    </Text>
                </View>
            </View>
            <View style = {{ justifyContent: 'flex-start', flexDirection:'row', flexWrap: 'wrap', backgroundColor:'#f1f1f1'}}>
                <View style = {{ width: '68%', flexDirection:'column', padding: 8}}>
                    <Text style = {{ fontSize: 14, fontFamily:'Lato-Bold', color: '#585858'}}>
                        Items
                    </Text>
                     {this.items()}
                </View>
                <View style = {{ width: '32%', flexDirection:'column', padding: 8}}>
                    <Text style = {{ fontSize: 14, fontFamily:'Lato-Bold', color: '#585858'}}>
                        Price per Ticket
                    </Text>
                    {this.price()}
                </View>
                <View style = {{ flexDirection:'column', padding: 8}}>
                    <Text style = {{ fontSize: 15, fontFamily:'Lato-Bold', color: '#585858'}}>
                        Total Amount Paid
                    </Text>
                    <Text style = {{ marginTop: 8, fontSize: 15, fontFamily:'Lato-Bold', color: '#3b3b3b'}}>
                        ₹ {this.props.navigation.getParam('amount')}
                    </Text>
                </View>
            </View>
            <View style = {{ paddingTop: 8, backgroundColor:'#fff'}}>
                <View style = {{justifyContent :'center', alignItems:'center'}}>
                    <QRCode
                        value={`${this.state.user_tickets[1].title} ${"\n"}${this.props.navigation.getParam('order_number')}`}
                    />
                    <Text style = {{ paddingTop: 6, fontSize: 18, fontFamily:'Lato-Bold', color: '#3b3b3b'}}>
                        {this.props.navigation.getParam('order_number')}
                    </Text>
                </View>
                <View style = {{marginTop: 5, padding: 7}}>
                    <Text style = {{ fontSize: 15, fontFamily:'Lato-Bold', color: '#585858'}}>
                        Ticket Purchased by 
                    </Text>
                    <Text style = {{ marginTop: 3, fontSize: 14, fontFamily:'Lato-Regular', color: '#585858'}}>
                        {this.state.registration.name}
                    </Text>
                    <Text style = {{ marginTop: 3,fontSize: 14, fontFamily:'Lato-Regular', color: '#585858'}}>
                    {this.state.registration.email}
                    </Text>
                    <Text style = {{ marginTop: 3, fontSize: 14, fontFamily:'Lato-Regular', color: '#585858'}}>
                     Date: {this.props.navigation.getParam('date_created')}
                    </Text>
                </View>
            </View>
            <View style = {{backgroundColor:'#f1f1f1', padding: 7, borderTopWidth: 0.5, borderColor:'#dbdbdb'}}>
                <Text>Invoice has been emailed at {this.state.registration.email}</Text>
            </View>
        </View>
        <View style = {{justifyContent: 'center', alignItems:'center', marginBottom: 5}}>
            <TouchableOpacity
                onPress = {() => {
                  Share.share({
                    message: `I am going for ${this.state.user_tickets[1].title}, you should come along! Get the details and more on Festro : https://play.google.com/store/apps/details?id=com.festroapp.festro`,
                  },
                  {
                    dialogTitle: 'Share ' + this.state.user_tickets[1].title,
                  })
                }}
                style = {{justifyContent:'center', alignItems:'center', borderWidth: 0.5, borderColor:'grey', backgroundColor:'#fff', padding: 8, width: 115, borderRadius: 15}}>
                <Text style = {{fontSize: 17, fontFamily:'Lato-Regular', color: '#fc6643'}}>
                  Share
                </Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    );
  }
}
