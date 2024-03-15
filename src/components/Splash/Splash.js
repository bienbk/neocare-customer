import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';

// import {useDispatch} from 'react-redux';
import {TextMoneyBold} from '../../common/Text/TextFont';
import {NAVIGATION_LOGIN, NAVIGATION_MAIN} from '../../navigation/routes';
import SuperTokens from 'supertokens-react-native';
import {asyncStorage} from '../../store';
import strings from '../../localization/Localization';

const Splash = ({navigation}) => {
  // const dispatch = useDispatch();
  useEffect(() => {
    checkUser();
  }, []);

  async function doesSessionExist() {
    if (await SuperTokens.doesSessionExist()) {
      return true;
    } else {
      return false;
    }
  }
  const checkUser = async () => {
    strings.setLanguage('vi');
    // const token = (await asyncStorage.getToken()) || -1;
    const hasToken = await doesSessionExist();

    if (hasToken) {
      navigation.navigate(NAVIGATION_MAIN);
    } else {
      setTimeout(() => {
        navigation && navigation.navigate(NAVIGATION_LOGIN);
      }, 500);
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
