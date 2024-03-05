import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';

// import {useDispatch} from 'react-redux';
import {TextMoneyBold} from '../../common/Text/TextFont';
import {NAVIGATION_LOGIN, NAVIGATION_MAIN} from '../../navigation/routes';
import {asyncStorage} from '../../store';

const Splash = ({navigation}) => {
  // const dispatch = useDispatch();
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    const token = (await asyncStorage.getToken()) || -1;

    if (token !== -1 && token && token?.frontToken) {
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
