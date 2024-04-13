import React from 'react';
import Colors from '../../theme/Colors';
import Svg from '../Svg/Svg';
import {StyleSheet, View} from 'react-native';

const EmptyPage = () => {
  return (
    <View style={styles.container}>
      <Svg name={'icon_empty'} size={100} />
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
