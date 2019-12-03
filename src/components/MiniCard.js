import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { withNavigation } from 'react-navigation';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const MiniCard = props => (
    <TouchableOpacity 
        style = {{ width: '90%', height: heightPercentageToDP(6.5), backgroundColor: '#ffffff', marginTop: 6, borderColor: '#c1c1c1', borderWidth: 0.7, borderRadius: 8, elevation: 3 }}
        onPress = {props.navigates}
        activeOpacity = {0.65}
    >
        <View style = {{flex: 1, flexDirection:'row'}}>
            <View style = {{ width: '70%', flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
                <Image 
                    style = {{width: props.imgWidth, height: props.imgHeight, marginLeft: 15}}
                    source= {props.icon}
                />
                <Text style = {{marginLeft: 15, fontSize: 16, fontFamily: 'Lato-Bold', color: '#525252'}}>
                    {props.name}
                </Text>
            </View>
            <View style = {{width: '30%', flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center', paddingRight: 10}}>
                <Image 
                    style = {{width: 7, height: 11}}
                    source={require('../assets/icons/aArrow.png')}
                />
            </View>
        </View>
    </TouchableOpacity>
            
)

export default withNavigation(MiniCard);
