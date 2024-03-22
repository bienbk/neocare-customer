import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SuperTokens from 'supertokens-react-native';

import RootNavigation from 'navigation/RootNavigation';
import {LogBox, TextInput} from 'react-native';
import {setCustomText} from 'react-native-global-props';
import {KEY_ONE_SIGNAL} from './assets/constans';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const customTextProps = {
  allowFontScaling: false,
};

const App = () => {
  useEffect(() => {
    setCustomText(customTextProps);
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    console.disableYellowBox = true;
    // console.log('SuperTokens', SuperTokens);
    LogBox.ignoreAllLogs();
  }, []);

  useEffect(() => {
    // OneSignal.initialize(KEY_ONE_SIGNAL);

    // // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    // OneSignal.promptForPushNotificationsWithUserResponse();

    // //Method for handling notifications received while app in foreground
    // OneSignal.setNotificationWillShowInForegroundHandler(
    //   notificationReceivedEvent => {
    //     console.log(
    //       'OneSignal: notification will show in foreground:',
    //       notificationReceivedEvent,
    //     );
    //     let notification = notificationReceivedEvent.getNotification();
    //     console.log('notification: ', notification);
    //     const data = notification.additionalData;
    //     console.log('additionalData: ', data);
    //     // Complete with null means don't show a notification.
    //     notificationReceivedEvent.complete(notification);
    //   },
    // );

    // //Method for handling notifications opened
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log('OneSignal: notification opened:', notification);
    // });

    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize(KEY_ONE_SIGNAL);

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    // OneSignal.Notifications.addEventListener('click', event => {
    //   console.log('OneSignal: notification clicked:', event);
    // });
  }, []);

  return <RootNavigation />;
};

export default App;
