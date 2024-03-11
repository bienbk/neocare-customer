import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {TextNormalSemiBold} from '../../common/Text/TextFont';
import {widthDevice} from '../../assets/constans';
import Colors from '../../theme/Colors';
import Icons from '../../common/Icons/Icons';
const minAge = 10;
const segmentsLength = 100;
const segmentWidth = 3;
const segmentSpacing = 14;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (widthDevice - segmentWidth) / 2;
const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment;
const indicatorWidth = 100;
const indicatorHeight = 80;

const Ruler = ({current, data}) => {
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
                  height: tenth ? 50 : 25,
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
                    color: current === i ? Colors.buttonBackground : 'gray',
                  }}>
                  {i}
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

const HorizontalRange = ({
  setValue,
  type,
  initValue,
  onChangeValue,
  onChangeFinished,
}) => {
  const positionX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [offsetX, setOffsetX] = useState('');
  const [data, setData] = useState([]);
  positionX.addListener(event => {
    if (type === 'kg') {
      setOffsetX(Math.round(parseInt(event.value, 10) / snapSegment + minAge));
    } else if (type === 'lbs') {
      setOffsetX(
        Math.round((parseInt(event.value, 10) / snapSegment) * 2.2 + minAge),
      );
    }
  });
  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (initValue - minAge) * snapSegment,
          y: 0,
          animated: true,
        });
      }
    }, 1000);
    const dt = [...Array(segmentsLength).keys()].map(i => i + minAge);
    setData(dt);
  }, []);
  useEffect(() => {
    if (offsetX) {
      setValue && setValue(offsetX);
    }
  }, [offsetX]);
  useEffect(() => {
    if (onChangeValue !== 0) {
      if (scrollViewRef && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x:
            type === 'kg'
              ? (initValue - minAge) * snapSegment
              : (parseInt(initValue / 2.2, 10) - minAge) * snapSegment,
          y: 0,
          animated: true,
        });
        onChangeFinished && onChangeFinished();
      }
    }
  }, [onChangeValue]);
  useEffect(() => {
    const dt = [...Array(segmentsLength).keys()].map(
      i => parseInt(type === 'lbs' ? 2.2 * i : i, 10) + minAge,
    );
    setData(dt);
  }, [type]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: positionX}}}],
          {useNativeDriver: true},
        )}
        snapToInterval={snapSegment}
        horizontal
        contentContainerStyle={styles.scrollViewContainerStyle}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}>
        <Ruler current={offsetX} data={data} />
      </Animated.ScrollView>
      <View style={styles.indicatorWrapper}>
        <View style={[styles.segment, styles.segmentIndicator]} />
        <Icons
          type={'Feather'}
          name={'navigation-2'}
          color={Colors.buttonBackground}
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
    height: 100,
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
    paddingBottom: 20,
  },
  indicatorWrapper: {
    position: 'absolute',
    left: (widthDevice - indicatorWidth) / 2,
    bottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWidth,
    // backgroundColor: 'red',
  },
  segmentIndicator: {
    height: indicatorHeight,
    width: 6,
    borderRadius: 20,
    backgroundColor: Colors.buttonBackground,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  ruler: {
    width: rulerWidth,
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
