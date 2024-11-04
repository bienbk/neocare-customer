import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from 'theme/Colors';
import {TextNormal, TextSemiBold} from 'common/Text/TextFont';
import {heightDevice, widthDevice} from 'assets/constans';
import Icons from 'common/Icons/Icons';
import {NAVIGATION_DOCTOR_DETAIL, NAVIGATION_HOME} from 'navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  messageFollowDoctorSelector,
  statusFollowDoctorSelector,
} from 'store/selectors';
import {followDoctorAction, resetFollowDoctor} from 'store/actions';
import Status from 'common/Status/Status';
import {asyncStorage} from 'store';
const maxLength = 6;
// -------------- TYPE = 1 --->>>>> MANUAL
// -------------- TYPE = 2 --->>>>> QRCODE
const Connection = ({navigation, route}) => {
  const [typeShow, setTypeShow] = useState(1);
  const [code, setCode] = useState('');
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef(null);
  const [inputContainerFocus, setInputContainerFocus] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useRef({id: -1});
  const statusFollowDoctor = useSelector(state =>
    statusFollowDoctorSelector(state),
  );
  const messageFollowDoctor = useSelector(state =>
    messageFollowDoctorSelector(state),
  );
  useEffect(() => {
    if (statusFollowDoctor === Status.SUCCESS) {
      const connected = {
        code,
      };
      navigation.navigate(NAVIGATION_DOCTOR_DETAIL, {connected});
    }
  }, [statusFollowDoctor]);
  const handleOnBlur = () => {
    setInputContainerFocus(false);
    setInputContainerFocus(false);
  };
  useEffect(() => {
    const {type} = route ? route?.params : 1;
    setTypeShow(type);
    checkUser();
    return () => {
      dispatch(resetFollowDoctor());
    };
  }, []);
  const checkUser = async () => {
    const user = (await asyncStorage.getUser()) || {id: -1};
    currentUser.current = user ? user : {id: -1};
  };
  useEffect(() => {
    if (code.length === maxLength && currentUser.current.id !== -1) {
      dispatch(
        followDoctorAction({
          qr_code: code,
        }),
      );
    }
  }, [code]);
  const handleOnPress = () => {
    setInputContainerFocus(true);
    textInputRef?.current?.focus();
  };
  const toCodeDigitInput = (value, index) => {
    const emptyInputChar = '';
    const digit = code[index] || emptyInputChar;
    return (
      <View key={index} style={[styles.otpInputView]}>
        <TextNormal style={styles.otpInputText}>
          {digit ? digit : '-'}
        </TextNormal>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {typeShow === 1 && (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_HOME)}
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
              autoFocus={true}
            />
            <TextNormal style={{color: '#EF0000', paddingVertical: 20}}>
              {messageFollowDoctor
                ? 'Mã bác sĩ không đúng, vui lòng thử lại!'
                : ''}
            </TextNormal>
          </View>
        </View>
      )}
      {/* {typeShow === 2 && (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextNormal>QRCODE</TextNormal>
        </View>
      )} */}
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
