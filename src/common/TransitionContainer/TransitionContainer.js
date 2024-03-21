import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {widthDevice} from 'assets/constans';

const TransitionContainer = ({children}) => {
  const transition = new Animated.Value(-widthDevice);
  useEffect(() => {
    animatedAction(transition);
  }, []);
  const animatedAction = val => {
    Animated.timing(val, {
      duration: 600,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View style={{transform: [{translateX: transition}]}}>
      {children}
    </Animated.View>
  );
};

export default TransitionContainer;
