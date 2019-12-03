import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, Image } from 'react-native';

import { withNavigation } from 'react-navigation';

const SquareButton = props => (
    <TouchableNativeFeedback 
        onPress = {() => props.navigation.navigate('FilterScreen', { filter: props.cat})}
        background={TouchableNativeFeedback.Ripple('#ffb4a5')}
    >
        <View style = {{ height: '100%', width: '21%', justifyContent: 'flex-start', alignItems:'center'}}>
            <View style = {styles.square}>
                <Image 
                    source={props.icon}  
                    style={{width: 30, height: 30 }} 
                    
                />
            </View>
            <Text style = {{fontSize: 13, fontFamily:'Lato-Bold', color: '#585858'}}>
                {props.title}
            </Text>
        </View>
    </TouchableNativeFeedback>
)

const styles = StyleSheet.create({
    square: {
      width: 30,
      height: 30,
      marginTop: 8,
      marginBottom: 5,
    }
    })
export default withNavigation(SquareButton);