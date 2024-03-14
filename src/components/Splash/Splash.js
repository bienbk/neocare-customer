import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';

// import {useDispatch} from 'react-redux';
import {TextMoneyBold} from '../../common/Text/TextFont';
import {
  NAVIGATION_LOGIN,
  NAVIGATION_MAIN,
  NAVIGATION_PROFILE_HEALTH,
} from '../../navigation/routes';
import SuperTokens from 'supertokens-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {statusUpdateUserSelector, getStatusGetUserInfo} from 'store/selectors';
import {getUserInfoAction} from '../../store/user/userAction';
import {asyncStorage} from '../../store';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const statusUpdateUser = useSelector(state =>
    statusUpdateUserSelector(state),
  );
  const statusGetUserInfo = useSelector(state => getStatusGetUserInfo(state));
  useEffect(() => {
    dispatch(getUserInfoAction());
    // checkUser();
  }, []);

  useEffect(() => {
    checkUser();
  }, [statusUpdateUser, statusGetUserInfo]);

  async function doesSessionExist() {
    if (await SuperTokens.doesSessionExist()) {
      return true;
    } else {
      return false;
    }
  }
  const checkUser = async () => {
    // const token = (await asyncStorage.getToken()) || -1;
    const hasToken = await doesSessionExist();
    const user = (await asyncStorage.getUser()) || {id: -1};
    console.log('user async storeage:::@@@@@@@@@@@@@@@@@@', user);

    if (hasToken && !user.info_submitted) {
      navigation.navigate(NAVIGATION_PROFILE_HEALTH);
    } else if (hasToken) {
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
