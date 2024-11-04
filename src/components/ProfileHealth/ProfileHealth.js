import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {NAVIGATION_MAIN} from 'navigation/routes';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import BaseProfile from './BaseProfile';
import {updateUserInformation} from 'store/actions';
import Status from 'common/Status/Status';
import {resetUpdateUser} from 'store/user/userAction';
import {statusUpdateUserSelector} from 'store/selectors';
import {CommonActions} from '@react-navigation/native';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const statusUpdateUser = useSelector(state =>
    statusUpdateUserSelector(state),
  );
  React.useEffect(() => {
    if (statusUpdateUser === Status.SUCCESS) {
      dispatch(resetUpdateUser());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: NAVIGATION_MAIN}],
        }),
      );
    }
  }, [statusUpdateUser]);
  const submitUserInfo = payload => {
    dispatch(updateUserInformation(payload));
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <BaseProfile next={payload => submitUserInfo(payload)} />
        {/* {step === 1 && <WeightScreen nextStep={val => updateProfile(val)} />}
        {step === 2 && <HeightScreen nextStep={val => updateProfile(val)} />}
        {step === 3 && <HealthStatus nextStep={val => handleComplete(val)} />} */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
