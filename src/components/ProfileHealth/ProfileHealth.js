import {React, useEffect, useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

import Icons from '../../common/Icons/Icons';
import WeightScreen from './WeightScreen';
import HeightScreen from './HeightScreen';
import HealthStatus from './HealthStatus';
import {NAVIGATION_MAIN} from '../../navigation/routes';
import BaseProfile from './BaseProfile';
import {useDispatch} from 'react-redux';
import {registerUserAction} from '../../store/user/userAction';
const Profile = ({navigation, route}) => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const onPressBack = () => {
    if (step === 0) {
      return;
    }
    setStep(prev => (prev -= 1));
  };
  const handleComplete = val => {
    const temp = {
      ...profile,
      ...val,
    };
    setProfile(temp);
    console.log('BODY TO PUSH;;;', temp);
    // dispatch(registerUserAction(temp));
    navigation &&
      navigation.reset({
        index: 0,
        routes: [{name: NAVIGATION_MAIN}],
      });
  };
  const updateProfile = user => {
    if (!profile) {
      setProfile({...user, phone: route.params.phone});
    } else {
      const tempProfile = {
        ...profile,
        ...user,
      };
      setProfile(tempProfile);
    }
    setStep(prev => (prev += 1));
  };
  useEffect(() => {
    console.log('Profile updated::', profile);
  }, [profile]);
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {/* BUTTON BACK */}
        <TouchableOpacity onPress={onPressBack} style={styles.buttonBack}>
          <Icons
            type={'Feather'}
            name={'arrow-left'}
            size={24}
            color={'#3C3C3C'}
          />
        </TouchableOpacity>
        {step === 0 && <BaseProfile nextStep={val => updateProfile(val)} />}
        {step === 1 && <WeightScreen nextStep={val => updateProfile(val)} />}
        {step === 2 && <HeightScreen nextStep={val => updateProfile(val)} />}
        {step === 3 && <HealthStatus nextStep={val => handleComplete(val)} />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
