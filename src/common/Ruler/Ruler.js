/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {AnimatedFlashList} from '@shopify/flash-list';

import {RulerPickerItem} from './RulerPickerItem';
import {widthDevice} from 'assets/constans';
import Icons from '../Icons/Icons';
import Colors from 'theme/Colors';
import {TextNormalSemiBold} from '../Text/TextFont';
const calculateCurrentValue = (
  scrollPosition,
  stepWidth,
  gapBetweenItems,
  min,
  max,
  step,
  fractionDigits,
) => {
  const index = Math.round(scrollPosition / (stepWidth + gapBetweenItems));
  return Math.min(Math.max(index * step + min, min), max).toFixed(
    fractionDigits,
  );
};

const Ruler = ({
  width = widthDevice - 30,
  height = 140,
  min = 0,
  max = 10,
  step = 1,
  initialValue = min,
  fractionDigits = 1,
  indicatorHeight = 80,
  gapBetweenSteps = 10,
  shortStepHeight = 25,
  longStepHeight = 50,
  stepWidth = 3,
  indicatorColor = Colors.primary,
  shortStepColor = 'lightgray',
  longStepColor = 'darkgray',
  decelerationRate = 'normal',
  onValueChange,
  onValueChangeEnd,
}) => {
  const itemAmount = (max - min) / step;
  const arrData = Array.from({length: itemAmount + 1}, (_, index) => index);
  const listRef = useRef(null);

  // const stepTextRef = useRef(null);
  const prevValue = useRef(initialValue);
  const prevMomentumValue = useRef(initialValue);
  const scrollPosition = useRef(new Animated.Value(0)).current;

  const valueCallback = useCallback(
    ({value}) => {
      const newStep = calculateCurrentValue(
        value,
        stepWidth,
        gapBetweenSteps,
        min,
        max,
        step,
        fractionDigits,
      );

      if (prevValue.current !== newStep) {
        onValueChange?.(newStep);
      }

      prevValue.current = newStep;
    },
    [fractionDigits, gapBetweenSteps, stepWidth, max, min, onValueChange, step],
  );

  useEffect(() => {
    scrollPosition.addListener(valueCallback);

    return () => {
      scrollPosition.removeAllListeners();
    };
  }, [scrollPosition, valueCallback]);

  const scrollHandler = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollPosition}}}],
    {useNativeDriver: true},
  );

  const renderSeparator = useCallback(
    () => <View style={{width: width * 0.5 - stepWidth * 0.5}} />,
    [stepWidth, width],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <View style={{height}}>
          <RulerPickerItem
            isLast={index === arrData.length - 1}
            index={index}
            number={item && index % 10 === 0 ? item : -1}
            shortStepHeight={shortStepHeight}
            longStepHeight={longStepHeight}
            gapBetweenSteps={gapBetweenSteps}
            stepWidth={stepWidth}
            shortStepColor={shortStepColor}
            longStepColor={longStepColor}
          />
          {index % 10 === 0 && (
            <View style={styles.wrapperNumber}>
              <TextNormalSemiBold style={styles.numberText}>
                {parseFloat(item / 10).toFixed(1)}
              </TextNormalSemiBold>
            </View>
          )}
        </View>
      );
    },
    [
      arrData.length,
      gapBetweenSteps,
      stepWidth,
      longStepColor,
      longStepHeight,
      shortStepColor,
      shortStepHeight,
    ],
  );

  const onMomentumScrollEnd = useCallback(
    event => {
      const newStep = calculateCurrentValue(
        event.nativeEvent.contentOffset.x || event.nativeEvent.contentOffset.y,
        stepWidth,
        gapBetweenSteps,
        min,
        max,
        step,
        fractionDigits,
      );

      if (prevMomentumValue.current !== newStep) {
        onValueChangeEnd?.(newStep);
      }

      prevMomentumValue.current = newStep;
    },
    [
      fractionDigits,
      gapBetweenSteps,
      stepWidth,
      max,
      min,
      onValueChangeEnd,
      step,
    ],
  );
  function onContentSizeChange() {
    const initialIndex = Math.floor((initialValue - min) / step);
    listRef.current?.scrollToOffset({
      offset: initialIndex * (stepWidth + gapBetweenSteps),
      animated: false,
    });
  }

  return (
    <View
      style={{
        height,
        width: widthDevice - 30,
        alignSelf: 'center',
        marginTop: 10,
      }}>
      <AnimatedFlashList
        ref={listRef}
        data={arrData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumScrollEnd}
        estimatedItemSize={stepWidth + gapBetweenSteps}
        snapToOffsets={arrData.map(
          (_, index) => index * (stepWidth + gapBetweenSteps),
        )}
        onContentSizeChange={onContentSizeChange}
        snapToAlignment="start"
        decelerationRate={decelerationRate}
        estimatedFirstItemOffset={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
      />
      <View pointerEvents="none" style={[styles.indicator]}>
        <View
          style={{
            width: stepWidth,
            height: indicatorHeight,
            borderRadius: 10,
            backgroundColor: indicatorColor,
            marginBottom: 5,
          }}
        />
        <Icons
          type={'AntDesign'}
          name={'caretup'}
          size={20}
          color={Colors.primary}
        />
      </View>
      <TextNormalSemiBold style={styles.noteText}>
        Trượt thanh đo sang 2 bên để thay đổi chỉ số
      </TextNormalSemiBold>
    </View>
  );
};
export default Ruler;

const styles = StyleSheet.create({
  numberText: {
    color: Colors.gray.gray50,
    fontWeight: 'bold',
    minWidth: 50,
    alignSelf: 'center',
    textAlign: 'center',
    // backgroundColor: 'red',
    fontSize: 12,
  },
  noteText: {
    textAlign: 'center',
    color: Colors.gray.gray60,
    paddingVertical: 10,
    width: widthDevice - 30,
    // backgroundColor: 'red',
  },
  wrapperNumber: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    left: -15,
    width: 30,
    height: 40,
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: widthDevice - 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
