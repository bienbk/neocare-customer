import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';

// import {useDispatch} from 'react-redux';
import {TextMoneyBold} from 'common/Text/TextFont';
import {
  NAVIGATION_LOGIN,
  NAVIGATION_MAIN,
  NAVIGATION_PROFILE_HEALTH,
} from 'navigation/routes';
import SuperTokens from 'supertokens-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusGetUserInfo} from 'store/selectors';
import {getUserInfoAction, resetGetUserInfo} from 'store/user/userAction';
import {asyncStorage} from 'store';
import strings from 'localization/Localization';
import Status from '../../common/Status/Status';
import {CommonActions} from '@react-navigation/native';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const statusGetUserInfo = useSelector(state => getStatusGetUserInfo(state));
  useEffect(() => {
    dispatch(getUserInfoAction());
    // checkUser();
  }, []);

  useEffect(() => {
    if (
      statusGetUserInfo === Status.SUCCESS ||
      statusGetUserInfo === Status.ERROR
    ) {
      dispatch(resetGetUserInfo());
      checkUser();
    }
  }, [statusGetUserInfo]);

  const doesSessionExist = async () => {
    const data = await SuperTokens.doesSessionExist();
    return data;
  };
  const checkUser = async () => {
    strings.setLanguage('vi');
    const hasToken = await doesSessionExist();
    const user = (await asyncStorage.getUser()) || {id: -1};

    if (hasToken) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name:
                user?.info_submitted === 0
                  ? NAVIGATION_PROFILE_HEALTH
                  : NAVIGATION_MAIN,
            },
          ],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: NAVIGATION_LOGIN}],
        }),
      );
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
