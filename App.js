import React from "react";
import { Image } from "react-native";

import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { useScreens } from 'react-native-screens';
import { fromRight } from './src/transition.js';

import HomeScreen from "./src/screens/main/HomeScreen.js";
import Favourites from "./src/screens/main/Favourites.js";
//import CreateEvent from "./src/screens/main/CreateEvent.js";
//import Categories from "./src/screens/main/Categories.js";

import {SignInScreen, AuthLoadingScreen} from "./src/screens/login/Login.js";

import Paytm from './src/screens/main/homestack/Paytm.js'
import EventDetails from './src/screens/main/homestack/EventDetails.js'
import TicketSummary from './src/screens/main/homestack/TicketSummary.js'
import Checkout from './src/screens/main/homestack/Checkout'
import FilterScreen from './src/screens/main/homestack/FilterScreen.js'
import Confirmation from './src/screens/main/homestack/Confirmation.js'
import Registration from './src/screens/main/homestack/Registration.js'

import Profile from "./src/screens/main/profilestack/Profile.js"
import PurchasedTickets from "./src/screens/main/profilestack/PurchasedTickets.js"
import Interests from "./src/screens/main/profilestack/Interests.js"
import TicketDetails from "./src/screens/main/profilestack/TicketDetails.js"
import FAQ from "./src/screens/main/profilestack/FAQ.js"
import ContactUs from "./src/screens/main/profilestack/ContactUs.js"

useScreens();

const AuthStack = createStackNavigator({ 
  SignIn: SignInScreen,
  Interests: Interests,
  },
  {
    initialRouteName: 'SignIn',
    transitionConfig: () => fromRight(),
    headerMode: 'none'
  }
)


const HomeStack = createStackNavigator(
  {
  Home: HomeScreen,
  Details: EventDetails,
  TicketSummary: TicketSummary,
  Checkout: Checkout,
  Paytm: Paytm,
  Confirmation: Confirmation,
  FilterScreen: FilterScreen,
  Registration: Registration,
  },
  {
    transitionConfig: () => fromRight(),
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fdfaf8',
        elevation: 0,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontWeight: '300',
        color: '#fc6643'
      },
    }
  }
);


HomeScreen.navigationOptions = {
  title: 'Festro',
  headerStyle: {
    backgroundColor: '#fdfaf8',
    elevation: 0,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontFamily: 'Lato-Bold',
    fontWeight: '300',
    color: '#fc6643'
  },
};


HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileStack = createStackNavigator(
  {
  Profile: Profile,
  PurchasedTickets: PurchasedTickets,
  Interests: Interests,
  TicketDetails: TicketDetails,
  FAQ: FAQ,
  ContactUs: ContactUs,
  },
  {
    transitionConfig: () => fromRight(),
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fdfaf8',
        elevation: 0,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontWeight: '300',
        color: '#fc6643'
      },
    }
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const FavouriteStack = createStackNavigator(
  {
    Favourites:Favourites,
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fdfaf8',
        elevation: 0,
      },
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontWeight: '300',
        color: '#fc6643'
      },
    }
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Explore: HomeStack,
    Favourites: FavouriteStack,
    
    Profile: ProfileStack,
  },
  {
  initialRouteName: 'Explore',
  transitionConfig: () => fromRight(),
  backBehavior: 'initialRoute',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      let imagestyle;
      if (routeName === 'Explore') {
        iconName = focused 
        ? require('./src/assets/icons/home-o.png') 
        : require('./src/assets/icons/home.png')
        imagestyle = focused ? {width:31.2, height: 31.3} : {width:18, height: 18}
        return <Image
          style = {imagestyle}
          source={iconName} 
        />
      } 
      
      else if (routeName === 'Favourites') {
        iconName = focused 
        ? require('./src/assets/icons/favourite-o.png') 
        : require('./src/assets/icons/favourite.png')
        imagestyle = focused ? {width:31.2, height: 31.3} : {width:19.7, height: 18.3}
        return <Image
          style = {imagestyle}
          source={iconName} 
        />
      }

      else if (routeName === 'Profile') {
        iconName = focused 
        ? require('./src/assets/icons/profile-o.png') 
        : require('./src/assets/icons/profile.png')
        imagestyle = focused ? {width:31.2, height: 31.3} : {width:16, height: 20}
        return <Image
          style = {imagestyle}
          source={iconName} 
        />
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: '#fc6643',
    inactiveTintColor: '#585858',
    labelStyle: {
      fontSize: 12,
      fontFamily: 'Lato-Bold',
    },
  },
}
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
