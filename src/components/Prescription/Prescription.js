/* eslint-disable react-native/no-inline-styles */
import {React, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import styles from './styles';
import {TextMoneyBold, TextNormal} from '../../common/Text/TextFont';
// import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';

import Icons from '../../common/Icons/Icons';
import Svg from '../../common/Svg/Svg';
import HorizontalRange from '../../common/HorizontalRange/HorizontalRange';
import CustomButton from '../../common/CustomButton/CustomButton';
import Colors from '../../theme/Colors';
const Prescription = ({nextStep}) => {
  const [weight, setWeight] = useState(50.0);
  const [typeWeight, setTypeWeight] = useState(1);
  const refWeight = useRef(0);
  const [weightChanged, setWeightChanged] = useState(0);

  const handleWeightType = type => {
    setTypeWeight(type);
    setWeight(0);
  };
  const handleWeightVal = type => {
    if (parseInt(weight, 10) === 0 && type === 0) {
      return;
    }
    refWeight.current = type === 0 ? -0.1 : 0.1
  };
  return (
    <View style={{flex: 1}}>
      {/* TITLE SECTION */}
      <View style={styles.wrapperTitle}>
        <TextMoneyBold style={{fontSize: 24, marginBottom: 5}}>
          {'Cân nặng của bạn'}
        </TextMoneyBold>
        <TextNormal style={{textAlign: 'center'}}>
          {'Thông tin này rất quan trọng để tính chỉ số khối cơ thể của bạn'}
        </TextNormal>
      </View>
      {/* WEIGHT SECTION */}
      <View style={styles.wrapperWeightSection}>
        {/* TYPE OF WEIGHT */}
        <View style={[styles.wrapperWeightButton, {paddingHorizontal: 40}]}>
          <TouchableOpacity
            onPress={() => {
              handleWeightType(1);
              setWeight(50.0);
            }}
            style={[
              styles.weightButton,
              typeWeight === 1 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[typeWeight === 1 && styles.activeTextWeight]}>
              KG
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleWeightType(2);
              setWeight(5.0);
            }}
            style={[
              styles.weightButton,
              typeWeight === 2 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[typeWeight === 2 && styles.activeTextWeight]}>
              LBS
            </TextNormal>
          </TouchableOpacity>
        </View>
        {/* VALUE OF WEIGHT */}
        <View style={styles.wrapperWeightButton}>
          <TouchableOpacity
            disabled={typeWeight === 2}
            onPress={() => handleWeightVal(0)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'minus'} size={26} color={'white'} />
          </TouchableOpacity>
          <TextMoneyBold style={{fontSize: 60}}>
            {parseFloat(weight).toFixed(1)}
          </TextMoneyBold>
          <TouchableOpacity
            disabled={typeWeight === 2}
            onPress={() => handleWeightVal(1)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'plus'} size={26} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* SLIDER */}
      <HorizontalRange
        initValue={weight}
        setValue={setWeight}
        type={typeWeight === 1 ? 'kg' : 'lbs'}
      />

      <View style={{flex: 1, alignItems: 'center'}}>
        <Svg name={'icon_weight'} size={220} />
      </View>
      <CustomButton
        onPress={() => nextStep({weight})}
        label={strings.common.continue}
      />
    </View>
  );
};

export default Prescription;

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
  // indicatorWrapper: {
  //   position: 'absolute',
  //   left: 50,
  //   top: 100,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   width: indicatorWidth,
  //   // backgroundColor: 'green',
  // },
  // segmentIndicator: {
  //   height: 5,
  //   width: indicatorWidth - 20,
  //   borderRadius: 20,
  //   backgroundColor: Colors.buttonBackground,
  // },
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
