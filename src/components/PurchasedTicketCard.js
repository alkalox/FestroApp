import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';


items = (props) => {
     return props.user_tickets[0].map((data, ticket_number) => 
         (
            <Text style = {{ marginTop: 3, fontSize: 14, fontFamily:'Lato-Regular', color: '#3b3b3b'}} key = {ticket_number}>
                {data.quantity} x {data.name}
            </Text>
        )
      )
  }
  
const PurchasedTicket = props => (
<View style = {{borderWidth: 1, borderColor:'#dbdbdb', marginBottom: 20, flex: 1}}>
    <TouchableOpacity
    activeOpacity={0.6}
    onPress = {() => 
        props.navigation.navigate('TicketDetails', {
            amount: props.amount,
            order_number: props.order_number,
            user_tickets: props.user_tickets,
            registration: props.registration,
            date_created: props.date_created,
        })}
    >
        <View style = {{padding: 15, justifyContent: 'flex-start', flexWrap: 'wrap', backgroundColor:'#fff'}}>
            <Text style = {{ fontSize: 16, fontFamily:'Lato-Bold', color: '#fc6643'}} >
                {props.user_tickets[1].title}
            </Text>
            <View style = {{marginTop: 10, flexDirection: 'row'}}>
                <Image 
                    style = {{marginRight: 5, height : 15, width: 15}}
                    source={require('../assets/calendar.png')}
                />
                <Text style = {{ fontSize: 14, fontFamily:'Lato-Regular', color: '#3b3b3b'}}>
                    {props.user_tickets[1].start_date} {props.user_tickets[1].start_time}
                </Text>
            </View>
            <View style = {{marginTop: 10, flexDirection: 'row'}}>
                <Image 
                    style = {{marginRight: 5, height : 15.2, width: 15}}
                    source={require('../assets/location.png')}
                />
                <Text style = {{ fontSize: 14, fontFamily:'Lato-Regular', color: '#3b3b3b'}}>
                    {props.user_tickets[1].venue}
                </Text>
            </View>
        </View>
        <View style = {{ justifyContent: 'flex-end', flexDirection:'row', flexWrap: 'wrap', backgroundColor:'#f1f1f1'}}>
            <View style = {{ flexDirection:'column', width: '65%', padding: 15}}>
                <Text style = {{ fontSize: 14, fontFamily:'Lato-Bold', color: '#585858'}}>
                Items
                </Text>
                {items(props)}
            </View>
            <View style = {{width:'35%', backgroundColor:'#f1f1f1', justifyContent:'center', alignItems:'center'}}>
                <View style = {{padding: 10, backgroundColor:'#fff', borderColor: '#323232', borderRadius: 10, borderWidth: 1 }}>
                    <Text style = {{ fontSize: 12, fontFamily:'Lato-Bold', color: '#585858'}}>
                        View Details
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
</View>
)

export default withNavigation(PurchasedTicket);