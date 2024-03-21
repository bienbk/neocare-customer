import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import MyModal from '../MyModal/MyModal';
import {TextSemiBold} from '../Text/TextFont';
import strings from 'localization/Localization';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Colors from 'theme/Colors';
import {heightDevice, widthDevice} from 'assets/constans';
import Icons from '../Icons/Icons';
const DateTimePicker = ({isOpen, type, title, onConfirm, maxDate, onClose}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const transition = new Animated.Value(heightDevice);
  React.useEffect(() => {
    animatedAction(transition);
  }, [isOpen]);
  const animatedAction = val => {
    Animated.timing(val, {
      duration: 700,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const animatedOpacity = transition.interpolate({
    inputRange: [0, heightDevice / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <MyModal visible={isOpen} onPressOutSide={() => {}}>
      <Animated.View
        style={[
          styles.containerModal,
          {transform: [{translateY: transition}], opacity: animatedOpacity},
        ]}>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={onClose}>
          <Icons
            type={'AntDesign'}
            name={'closecircle'}
            color={Colors.gray.gray20}
            size={28}
          />
        </TouchableOpacity>
        <TextSemiBold style={styles.title}>
          {title || 'Đặt ngày và giờ'}
        </TextSemiBold>

        <DatePicker
          mode={type ? type : 'datetime'}
          locale={'vi'}
          is24hourSource={'locale'}
          maximumDate={maxDate}
          textColor={Colors.main}
          fadeToColor={'whitesmoke'}
          onDateChange={setCurrentDate}
          androidVariant={'iosClone'}
          date={currentDate}
        />
        <TouchableOpacity
          style={styles.buttonComplete}
          onPress={() => onConfirm(currentDate)}>
          <TextSemiBold style={{color: Colors.whiteColor}}>
            {strings.common.complete}
          </TextSemiBold>
        </TouchableOpacity>
      </Animated.View>
    </MyModal>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  title: {paddingBottom: 20},
  containerModal: {
    backgroundColor: 'whitesmoke',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: -widthDevice / 2 + 20,
    width: widthDevice - 40,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonComplete: {
    marginTop: 20,
    marginBottom: 10,
    width: '50%',
    paddingVertical: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.gray.gray10,
  },
});
