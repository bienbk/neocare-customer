/* eslint-disable react-native/no-inline-styles */
import {React, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextNormalSemiBold,
} from '../../common/Text/TextFont';
// import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';

import Icons from '../../common/Icons/Icons';
import Svg from '../../common/Svg/Svg';
import HorizontalRange from '../../common/HorizontalRange/HorizontalRange';
import CustomButton from '../../common/CustomButton/CustomButton';
import Colors from '../../theme/Colors';
import {convertDate, today} from '../../assets/constans';
import DateTimePicker from '../../common/DateTImePicker/DateTimePicker';

const Prescription = ({nextStep}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* TITLE SECTION */}
        <View style={styles.wrapperTitle}>
          <TextMoneyBold style={{fontSize: 24, marginBottom: 5}}>
            {'Cân nặng của bạn'}
          </TextMoneyBold>
          <TextNormal style={{textAlign: 'center'}}>
            {'Thông tin này rất quan trọng để tính chỉ số khối cơ thể của bạn'}
          </TextNormal>
        </View>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.wrapperDatePicker}>
          <Icons
            type={'Fontisto'}
            name={'calendar'}
            size={18}
            color={Colors.greenColor}
          />
          <TextNormalSemiBold style={styles.textToday}>
            {convertDate(date) +
              ' ' +
              date.getHours() +
              ':' +
              date.getMinutes()}
          </TextNormalSemiBold>
        </TouchableOpacity>
        <DateTimePicker
          date={date}
          isOpen={open}
          setDate={setDate}
          maxDate={new Date()}
          onConfirm={() => setOpen(false)}
          onClose={() => setOpen(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Prescription;

const styles = StyleSheet.create({
  textToday: {
    marginLeft: 10,
    color: Colors.gray.gray20,
  },
  wrapperDatePicker: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.whiteColor,
    borderStyle: 'solid',
    borderColor: Colors.gray.gray95,
    borderWidth: 1,
    borderRadius: 20,
  },
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
