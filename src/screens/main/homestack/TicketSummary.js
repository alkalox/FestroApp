import React from "react";
import {  Alert, FlatList, Dimensions, View, ScrollView, Text, TouchableOpacity} from "react-native";

import firebase from 'react-native-firebase';

import Ticket from '../../../components/TicketComponent.js'

export default class TicketSummary extends React.Component {
  static navigationOptions = {
    title: 'Tickets',
    }
  constructor(props) {
    super(props);
    this.state = {
      tickets: this.props.navigation.getParam('tickets'),
    };
  }

  

  handleTicket = (index, quant) => {     
    const tickets = this.state.tickets.slice()
    tickets[index].quantity = quant
    this.setState({ tickets });
  }
  
  render() {

    firebase.analytics().setCurrentScreen('TicketSummary')
      //let QuantArray = this.state.tickets.map(item => item.quantity)
    const QuantityCheck = this.state.tickets.some(ticket => ticket.quantity > 0);
    return (
      <View style = {{flex: 1}}>
      <ScrollView   
        contentContainerStyle={{ flexGrow: 1}}
        style = {{flexWrap: 'wrap',  backgroundColor: "#fdfaf8"}}
      >
        <View style = {{margin: 10}}>
          <Text style = {{fontSize: 17, fontFamily:'Lato-Bold', color: '#323232'}}>
          {this.props.navigation.getParam('title')}
          </Text>
          <Text style = {{marginTop: 10, fontSize: 14, fontFamily:'Lato-Regular', color: '#323232'}}>
          Starts {this.props.navigation.getParam('startdate')} - Ends {this.props.navigation.getParam('enddate')}
          </Text>
          <Text style = {{marginTop: 10,fontSize: 14, fontFamily:'Lato-Regular', color: '#323232'}}>
          {this.props.navigation.getParam('venue')}
          </Text>
        </View>
        <FlatList
          data={this.state.tickets}
          renderItem={({item, index}) => <Ticket {...item} index = {index} onChange ={this.handleTicket} /> }
          showsVerticalScrollIndicator = {false}
          keyExtractor={(item, index) => index.toString()}
        /> 
        
        <View style = {{ justifyContent: 'center', alignItems:'center', borderRadius: 10, borderWidth: 1, borderColor: '#323232', margin: 10, marginBottom: 15, padding: 10, width: Dimensions.get('window').width * 0.92, backgroundColor:'#fff'}}>
          <Text style = {{fontSize: 16, fontFamily:'Lato-Bold', color: '#464646'}}>
            Total Amount Payable : ₹ {this.state.tickets.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0)}
          </Text>
        </View>        
      </ScrollView>
      <TouchableOpacity 
          style = {{ width: Dimensions.get('window').width, height: 48, backgroundColor:'#fc6643', justifyContent:'center', alignItems:'center'}}
          activeOpacity = {0.7}
          onPress = {() => {
            if (QuantityCheck === true) {
              this.props.navigation.navigate('Registration', 
              {
                tickets: this.state.tickets,
                event_id: this.props.navigation.getParam('event_id'),
                eventName: this.props.navigation.getParam('title'),
              })
            }
            else if (QuantityCheck === false) {
              Alert.alert(
                '',
                'You must select the quantity of the ticket you wish to buy.',
              )
            }}}
          >
            <Text style = {{fontSize: 16, fontFamily:'Lato-Regular', color: '#fff', textTransform:'uppercase'}}> 
              Proceed to Registration
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}