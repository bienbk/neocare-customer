import * as React from 'react';
import {StyleSheet, Animated} from 'react-native';

import Tab from './Tab';

const styles = StyleSheet.create({
  overlay: {
    flexDirection: 'row',
  },
});

export default ({tabs, activeTab, onPress}) => {
  const refView = React.useRef(null);
  React.useEffect(() => {
    console.log('refView:::::::', refView);
    refView &&
      refView?.current?.scrollTo({
        animated: true,
        index: activeTab,
        viewOffset: 100,
      });
  }, [activeTab]);
  return (
    <Animated.ScrollView
      horizontal
      ref={refView}
      showsHorizontalScrollIndicator={false}
      style={[styles.overlay]}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          activeTab={activeTab === index}
          color={activeTab === index ? 'white' : 'gray'}
          onPress={onPress ? onPress.bind(null, index) : undefined}
          {...tab}
        />
      ))}
    </Animated.ScrollView>
  );
};
