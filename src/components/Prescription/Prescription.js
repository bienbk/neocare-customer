import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Colors from 'theme/Colors';

import DetailProduct from '../../common/DetailProduct/DetailProduct';
const Prescription = ({navigation}) => {
  // const scrollY = useRef(new Animated.Value(0)).current;
  // const onScroll = Animated.event(
  //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
  //   {useNativeDriver: true},
  // );
  // const onBack = () => navigation && navigation.navigate(NAVIGATION_ACCOUNT);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <DetailProduct />
    </SafeAreaView>
  );
};

export default Prescription;

const styles = StyleSheet.create({
  safeAreaView: {backgroundColor: Colors.backgroundColor, flex: 1},
});
