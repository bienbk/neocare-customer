/* eslint-disable react-native/no-inline-styles */
import {React, useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';

import {
  TextMoneyBold,
  TextNormal,
  TextNormalSemiBold,
} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import Icons from '../../common/Icons/Icons';
import Svg from '../../common/Svg/Svg';
import CustomButton from '../../common/CustomButton/CustomButton';
const min = 50;
const segmentsLength = 160;
const segmentHeight = 3;
const segmentSpacing = 14;
const snapSegment = segmentHeight + segmentSpacing;
const indicatorWidth = 100;
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
                  height: segmentHeight,
                  backgroundColor: Colors.gray.gray80,
                  borderRadius: 10,
                  width: tenth ? 50 : 25,
                  marginBottom: segmentSpacing,
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
const HeightScreen = ({nextStep}) => {
  const [height, setHeight] = useState(0);
  const [heightData, setHeightData] = useState([]);
  const positionY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [heightType, setHeightType] = useState(1);
  useEffect(() => {
    setHeight(160);
    const dt = [...Array(segmentsLength).keys()].map(i => i + min);
    setHeightData(dt);
  }, []);
  positionY.addListener(event => {
    if (heightType === 1) {
      setHeight(Math.round(parseInt(event.value, 10) / snapSegment + min));
    }
    if (heightType === 2) {
      setHeight(
        (
          Math.round(parseInt(event.value, 10) / snapSegment + min) * 0.03
        ).toFixed(2),
      );
    }
  });

  useEffect(() => {
    if (heightData && heightData.length > 0) {
      setTimeout(() => {
        scrollToValue();
      }, 1000);
    }
  }, [heightData]);
  const handleWeightType = type => {
    setHeightType(type);
    const dt = [...Array(segmentsLength).keys()].map(i =>
      type === 2 ? parseFloat((i + min) * 0.03).toFixed(2) : i + min,
    );
    setHeightData(dt);
    setHeight(type === 2 ? 4.8 : 160);
  };
  const handleWeightVal = val => {
    scrollViewRef.current.scrollTo({
      x: 0,
      y: (height + val - min) * snapSegment,
      animated: true,
    });
    if (val === 1) {
      setHeight(prev => (prev += 1));
    } else if (val === 0) {
      setHeight(prev => (prev -= 1));
    }
  };
  const scrollToValue = () => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y:
          heightType === 1
            ? (height - min) * snapSegment
            : (parseFloat(height / 0.03).toFixed(2) - min) * snapSegment,
        animated: true,
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      {/* TITLE SECTION */}
      <View style={styles.wrapperTitle}>
        <TextMoneyBold style={{fontSize: 24, marginBottom: 5}}>
          {'Chiều cao của bạn'}
        </TextMoneyBold>
        <TextNormal style={{textAlign: 'center'}}>
          {
            'Thông tin này rất quan trọng để tính toán sự trao đổi chất cơ bản của bạn'
          }
        </TextNormal>
      </View>
      {/* HeightScreen SECTION */}
      <View style={styles.wrapperHeightSection}>
        {/* TYPE OF HEIGHT */}
        <View style={[styles.wrapperWeightButton, {paddingHorizontal: 40}]}>
          <TouchableOpacity
            onPress={() => handleWeightType(1)}
            style={[
              styles.weightButton,
              heightType === 1 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[heightType === 1 && styles.activeTextWeight]}>
              CM
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleWeightType(2)}
            style={[
              styles.weightButton,
              heightType === 2 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[heightType === 2 && styles.activeTextWeight]}>
              FT
            </TextNormal>
          </TouchableOpacity>
        </View>
        {/* VALUE OF HEIGHT */}
        <View style={styles.wrapperHeightButton}>
          <TouchableOpacity
            onPress={() => handleWeightVal(0)}
            disabled={heightType === 2}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'minus'} size={26} color={'white'} />
          </TouchableOpacity>
          <TextMoneyBold style={{fontSize: 40}}>{height}</TextMoneyBold>
          <TouchableOpacity
            onPress={() => handleWeightVal(1)}
            disabled={heightType === 2}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'plus'} size={26} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* SLIDER */}
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          justifyContent: 'space-around',
          marginBottom: 60,
          flex: 1,
        }}>
        <Svg
          name={'icon_height'}
          size={200}
          style={{minHeight: 350, marginLeft: 10}}
        />
        <View>
          <Animated.ScrollView
            ref={scrollViewRef}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: positionY}}}],
              {useNativeDriver: true},
            )}
            vertical={true}
            snapToInterval={snapSegment}
            contentContainerStyle={styles.scrollViewContainerStyle}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            <Ruler current={height} data={heightData} />
          </Animated.ScrollView>
          <View style={styles.indicatorWrapper}>
            <View style={[styles.segment, styles.segmentIndicator]} />
            <Icons
              type={'Feather'}
              name={'chevrons-left'}
              color={Colors.buttonBackground}
              size={20}
            />
          </View>
        </View>
      </View>
      <CustomButton
        onPress={() => nextStep({height: height})}
        label={strings.common.continue}
      />
    </View>
  );
};

export default HeightScreen;

const styles = StyleSheet.create({
  wrapperRulerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    // height: 100,
  },
  wrapperNumberItem: {
    marginRight: 10,
    position: 'absolute',
    // bottom: -20,
    top: -18,
    left: -1,
    alignItems: 'center',
    // backgroundColor: 'green',
    width: 50,
    paddingVertical: 10,
  },
  scrollViewContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  indicatorWrapper: {
    position: 'absolute',
    left: 50,
    top: 100,
    alignItems: 'center',
    flexDirection: 'row',
    width: indicatorWidth,
    // backgroundColor: 'green',
  },
  segmentIndicator: {
    height: 5,
    width: indicatorWidth - 20,
    borderRadius: 20,
    backgroundColor: Colors.buttonBackground,
  },
  ruler: {
    width: 170,
    // height: heightRuler,
  },

  ageTextStyle: {
    fontSize: 42,
    fontFamily: 'red',
  },
  spacer: {
    height: 100,
  },

  //
  safeView: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 15,
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.backgroundColor,
  },
  buttonBack: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 999,
    // backgroundColor: 'red',
  },
  wrapperTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  subtitleText: {textAlign: 'center', color: Colors.gray.gray50},
  weightButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: 'lightgray',
    width: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
  },
  wrapperWeightButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  wrapperHeightButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 5,
    alignItems: 'center',
  },
  activeWeightButton: {
    backgroundColor: '#7189F7',
  },
  activeTextWeight: {
    fontWeight: '700',
    color: 'white',
  },
  weightValueButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#7189F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperWeightSection: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    paddingHorizontal: 15,
    // flexDirection: 'column',
    paddingVertical: 10,
  },
  wrapperHeightSection: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    paddingHorizontal: 15,
    // flexDirection: 'column',
  },
  wrapperSliderItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContinueButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  wrapperSliderHeight: {
    paddingHorizontal: 15,
    // backgroundColor: 'green',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wrapperCheckbox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginTop: 5,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
});
