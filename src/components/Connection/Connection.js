import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../theme/Colors';
import {
  TextNormal,
  TextSemiBold,
  TextSmallMedium,
} from '../../common/Text/TextFont';
import {heightDevice, widthDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import {NAVIGATION_MY_DOCTOR} from '../../navigation/routes';
const maxLength = 6;
const Connection = ({navigation, route}) => {
  const [typeShow, setTypeShow] = useState(0);
  const [code, setCode] = useState('');
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef(null);
  const [inputContainerFocus, setInputContainerFocus] = useState(false);
  const handleOnBlur = () => {
    setInputContainerFocus(false);
  };
  useEffect(() => {
    const {type} = route.params;
    setTypeShow(type);
  }, []);
  useEffect(() => {
    // setPinReady(code.length === maxLength);
    if (code.length === maxLength && code === '111111') {
      navigation.navigate(NAVIGATION_MY_DOCTOR);
    }
  }, [code]);
  const handleOnPress = () => {
    setInputContainerFocus(true);
    textInputRef?.current?.focus();
  };
  const toCodeDigitInput = (value, index) => {
    const emptyInputChar = '';
    const digit = code[index] || emptyInputChar;
    const isCurrentDigit = index <= code.length - 1;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;
    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
    const styleOTPInput = inputContainerFocus && isDigitFocused ? true : false;
    return (
      <View key={index} style={[styles.otpInputView]}>
        <TextNormal style={styles.otpInputText}>
          {digit ? digit : ''}
        </TextNormal>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {typeShow === 1 && (
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_MY_DOCTOR)}
            style={styles.wrapperClose}>
            <Icons
              type={'Feather'}
              name={'arrow-left'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
          <View style={styles.inputSection}>
            <TextSemiBold style={{paddingVertical: 30}}>
              {'Bạn hãy nhập mã giới thiệu của bác sĩ '}
            </TextSemiBold>
            <Pressable
              style={styles.inputContainerPressable}
              onPress={handleOnPress}>
              {codeDigitsArray.map(toCodeDigitInput)}
            </Pressable>

            <TextInput
              value={code}
              onChangeText={setCode}
              maxLength={maxLength}
              // keyboardType="number-pad"
              returnKeyType="done"
              textContentType="oneTimeCode"
              ref={textInputRef}
              onBlur={handleOnBlur}
              style={styles.hiddenTextInput}
              // autoFocus={true}
            />
            <TextNormal style={{color: '#EF0000', paddingVertical: 20}}>
              {'Mã giới thiệu không đúng'}
            </TextNormal>
          </View>
        </View>
      )}
      {typeShow === 2 && (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextNormal>QRCODE</TextNormal>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Connection;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  inputContainerPressable: {
    width: widthDevice - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  wrapperClose: {
    // height: 30,
    // width: 30,
    borderRadius: 30,
    padding: 10,
    backgroundColor: Colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    left: 16,
  },
  hiddenTextInput: {
    // borderColor: '#004D40',
    // borderWidth: 2,
    // borderRadius: 5,
    // padding: 12,
    // marginTop: 15,
    // width: 300,
    // color: 'red',
    position: 'absolute',
    width: 0,
    height: 1,
    zIndex: 1000,
    opacity: 0,
  },
  inputSection: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 30,
    // height: '80%',
    marginTop: heightDevice * 0.25,
    // backgroundColor: 'red',
  },
  otpInputView: {
    borderColor: 'gray',
    // minWidth: '13%',
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    width: 35,
    height: 55,
  },
  activeInputView: {
    borderColor: 'gray',
    // minWidth: '13%',
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    width: 35,
    height: 55,
  },
  otpInputText: {
    fontSize: 29,
    textAlign: 'center',
    // alignSelf: 'center',

    color: 'black',
    fontWeight: '700',
    // paddingVertical: 2,
    // paddingHorizontal: 1,
    // backgroundColor: 'red',
  },
});
