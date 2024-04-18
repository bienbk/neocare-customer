/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {TextNormal, TextNormalSemiBold} from '../Text/TextFont';
import Colors from 'theme/Colors';

export const RulerPickerItem = React.memo(
  ({
    isLast,
    index,
    gapBetweenSteps,
    shortStepHeight,
    longStepHeight,
    stepWidth,
    number,
    shortStepColor,
    longStepColor,
  }) => {
    const isLong = index % 10 === 0;
    const height = isLong ? longStepHeight : shortStepHeight;

    return (
      <View
        style={[
          {
            width: stepWidth,
            height: height,
            marginRight: isLast ? 0 : gapBetweenSteps,
            marginTop: shortStepHeight,
            justifyContent: 'center',
            // backgroundColor: 'green',
          },
        ]}>
        <View
          style={[
            {
              width: stepWidth,
              height: height,
              borderRadius: 10,
              backgroundColor: isLong ? longStepColor : shortStepColor,
              marginTop: isLong ? 0 : shortStepHeight,
            },
          ]}
        />
      </View>
    );
  },
);
