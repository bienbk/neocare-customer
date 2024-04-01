import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Screens from 'components';
import {
  NAVIGATION_HOME,
  NAVIGATION_ACCOUNT,
  NAVIGATION_DOCTOR_DETAIL,
  NAVIGATION_MY_DOCTOR,
  NAVIGATION_PRESCRIPTION,
} from 'navigation/routes';
import {StyleSheet, View} from 'react-native';
import Colors from 'theme/Colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg from 'common/Svg/Svg';
import {TextSmallEleven} from 'common/Text/TextFont';
import strings from 'localization/Localization';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackAccount = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={NAVIGATION_ACCOUNT}>
      <Stack.Screen name={NAVIGATION_ACCOUNT} component={Screens.Account} />
    </Stack.Navigator>
  );
};

// icon_giohang1
const Main = () => {
  const insets = useSafeAreaInsets();
  const screenOption = ({route}) => ({
    tabBarHideOnKeyboard: true,
    tabBarIcon: e => renderItemTab(e, route),
    tabBarActiveTintColor: Colors.buttonBackground,
    tabBarInactiveTintColor: Colors.textGrayColor,
    headerShown: false,
    tabBarStyle: {height: 75 + insets.bottom / 2},
  });
  // const currentUserLanguage = useSelector(state => getCurrentLanguage(state));
  const renderItemTab = ({focused}, route) => {
    const icons = {
      [NAVIGATION_HOME]: 'icon_heart_main',
      // [NAVIGATION_MY_DOCTOR]: 'icon_mydoctor_main',
      // [NAVIGATION_PRESCRIPTION]: 'icon_medicine_main',
      [NAVIGATION_ACCOUNT]: 'icon_account_main',
    };
    const title = router => {
      switch (router) {
        case NAVIGATION_HOME:
          return 'Trang chủ';
        // case NAVIGATION_MY_DOCTOR:
        //   return 'Bác sĩ';
        // case NAVIGATION_PRESCRIPTION:
        //   return 'Chỉ định';
        case NAVIGATION_ACCOUNT:
          return strings.common.user;
        default:
      }
    };
    return (
      <View style={styles.inactiveTab}>
        <Svg
          name={icons[route.name]}
          size={25}
          color={focused ? Colors.buttonBackground : 'black'}
        />
        <TextSmallEleven
          style={{
            color: focused ? Colors.black : Colors.textGrayColor,
            fontWeight: focused ? 'bold' : '600',
          }}>
          {title(route.name)}
        </TextSmallEleven>
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_HOME}
      screenOptions={screenOption}>
      <Tab.Screen
        name={NAVIGATION_HOME}
        component={Screens.Home}
        options={{
          title: () => null,
        }}
      />
      {/* <Tab.Screen
        name={NAVIGATION_MY_DOCTOR}
        component={Screens.MyDoctor}
        options={{title: () => null}}
      /> */}
      {/* <Tab.Screen
        name={NAVIGATION_PRESCRIPTION}
        component={Screens.Prescription}
        options={{title: () => null}}
      /> */}
      <Tab.Screen
        name={NAVIGATION_ACCOUNT}
        component={Screens.Account}
        options={{title: () => null}}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  icon: {
    height: 27,
    width: 27,
  },
  styleContainerIcon: {
    marginTop: 5,
  },
  inactiveTab: {
    alignItems: 'center',
    // zIndex: 999,
    // width: widthDevice / 5,
    // backgroundColor: 'red',
    padding: 10,
  },
  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.blue.blue95,
    zIndex: 999,
    elevation: 0,
    // padding: 5,
    // width: Platform.OS === 'ios' ? 50 : 60,
    // height: Platform.OS === 'ios' ? 50 : 60,
    // top: Platform.OS === 'ios' ? -10 : -15,
    // borderRadius: Platform.OS === 'ios' ? 30 : 40,
  },
});
