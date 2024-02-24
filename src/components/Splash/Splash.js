import React, {useEffect, useRef, useState} from 'react';
import {Platform, View, SafeAreaView, Text} from 'react-native';
import styles from './styles';

// import {useDispatch} from 'react-redux';
import {TextHighLightBold, TextMoneyBold} from '../../common/Text/TextFont';
import {NAVIGATION_LOGIN} from '../../navigation/routes';

const Splash = ({navigation}) => {
  // const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      navigation && navigation.navigate(NAVIGATION_LOGIN);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TextMoneyBold>WELCOME TO NEO CARE</TextMoneyBold>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
