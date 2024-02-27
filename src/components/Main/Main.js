import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Screens from 'components';
import {NAVIGATION_HOME} from 'navigation/routes';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from 'theme/Colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg from 'common/Svg/Svg';
import {TextSmallEleven} from 'common/Text/TextFont';
import {widthDevice} from 'assets/constans';
import strings from 'localization/Localization';
import {
  NAVIGATION_ACCOUNT,
  NAVIGATION_DOCTOR_DETAIL,
  NAVIGATION_MY_DOCTOR,
} from '../../navigation/routes';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackAccount = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={NAVIGATION_DOCTOR_DETAIL}>
      {/* <Stack.Screen name={NAVIGATION_ACCOUNT} component={Screens.Account} />
      <Stack.Screen
        name={NAVIGATION_ACCOUNT_INFO}
        component={Screens.AccountInfo}
      />
      <Stack.Screen
        name={NAVIGATION_ACCOUNT_ORDER_HISTORY}
        component={Screens && Screens.HistoryOrder ? Screens.HistoryOrder : ''}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION_DOCTOR_DETAIL}
        component={Screens.DoctorDetail}
      /> */}
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
      [NAVIGATION_HOME]: 'icon_home_main',
      [NAVIGATION_MY_DOCTOR]: 'icon_heart_main',
      ['NAVIGATION_PRESCRIBED']: 'icon_medicine_main',
      [NAVIGATION_ACCOUNT]: 'icon_account_main',
    };
    const title = router => {
      switch (router) {
        case NAVIGATION_HOME:
          return strings.common.home;
        case NAVIGATION_MY_DOCTOR:
          return 'Bác sĩ';
        case 'NAVIGATION_PRESCRIBED':
          return 'Chỉ định';
        case NAVIGATION_ACCOUNT:
          return strings.common.user;
        default:
      }
    };
    return (
      <TouchableOpacity style={focused ? styles.activeTab : styles.inactiveTab}>
        <Svg name={icons[route.name]} size={25} color={Colors.gray.gray30} />
        <TextSmallEleven
          style={{
            color: focused ? Colors.blue.blue20 : Colors.textGrayColor,
            fontWeight: focused ? 'bold' : '500',
          }}>
          {title(route.name)}
        </TextSmallEleven>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_MY_DOCTOR}
      screenOptions={screenOption}>
      <Tab.Screen
        name={NAVIGATION_HOME}
        component={Screens.Home}
        options={{
          title: () => null,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_MY_DOCTOR}
        component={Screens.MyDoctor}
        options={{title: () => null}}
      />
      <Tab.Screen
        name={'NAVIGATION_PRESCRIBED'}
        component={Screens.Home}
        options={{title: () => null}}
      />
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
    width: widthDevice / 5,
    // backgroundColor: 'red',
    paddingVertical: 5,
  },
  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 100,
    elevation: 1,
    width: Platform.OS === 'ios' ? 50 : 60,
    height: Platform.OS === 'ios' ? 50 : 60,
    top: Platform.OS === 'ios' ? -10 : -20,
    borderRadius: Platform.OS === 'ios' ? 25 : 30,
  },
});
