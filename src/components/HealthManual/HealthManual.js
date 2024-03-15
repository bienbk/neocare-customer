import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import styles from './styles';
import BloodPressure from './BloodPressure';
import BloodSugar from './BloodSugar';
import Cholesterol from './Cholesterol';
import HbA1c from './HbA1c';
import AxitUric from './AxitUric';

const HealthManual = ({navigation, route}) => {
  // 1 - HUYET AP, 2 - DUONG HUYET, 3 - MO MAU, 4 - HbA1c
  const [typeManual, setTypeManual] = useState(-1);
  useEffect(() => {
    const {id} = route.params;
    setTypeManual(id);
  }, []);
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      {typeManual === 1 && <BloodPressure navigation={navigation} />}
      {typeManual === 2 && <BloodSugar navigation={navigation} />}
      {typeManual === 3 && <Cholesterol navigation={navigation} />}
      {typeManual === 4 && <HbA1c navigation={navigation} />}
      {typeManual === 5 && <AxitUric navigation={navigation} />}
    </SafeAreaView>
  );
};

export default HealthManual;
