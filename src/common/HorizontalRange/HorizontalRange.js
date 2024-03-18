/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {TextNormalSemiBold} from '../../common/Text/TextFont';
import {widthDevice} from '../../assets/constans';
import Colors from '../../theme/Colors';
import Icons from '../../common/Icons/Icons';
const segmentsLength = 600;
const segmentWidth = 3;
const segmentSpacing = 14;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = Math.floor((widthDevice - snapSegment) / 2) - 1;
const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment;
const indicatorWidth = 100;
const indicatorHeight = 80;

const Ruler = ({type, data}) => {
  // console.log('current data:::::::::::', data);
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      {data.map((i, id) => {
        const tenth = id % 5 === 0;
        return (
          <View key={i} style={styles.wrapperRulerItem}>
            <View
              style={[
                {
                  width: segmentWidth,
                  backgroundColor: Colors.gray.gray80,
                  borderRadius: 10,
                  height: tenth ? 40 : 25,
                  marginBottom: tenth === 0 ? 10 : 0,
                  alignSelf: 'center',
                  marginRight: segmentSpacing,
                },
              ]}
            />
            {id % 10 === 0 && (
              <View style={styles.wrapperNumberItem}>
                <TextNormalSemiBold
                  style={{
                    fontWeight: 'bold',
                    color: Colors.gray.gray60,
                  }}>
                  {parseFloat(i).toFixed(1)}
                </TextNormalSemiBold>
              </View>
            )}
          </View>
        );
      })}
      <View style={styles.spacer} />
    </View>
  );
};

const HorizontalRange = ({setValue, type, initValue, max}) => {
  const positionX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [data, setData] = useState([]);
  positionX.addListener(event => {
    if (!event) {
      return;
    }
    setValue(parseFloat(event?.value / snapSegment / 10).toFixed(1));
  });
  useEffect(() => {
    initRange();
  }, []);
  useEffect(() => {
    scrollToValue();
  }, [type]);
  const scrollToValue = () => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: initValue * 10 * snapSegment,
        y: 0,
        animated: true,
      });
    }
  };

  const initRange = () => {
    const dt =
      max && max > 0
        ? [...Array(segmentsLength).keys()]
            .filter(a => a <= max)
            .map(i => i / 10)
        : [...Array(segmentsLength).keys()].map(i => i / 10);
    setData(dt);
    setTimeout(() => {
      scrollToValue();
    }, 100);
  };
  const handleLoadMore = ({nativeEvent}) => {
    if (
      data.length <= max &&
      data.length - nativeEvent.contentOffset.x / snapSegment <= 50
    ) {
      const dt = [...Array(segmentsLength).keys()].map(
        i => parseFloat(i / 10) + data.length / 10,
      );
      setData([...data, ...dt]);
    }
  };
  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: positionX}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollEnd={handleLoadMore}
        snapToInterval={snapSegment}
        bounces={false}
        horizontal
        contentContainerStyle={styles.scrollViewContainerStyle}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={0}>
        <Ruler type={type} data={data} />
      </Animated.ScrollView>
      <View style={styles.indicatorWrapper}>
        <View style={[styles.segment, styles.segmentIndicator]} />
        <Icons
          type={'Feather'}
          name={'navigation-2'}
          color={Colors.primary}
          size={20}
        />
      </View>
    </View>
  );
};

export default HorizontalRange;

const styles = StyleSheet.create({
  wrapperRulerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    height: 120,
  },
  wrapperNumberItem: {
    marginTop: 10,
    position: 'absolute',
    bottom: -20,
    left: -19,
    alignItems: 'center',
    width: 40,
  },
  scrollViewContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: 20,
    // width: '100%',
  },
  indicatorWrapper: {
    position: 'absolute',
    left: (widthDevice - indicatorWidth - 20) / 2,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWidth,
    // backgroundColor: 'green',
  },
  segmentIndicator: {
    height: indicatorHeight,
    width: 6,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  ruler: {
    // flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  ageTextStyle: {
    fontSize: 42,
    fontFamily: 'red',
  },
  spacer: {
    width: spacerWidth,
    backgroundColor: 'red',
  },
});
