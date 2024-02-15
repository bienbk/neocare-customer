import {React, useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

import Icons from '../../common/Icons/Icons';
import WeightScreen from './WeightScreen';
import HeightScreen from './HeightScreen';
import HealthStatus from './HealthStatus';
import {NAVIGATION_MAIN} from '../../navigation/routes';
const Profile = ({navigation}) => {
  const [step, setStep] = useState(1);
  const onPressBack = () => {
    if (step === 1) {
      navigation.pop();
    }
    setStep(prev => (prev -= 1));
  };
  const handleComplete = () => {
    console.log('COMPLETE:::', NAVIGATION_MAIN);
    navigation &&
      navigation.reset({
        index: 0,
        routes: [{name: NAVIGATION_MAIN}],
      });
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {/* BUTTON BACK */}
        <TouchableOpacity onPress={onPressBack} style={styles.buttonBack}>
          <Icons
            type={'Ionicons'}
            name={'chevron-back'}
            size={26}
            color={'#3C3C3C'}
          />
        </TouchableOpacity>
        {step === 1 && (
          <WeightScreen nextStep={() => setStep(prev => (prev += 1))} />
        )}
        {step === 2 && (
          <HeightScreen nextStep={() => setStep(prev => (prev += 1))} />
        )}
        {step === 3 && <HealthStatus nextStep={handleComplete} />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
