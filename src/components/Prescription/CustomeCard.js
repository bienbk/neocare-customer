import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {heightDevice, widthDevice} from '../../assets/constans';
const MARGIN = 8;
// const CARD_HEIGHT = 150;
const CARD_HEIGHT = 150 + MARGIN * 2;
const height = heightDevice - 65;
const CustomeCard = ({item, index, scrollY}) => {
  const position = Animated.subtract(index * CARD_HEIGHT, scrollY);
  const isDisappeared = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    scrollY,
    scrollY.interpolate({
      inputRange: [0, 0.0001 + index * CARD_HEIGHT],
      outputRange: [0, -index * CARD_HEIGHT],
      extrapolate: 'clamp',
    }),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp',
    }),
  );
  const scale = position.interpolate({
    inputRange: [isDisappeared, isTop, isBottom, isAppearing],
    outputRange: [0.2, 1, 1, 0.2],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappeared, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        styles.containerCardItem,
        {
          transform: [{translateY}, {scale}],
          opacity,
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16,
          )}`,
        },
      ]}>
      <Text>{'CustomeCard'}</Text>
    </Animated.View>
  );
};

export default CustomeCard;

const styles = StyleSheet.create({
  containerCardItem: {
    height: 150,
    marginVertical: MARGIN,
    alignSelf: 'center',
    width: widthDevice - 30,
    borderRadius: 12,
    padding: 10,
  },
});
