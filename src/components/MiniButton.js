import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class MiniButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      value: null,
    };
  }

  onButtonPress = () => {
    if (this.state.isClick == true) {
      this.setState({ 
        isClick: false, value: this.state.value }, 
        () => this.props.removal(this.state.value))
    }
    else {
      this.setState({ 
        isClick:true, value: this.props.value}, 
        () => this.props.selection(this.state.value))
    }
  }

  render() {
    if (this.props.message) {
      Message = 
      <Text style = {{ fontSize: 10, fontFamily: 'Lato-Regular', color: this.state.isClick ? '#fff' :'#464646' }}>
        {this.props.message}
      </Text>;
    } else {
      Message = null
    }
    
    return (
      <TouchableOpacity 
        style={{ marginRight: this.props.marginRight, marginTop: this.props.marginTop, width: this.props.width, height: hp('7.5%'), borderRadius:10, borderWidth: 0.5, borderColor:'#dbdbdb', backgroundColor: this.state.isClick ? '#fc8468' : '#fff', justifyContent: 'center', alignItems:'center'}} 
        onPress = {this.onButtonPress}
        activeOpacity = {1} >
        <Text style = {{ fontSize: hp(2), fontFamily: 'Lato-Bold', color: this.state.isClick ? '#fff' :'#464646', textTransform: 'capitalize', alignContent:'center'}}>
          {this.props.title}
        </Text>
        {Message}
      </TouchableOpacity>
    );
  }
}

