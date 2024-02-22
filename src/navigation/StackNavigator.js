import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NAVIGATION_CONNECTION,
  NAVIGATION_DOCTOR_DETAIL,
  NAVIGATION_HEALTH_MANUAL,
  NAVIGATION_LOGIN,
  NAVIGATION_MAIN,
  NAVIGATION_PACKAGE_DETAIL,
  NAVIGATION_PROFILE,
  NAVIGATION_PROFILE_HEALTH,
  NAVIGATION_SPLASH,
  NAVIGATION_VERIFY_CODE,
} from './routes';
import * as Screens from 'components';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={NAVIGATION_SPLASH}>
      <Stack.Screen name={NAVIGATION_MAIN} component={Screens.Main} />
      <Stack.Screen name={NAVIGATION_SPLASH} component={Screens.Splash} />
      <Stack.Screen name={NAVIGATION_LOGIN} component={Screens.Login} />
      <Stack.Screen
        name={NAVIGATION_VERIFY_CODE}
        component={Screens.VerifyCode}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_DOCTOR_DETAIL}
        component={Screens.DoctorDetail}
      />
      <Stack.Screen name={NAVIGATION_PROFILE} component={Screens.Profile} />
      <Stack.Screen
        name={NAVIGATION_PROFILE_HEALTH}
        component={Screens.ProfileHealth}
      />
      <Stack.Screen
        name={NAVIGATION_HEALTH_MANUAL}
        component={Screens.HealthManual}
      />
      <Stack.Screen
        name={NAVIGATION_PACKAGE_DETAIL}
        component={Screens.PackageDetail}
      />
      <Stack.Screen
        name={NAVIGATION_CONNECTION}
        component={Screens.Connection}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
