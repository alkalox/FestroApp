import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import firebase from 'react-native-firebase';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const Form = withNextInputAutoFocusForm(View);

const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3),
  email: Yup.string()
    .required("Email is required")
    .email("Well that's not an email"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(phoneRegExp, "That's not a valid mobile number."),
});

export default class Registration extends React.Component {
  static navigationOptions = {
    title: 'Registration',
  }

  render() {
    firebase.analytics().setCurrentScreen('Registration')
    return (
      <Formik
        onSubmit={values => {
          this.props.navigation.navigate('Checkout', {
            name: values.name,
            email : values.email,
            mobile: values.mobile,
            event_id: this.props.navigation.getParam('event_id'),
            tickets: this.props.navigation.getParam('tickets'),
            eventName: this.props.navigation.getParam('eventName'),
          })
        }}
        validationSchema={validationSchema}
        render={props => {
          return (
            <ScrollView 
              keyboardDismissMode = 'on-drag' 
              keyboardShouldPersistTaps = 'always' 
              contentContainerStyle={{ flexGrow: 1}} 
              style = {{flex: 1, backgroundColor: "#fdfaf8"}}
            >
              <View style = {{margin: 20, marginTop: 10}}>
                <Text style = {{fontSize: 18, fontFamily:'Lato-Bold', color: '#323232'}}> 
                  Enter your registration details 
                </Text>
                <Text style = {{marginTop: 5, fontSize: 13, fontFamily:'Lato-Regular', color: '#323232'}}>
                  Your tickets will be issued using the details you enter below
                </Text>
                <Form>
                  <MyInput label="Name" name="name" type="name" tintColor = "#fc6643" titleFontSize = {13} maxLength = {40}/>
                  <MyInput label="Email" name="email" type="email" tintColor = "#fc6643" titleFontSize = {13}/>
                  <MyInput label="Mobile" name="mobile" type="digits" tintColor = "#fc6643" titleFontSize = {13} maxLength = {10}/>
                </Form>
              </View>
              <TouchableOpacity 
                style = {{position: 'absolute', bottom: 0, width: Dimensions.get('window').width, height: 48, backgroundColor:'#fc6643', justifyContent:'center', alignItems:'center'}}
                activeOpacity = {0.7}
                onPress = {props.handleSubmit}
                >
                <Text style = {{fontSize: 16, fontFamily:'Lato-Regular', color: '#fff', textTransform:'uppercase'}}> 
                  Proceed to Payment 
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      />    
    )
  }
} // end of component
  

