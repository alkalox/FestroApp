import React, { Component } from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView style = {{backgroundColor:'#fbf9f8'}}>
				<View style = {{margin: 15, marginTop: 20}}>
					<Text style = {{fontSize: 18, fontFamily:'Lato-Bold', color:'#585858'}}> About Us </Text>
					<Text style = {{marginTop: 5, marginLeft: 5,  fontSize: 15, fontFamily:'Lato-Regular', color:'#707070'}}>Festro is a student platform - made by students. {"\n"}Our aim is to enhance the experience of a student life. {"\n"}We help you find
						awesome curated events to go to. </Text>
				</View>
				<View style = {{margin: 15, marginTop: 20}}>
					<Text style = {{fontSize: 18, fontFamily:'Lato-Bold', color:'#585858'}}> Contact Us </Text>
					<Text 
            onPress = {() => Linking.openURL('mailto:festrodeveloper@gmail.com')}
            style = {{padding: 5, marginTop: 5, fontSize: 15, fontFamily:'Lato-Regular', color:'#707070'}}
          > 
            Email : <Text style = {{color:'#0000FF', textDecorationLine:'underline'}}>festrodeveloper@gmail.com </Text>
          </Text>
					<Text style = {{padding: 5, marginTop: 5, fontSize: 15, fontFamily:'Lato-Regular', color:'#707070'}}>Live Chat : Support Tab in Profile in the app </Text>
          <Text 
            onPress = {() => Linking.openURL("https://festro.co/")}
            style = {{padding: 5, marginTop: 5, fontSize: 15, fontFamily:'Lato-Regular', color:'#707070'}}
          > 
              Website : <Text style = {{color:'#0000FF', textDecorationLine:'underline'}}>festro.co </Text>
          </Text>
          
				</View>
      </ScrollView>
    );
  }
}
