import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {defaultTabs} from './Content';
import {heightDevice} from 'assets/constans';
import {FlashList} from '@shopify/flash-list';
const itemCoordinates = [];
export default () => {
  const tabs = useSharedValue(defaultTabs);
  const translationY = useSharedValue(0);
  const positionY = useRef(new Animated.Value(0)).current;
  const messureContent = useSharedValue([]);
  const [currentTab, setCurrentTab] = useState(0);
  const contentRef = useRef(null);
  const tabRef = useRef(null);
  const scrollHandler = event => {
    if (!messureContent.value.length) {
      return;
    }
    const {y} = event.nativeEvent.contentOffset;
    const listMessure = messureContent.value;
    if (listMessure[listMessure.length - 1] < y) {
      setCurrentTab(listMessure.length - 1);
    } else if (listMessure[1] > y) {
      setCurrentTab(0);
      tabRef.current.scrollToIndex({
        animated: true,
        index: 0,
        viewOffset: 0,
      });
    }
    const indexed = listMessure.findIndex(
      (_, index) =>
        y > listMessure[index] &&
        index + 1 < listMessure.length &&
        y < listMessure[index + 1],
    );
    if (indexed !== currentTab && indexed !== -1) {
      tabScrollToIndex(indexed);
      setCurrentTab(indexed);
    }
    translationY.value = y;
    positionY.setValue(y);
  };
  const tabScrollToIndex = indexed => {
    tabRef &&
      tabRef.current &&
      tabRef.current.scrollToIndex({
        animated: true,
        index: indexed,
        viewOffset: 0,
      });
  };

  const handlePressTab = i => {
    if (contentRef && contentRef.current) {
      contentRef.current.scrollToIndex({
        animated: true,
        index: i,
        viewOffset: 0,
      });
    }
    tabScrollToIndex(i);
  };
  const scrollToHandler = (error, ref, list = []) => {
    if (!ref || !ref.current || !list) {
      return;
    }
    ref?.current.scrollToOffset({
      offset: error.averageItemLength * error.index,
      animated: true,
    });

    ref.current.scrollToIndex({
      index: error.index,
      animated: true,
    });
  };
  const handleItemLayout = index => event => {
    const {x, y, width, height} = event.nativeEvent.layout;
    itemCoordinates[index] = {x, y, width, height};
    const outputArray = itemCoordinates.reduce(
      (accumulator, currentValue) => {
        if (accumulator.length === 0) {
          accumulator.push(currentValue.height);
        } else {
          const lastSum = accumulator[accumulator.length - 1];
          const newSum = lastSum + currentValue.height;
          accumulator.push(newSum);
        }
        return accumulator;
      },
      [0],
    );
    messureContent.value = outputArray;
  };
  const headerAnimation = type => ({
    transform: [
      {
        translateY: positionY.interpolate({
          inputRange: [0, 100],
          outputRange: type === 1 ? [-100, 0] : [0, -100],
          extrapolate: 'clamp',
        }),
      },
    ],
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.containerTab,
          headerAnimation(1),
          {position: 'absolute', top: 0},
        ]}>
        <FlatList
          data={tabs.value}
          horizontal
          ref={tabRef}
          keyExtractor={i => i.name}
          onScrollToIndexFailed={er => scrollToHandler(er, tabRef, tabs.value)}
          // keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[currentTab === index && styles.activeTabs, styles.tabs]}
              onPress={() => handlePressTab(index)}>
              <View key={index} style={[styles.tab]}>
                <Text
                  style={[
                    styles.text,
                    currentTab === index && {color: 'green'},
                  ]}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
      <View style={{flex: 1}}>
        <Animated.View style={[styles.containerTab, headerAnimation(2)]}>
          <View>
            <Text style={styles.text}>HELLLOOOOOO</Text>
          </View>
        </Animated.View>
        <FlashList
          data={tabs.value}
          keyExtractor={(_, i) => i}
          onScroll={scrollHandler}
          ref={contentRef}
          onScrollToIndexFailed={er =>
            scrollToHandler(er, contentRef, messureContent.value)
          }
          renderItem={({_, index}) => (
            <View
              key={index}
              style={[styles.box]}
              onLayout={handleItemLayout(index)}>
              <Text style={styles.center}>{index}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTabs: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  tabs: {
    alignItems: 'center',
    // height: 70,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  animatedBorder: {
    height: 8,
    width: 64,
    backgroundColor: 'tomato',
    borderRadius: 20,
  },
  containerTab: {
    // position: 'absolute',
    // top: 0,
    zIndex: 100,
    elevation: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 60,
  },
  container: {
    // alignItems: 'center',
    flex: 1,
  },
  overlay: {
    backgroundColor: 'red',
  },
  activeTab: {
    backgroundColor: 'black',
    borderRadius: 16,
  },
  tab: {
    height: 40,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  scroll: {
    borderWidth: 1,
    borderColor: 'gray',
    // height: 250,
    width: 350,
    margin: 20,
    alignSelf: 'center',
    // flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: heightDevice,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#b58df1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // animatedBorder: {
  //   height: 8,
  //   width: 64,
  //   backgroundColor: 'tomato',
  //   borderRadius: 20,
  // },
  center: {
    textAlign: 'center',
  },
});

// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
// Animated.addWhitelistedNativeProps({text: true});

// function AnimatedText({text, ...props}) {
//   const animatedProps = useAnimatedProps(() => ({text: text.value}));
//   return (
//     <AnimatedTextInput
//       editable={true}
//       {...props}
//       value={text.value}
//       animatedProps={animatedProps}
//     />
//   );
// }
