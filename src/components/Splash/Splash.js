import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';
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
import Status from 'common/Status/Status';
import {CommonActions} from '@react-navigation/native';
import Svg from 'common/Svg/Svg';
import Colors from 'theme/Colors';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const statusGetUserInfo = useSelector(state => getStatusGetUserInfo(state));
  useEffect(() => {
    dispatch(getUserInfoAction());
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
    setTimeout(() => {
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
    }, 1000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Svg name={'brand_name'} size={220} />
        <View style={styles.decorator}>
          <Svg name={'icon_splash'} size={300} color={Colors.primary} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
