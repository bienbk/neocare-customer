import React from 'react';
import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import Icons from '../Icons/Icons';
import {NAVIGATION_ACCOUNT} from '../../navigation/routes';
import {TextNormal} from '../Text/TextFont';
import Tabs from './Tabs';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
// const {interpolate, } = Animated;

export default ({y, tabs, navigation, scrollView}) => {
  console.log(scrollView);
  const [activeTab, setActiveTab] = React.useState(0);
  y.addListener(position => {
    if (tabs.length > 0) {
      tabs.map((t, index) => {
        if (
          t.anchor < position.value &&
          tabs[index + 1]?.anchor > position.value
        ) {
          setActiveTab(index);
        } else if (
          !tabs[index + 1] &&
          position.value > tabs[tabs.length - 1].anchor
        ) {
          setActiveTab(tabs.length - 1);
        }
      });
    }
  });
  const translateX = y.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: 'clamp',
  });
  const translateY = y.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, 0],
    extrapolateRight: 'clamp',
  });
  const headerY = y.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });
  const opacity = y.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: headerY}]}]}>
      <Animated.View
        style={{
          opacity,
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_ACCOUNT)}>
          <View>
            <Icons
              type={'Feather'}
              name="arrow-left"
              size={ICON_SIZE}
              color="white"
            />
            <Animated.View style={{...StyleSheet.absoluteFillObject}}>
              <Icons
                type={'Feather'}
                name="arrow-left"
                size={ICON_SIZE}
                color="black"
              />
            </Animated.View>
          </View>
        </TouchableOpacity>
        <Animated.View style={[{transform: [{translateX}, {translateY}]}]}>
          <TextNormal style={styles.title}> Miss Miu Europaallee</TextNormal>
        </Animated.View>
      </View>
      <Animated.View
        style={{
          opacity,
        }}>
        <Tabs {...{tabs, activeTab}} />
      </Animated.View>
      {/* <TabHeader {...{y, tabs, scrollView, opacity, activeTab}} /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    right: 0,
    height: 90,
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  title: {
    // fontFamily: 'UberMoveMedium',
    fontSize: 18,
    marginLeft: PADDING,
    paddingTop: 10,
    flex: 1,
  },
});
