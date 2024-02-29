import React, {useEffect, useRef, useState} from 'react';
import {Platform, View, SafeAreaView, Text} from 'react-native';
import styles from './styles';

// import {useDispatch} from 'react-redux';
import {TextHighLightBold, TextMoneyBold} from '../../common/Text/TextFont';
import {NAVIGATION_LOGIN, NAVIGATION_MAIN} from '../../navigation/routes';
import {asyncStorage} from '../../store';

const Splash = ({navigation}) => {
  // const dispatch = useDispatch();
  useEffect(() => {
    checkUser();
    // setTimeout(() => {
    //   navigation && navigation.navigate(NAVIGATION_LOGIN);
    // }, 2000);
  }, []);
  const checkUser = async () => {
    const user = (await asyncStorage.getUser()) || -1;
    if (user !== -1 && user && user?.phone) {
      navigation.navigate(NAVIGATION_MAIN);
    } else {
      setTimeout(() => {
        navigation && navigation.navigate(NAVIGATION_LOGIN);
      }, 2000);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TextMoneyBold>WELCOME TO NEO CARE</TextMoneyBold>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
