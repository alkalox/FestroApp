import React from 'react';
import { View, Text, Dimensions} from 'react-native';

import NumericInput from 'react-native-numeric-input'


export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        quantity: 0,
        price: this.props.price,
        total : 0,
    };
  }

  onQuantChange = (q) => {
    this.setState({
        quantity: q, 
        total: this.state.price * q
    },
    () => this.props.onChange(this.props.index, this.state.quantity))
  }

  render() {
    if (this.props.ticket_ended === true) {
        return (
            <View style = {{flexDirection:'row', borderRadius: 10, margin: 5, width: Dimensions.get('window').width * 0.95, backgroundColor:'#fff'}}>
            <View style = {{ padding: 10, width: '60%' }}>
                <Text style = {{fontSize: 16, fontFamily:'Lato-Bold', color: '#fc6643', marginTop: 3}}>
                    {this.props.name}
                </Text>
                <Text style = {{paddingTop: 8, fontSize: 16, fontFamily:'Lato-Bold', color: '#323232'}}>
                    ₹ {this.state.price}
                </Text>
                <Text style = {{paddingTop: 8, fontSize: 14, fontFamily:'Lato-Regular', color: 'gray'}}>
                    {this.props.description} 
                </Text>
            </View>
            <View style = {{justifyContent: 'center', alignItems:'center',  width:'40%'}}>
                <Text style = {{fontSize: 15, fontFamily:'Lato-Bold', color: '#585858'}}>
                    Registrations closed
                </Text>
            </View>
        </View> 
        )
    }
    else if (this.props.sold_out === true) {
      return (
          <View style = {{flexDirection:'row', borderRadius: 10, margin: 5, width: Dimensions.get('window').width * 0.95, backgroundColor:'#fff'}}>
          <View style = {{ padding: 10, width: '60%' }}>
              <Text style = {{fontSize: 16, fontFamily:'Lato-Bold', color: '#fc6643', marginTop: 3}}>
                  {this.props.name}
              </Text>
              <Text style = {{paddingTop: 8, fontSize: 16, fontFamily:'Lato-Bold', color: '#323232'}}>
                  ₹ {this.state.price}
              </Text>
              <Text style = {{paddingTop: 8, fontSize: 14, fontFamily:'Lato-Regular', color: 'gray'}}>
                  {this.props.description} 
              </Text>
          </View>
          <View style = {{justifyContent: 'center', alignItems:'center',  width:'40%'}}>
              <Text style = {{fontSize: 15, fontFamily:'Lato-Bold', color: '#585858', textTransform:'uppercase'}}>
                  Sold out!
              </Text>
          </View>
      </View> 
      )
    }
    else return (
        <View style = {{flexDirection:'row', borderRadius: 10, margin: 5, width: Dimensions.get('window').width * 0.95, backgroundColor:'#fff'}}>
            <View style = {{ padding: 10, width: '60%' }}>
                <Text style = {{fontSize: 16, fontFamily:'Lato-Bold', color: '#fc6643', marginTop: 3}}>
                    {this.props.name}
                </Text>
                <Text style = {{paddingTop: 8, fontSize: 16, fontFamily:'Lato-Bold', color: '#323232'}}>
                    ₹ {this.state.price}
                </Text>
                <Text style = {{paddingTop: 8, fontSize: 14, fontFamily:'Lato-Regular', color: 'gray'}}>
                    {this.props.description} 
                </Text>
                <View style = {{  borderRadius: 10, backgroundColor: "#fdfaf8", marginTop: 10, padding:8}}>
                    <View style = {{flexDirection:'row'}}>
                        <Text style = {{ fontSize: 14, fontFamily:'Lato-Bold', color: '#464646'}}>
                            Total: {' '} 
                            <Text style = {{color: '#fc6643'}}>
                                ₹{this.state.total}
                            </Text>
                        </Text>
                    </View> 
                    <Text style = {{ fontSize: 14, fontFamily:'Lato-Bold', color: '#464646'}}>
                        Quantity: {' '} 
                        <Text style = {{color: '#fc6643'}}>
                            {this.state.quantity}
                        </Text>
                    </Text>

                </View>
            </View>
            <View style = {{justifyContent: 'center', alignItems:'center',  width:'40%'}}>
                <NumericInput 
                    minValue = {0}
                    maxValue = {this.props.max_buy}
                    value = {this.props.quantity} 
                    onChange = {(quantity) => this.onQuantChange(quantity)} 
                    totalWidth = {100} 
                    totalHeight = {40} 
                    iconSize = {10}
                    step = {1}
                    rounded = {true}
                    textColor = '#585858' 
                    iconStyle ={{ color: 'white' }} 
                    rightButtonBackgroundColor = '#fc6643' 
                    leftButtonBackgroundColor = '#fc6643'
                    editable = {false}
                />
                
            </View>
        </View> 
    )
  }
}
