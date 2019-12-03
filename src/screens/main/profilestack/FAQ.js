import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import { ScrollView, View, Text, StyleSheet } from 'react-native';

const GeneralFAQ = [
  {
    title: ' I’ve got my e-ticket, do I need to get a printout?',
    content:
      'Simply show the e-ticket in your profile --> Tickets on the app, or show the ticket received in your email inbox.',
  },
  {
    title: 'Can I cancel my ticket?',
    content:
      'Sorry, we offer no cancellation and return policy at this time. What you can do, however, is transfer your ticket to someone else. Contact our support to transfer the ticket.',
  },
  {
    title: 'I have a feature suggestion or idea for the app',
    content:
      'We love hearing about new ideas for our app from users :) Let us know about it on festrodeveloper@gmail.com',
  },
  {
    title: 'I want to list my event on Festro',
    content:
      'Wubba Lubba Dub Dub! Head over to https://festro.co/ to get started on the process.',
  },
  
];

const TicketFAQ = [
  {
    title: 'How do I pay for a purchase on Festro?',
    content:
      'You can make the payment through UPI, Net Banking, Cards, Paytm and Other wallets. We have integrated Razorpay and Paytm payment gateways in our system, theyre very secure and keep your transaction details confidential at all times.',
  },
  {
    title: 'How will I know if the ticket I have purchased has been successful?',
    content:
      'You can view all your tickets by going to Profile --> My Tickets. Additionality, you will also receive an email containing your ticket.',
  },
  {
    title: 'My money was debited but I have no tickets',
    content:
      'This can happen if your device loses the internet during the payment. Send us the email address you used to book the ticket on festrodeveloper@gmail.com or through the Support button in the app, we will figure out what went wrong with your ticket ASAP!',
  },
  {
    title: 'Can I book a ticket for someone else?',
    content:
      'Totally. On the Registration page, fill out the details of the person you are booking the ticket for, and they shall receive the ticket in their email! As well as the ticket will be in your profile, you can screenshot them the ticket, it will be valid as long as it has THEIR NAME on it.',
  },
  {
    title: 'Can I transfer my ticket to someone else?',
    content:
      'If you are not able to attend the event and wish to transfer it to someone else, in most cases, it is doable. Please send us a message on festrodeveloper@gmail.com along with the details and we will be happy to do it for you.',
  },
];

export default class FAQ extends Component {
  static navigationOptions = {
    title: 'FAQ',
    }
  state = {
    activeGeneralSections: [],
    activeTicketSections: [],
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateGeneralSections = activeGeneralSections => {
    this.setState({ activeGeneralSections });
  };

  _updateTicketSections = activeTicketSections => {
    this.setState({ activeTicketSections });
  };

  render() {
    return (
      <ScrollView style = {{backgroundColor:'#fdfaf8'}} contentContainerStyle = {{justifyContent:'center', alignItems:'center'}}>
        <Text style = {{margin: 5, marginBottom:15, fontSize: 18, fontFamily:'Lato-Bold', color:'#323232'}}>
          Ticket Booking and Payment
        </Text>
        <Accordion
          sections={TicketFAQ}
          activeSections={this.state.activeTicketSections}
          //touchableComponent={TouchableOpacity}
          underlayColor='#ff7358'
          //renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateTicketSections}
        />
        <Text style = {{margin: 10, fontSize: 18, fontFamily:'Lato-Bold', color:'#323232'}}>
          General
        </Text>
        <Accordion
          sections={GeneralFAQ}
          activeSections={this.state.activeGeneralSections}
          //touchableComponent={TouchableOpacity}
          underlayColor='#ff7358'
          //renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateGeneralSections}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fcf7f7',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily:'Lato-Bold',
    color:'#585858',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
})