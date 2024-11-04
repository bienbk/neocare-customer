import React, {useState} from 'react';
import {Platform, StyleSheet, View, Animated} from 'react-native';
import Tabs from './Tabs';

import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
export default ({y, tabs, activeTab}) => {
  const opacity = y.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  // const translateX = y.interpolate({
  //   inputRange: [...tabs.map(tab => tab.anchor)],
  //   outputRange: [...tabs.map((_, i) => -i * 40)],
  //   extrapolate: 'clamp',
  // });
  // console.log(...tabs.map(tab => tab.anchor), ...tabs.map((_, i) => -i * 40));
  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
        }}>
        <Tabs {...{tabs, activeTab}} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: 'row',
  },
});
