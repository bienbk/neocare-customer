import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useRef, useState, useEffect} from 'react';

import {
  View,
  Pressable,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sendPhone} from 'store/actions';
import styles from './styles';
import {isErrorSendOtp, isStatusSendPhone} from 'store/selectors';
import {TextNormal} from '../../common/Text/TextFont';
import Svg from 'common/Svg/Svg';
import Colors from 'theme/Colors';
import Status from 'common/Status/Status';
import {heightDevice} from 'assets/constans';
import {NAVIGATION_VERIFY_CODE} from '../../navigation/routes';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../common/CustomButton/CustomButton';
import strings from '../../localization/Localization';
import {parsePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js/mobile';
import {isAndroid} from '../../assets/constans';
const FOMART = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const Login = props => {
  const dispatch = useDispatch();
  const refInput = useRef(null);
  const statusSendPhone = useSelector(state => isStatusSendPhone(state));
  const errorSendPhone = useSelector(state => isErrorSendOtp(state));
  const [showError, setShowError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [phone, setPhone] = useState('');
  const [isAgreePolicy, setAgreePolicy] = useState(true);

  useEffect(() => {
    if (statusSendPhone === Status.SUCCESS) {
      props.navigation.navigate(NAVIGATION_VERIFY_CODE, {
        phone: phone.replace(/^0/, ''),
        screen: 'login',
      });
    } else if (statusSendPhone === Status.ERROR) {
      setShowError(true);
    }
  }, [statusSendPhone]);

  const handleSubmitPhone = () => {
    if (!phone) {
      return 0;
    }
    const phoneNumber = parsePhoneNumber(phone, 'VN');
    if (phoneNumber.isValid()) {
      dispatch(sendPhone(phoneNumber.number));
    } else {
      setShowPhoneError(true);
    }
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <Pressable style={styles.safeView} onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
          <View>
            <View
              style={{
                paddingBottom: 30,
                marginTop: heightDevice * 0.11,
                paddingHorizontal: 10,
              }}>
              <TextNormal style={styles.textIntro1}>
                {'Chào mừng bạn đến với'}
              </TextNormal>
              <TextNormal style={styles.textIntro}>{'NEO CARE'}</TextNormal>
              {/* <TextSemiBold>aa:{BASE_PATH_CAFE}</TextSemiBold> */}
              <TextNormal style={[styles.textHello]}>
                {'Nhập số điện thoại để tiếp tục đăng nhập'}
              </TextNormal>
            </View>
            <View style={{paddingBottom: 10, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => refInput.current.focus()}
                style={styles.containerButtonInputPhone}>
                <View style={styles.viewImageVietnam}>
                  {/* <Images source={icon_vietnam} style={styles.imageVietNam} /> */}
                  <Svg name={'viet'} size={22} style={styles.imageVietNam} />
                </View>
                <TextNormal style={styles.codeCountry}>(+84)</TextNormal>
                <TextInput
                  ref={refInput}
                  placeholder="000 000 000 "
                  placeholderTextColor={Colors.textGrayColor}
                  style={styles.styleTextInput}
                  keyboardType={
                    isAndroid ? 'number-pad' : 'numbers-and-punctuation'
                  }
                  returnKeyLabel={'Done'}
                  returnKeyType={'done'}
                  onChangeText={text => setPhone(text)}
                />
              </TouchableOpacity>
              {(phone.match(/[a-z]/i) ||
                FOMART.test(phone) ||
                showPhoneError) && (
                <TextNormal style={styles.errorMessage}>
                  {'Số điện thoại không hợp lệ'}
                </TextNormal>
              )}
            </View>
          </View>
          <View style={[styles.viewButtonSubmitPhone]}>
            <View style={styles.policyWrapper}>
              <TouchableOpacity
                onPress={() => setAgreePolicy(prev => (prev = !prev))}
                style={styles.checkboxSection}>
                <CheckBox
                  boxType={'square'}
                  lineWidth={2}
                  style={styles.styleCheckbox}
                  onTintColor={Colors.primary}
                  onFillColor={Colors.primary}
                  tintColors={{
                    true: Colors.primary,
                    false: 'black',
                  }}
                  onCheckColor={Colors.whiteColor}
                  width={20}
                  value={isAgreePolicy}
                />
                <View style={{flexDirection: 'row'}}>
                  <TextNormal>{'Tôi đồng ý với điều khoản và '}</TextNormal>
                  <TextNormal style={styles.linkText1}>
                    {'chính sách bảo mật'}
                  </TextNormal>
                </View>
              </TouchableOpacity>
            </View>
            <CustomButton
              onPress={() => handleSubmitPhone()}
              isDisabled={!phone || phone.length === 0}
              styledButton={styles.buttonSubmitPhone}
              label={strings.common.continue}
            />
            <TouchableOpacity onPress={() => console.log()}>
              <TextNormal style={styles.linkText}>
                {'Liên hệ hotline'}
              </TextNormal>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
