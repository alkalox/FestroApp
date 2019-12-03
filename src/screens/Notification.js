import { Component } from 'react';

import firebase from 'react-native-firebase';

export default class Notification extends Component {

  async componentDidMount() {
    const Permission = await firebase.messaging().hasPermission();
    if (Permission) {
      this.subscribeToNotificationListeners()
    } 
    else {
      firebase.messaging().requestPermission().then(() => {
        this.subscribeToNotificationListeners()
      }).catch(error => {
          console.error(error);
        })
    }
  }

  async subscribeToNotificationListeners() {
    const channel = new firebase.notifications.Android.Channel(
        'event-notif', // Channel
        'Event Notifications', // Channel Name that is displayed
        firebase.notifications.Android.Importance.Max
    ).setDescription('Notifications regarding Events in Festro App')
    firebase.notifications().android.createChannel(channel)
    
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        // Process your notification as required
        this.displayNotification(notification)
    })
}

displayNotification = (notification) => {
  const localNotification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
  }).setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification.subtitle)
      .setBody(notification.body)
      .setData(notification.data)
      .android.setChannelId('event-notif')
      .android.setPriority(firebase.notifications.Android.Priority.High);

  firebase.notifications()
      .displayNotification(localNotification)
      .catch(err => console.error(err));

}

componentWillUnmount() {
  this.notificationListener();
}

  render() {
    return (
      null
    );
  }
}
