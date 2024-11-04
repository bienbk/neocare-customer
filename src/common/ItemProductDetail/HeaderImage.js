import React from 'react';
import {StyleSheet, Animated} from 'react-native';
// import Animated from 'react-native-reanimated';
import {doctor_detail, heightDevice, widthDevice} from '../../assets/constans';

// const {Extrapolate, interpolate} = Animated;

export const HEADER_IMAGE_HEIGHT = heightDevice / 3;
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: HEADER_IMAGE_HEIGHT,
    width: widthDevice,
    resizeMode: 'cover',
  },
});

// interface HeaderImageProps {
//   y: Animated.Value<number>;
// }

export default ({y}) => {
  const translateY = {
    transform: [
      {
        translateY: y.interpolate({
          inputRange: [0, HEADER_IMAGE_HEIGHT],
          outputRange: [0, -HEADER_IMAGE_HEIGHT],
          extrapolateRight: 'clamp',
        }),
      },
    ],
  };
  return (
    <Animated.Image source={doctor_detail} style={[styles.image, translateY]} />
  );
};
