import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BloodPressure from './BloodPressure';
import BloodSugar from './BloodSugar';

const HealthManual = ({navigation, route}) => {
  // 1 - HUYET AP, 2 - DUONG HUYET, 3 - MO MAU
  const [typeManual, setTypeManual] = useState(-1);
  useEffect(() => {
    const {id} = route.params;
    setTypeManual(id);
  }, []);
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      {typeManual === 1 && <BloodPressure navigation={navigation} />}
      {typeManual === 2 && <BloodSugar navigation={navigation} />}
    </SafeAreaView>
  );
};

export default HealthManual;
