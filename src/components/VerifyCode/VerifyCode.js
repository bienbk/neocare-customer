import {heightDevice, widthDevice} from 'assets/constans';
import SeparatorLine from 'common/SeparatorLine/SeparatorLine';
import {NAVIGATION_ACCESS_LOCATION, NAVIGATION_LOGIN} from 'navigation/routes';
import {React, useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
import CodeInput from './CodeInput';
// import {
//   confirmOtp,
//   sendPhone,
//   confirmOtpReset,
//   getDeleteAccount,
//   resetDeleteOtp,
//   deleteAccountReset,
//   confirmDeleteAccountOtp,
//   logout,
// } from 'store/actions';
// import {
//   isErrorConfirm,
//   isStatusDeleteAccount,
//   isStatusConfirmOtp,
//   statusConfirmOtpDelete,
//   getErrorMessageConfirm,
// } from 'store/selectors';
import Status from 'common/Status/Status';
import {
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
} from 'common/Text/TextFont';
import Loading from 'common/Loading/Loading';
import {CommonActions} from '@react-navigation/native';
import Svg from 'common/Svg/Svg';
import {OneSignal} from 'react-native-onesignal';
import {asyncStorage} from 'store/index';
import strings from 'localization/Localization';
import {NAVIGATION_PROFILE_HEALTH} from '../../navigation/routes';

const VerifyCode = ({navigation, route}) => {
  const {phone, type} = route.params;
  const MAX_CODE_LENGTH = 6;
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  // const deviceId = useRef(null);
  // const pushToken = useRef(null);
  // const statusConfirmOtp = useSelector(state => isStatusConfirmOtp(state));
  // const errorConfirmOtp = useSelector(state => isErrorConfirm(state));
  const [disableSendAgainButton, setDisableSendAgainButton] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendTime, setResendTime] = useState(0);
  useEffect(() => {
    initTimeLogin();
    const interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
  }, []);
  const initTimeLogin = async () => {
    setTimer(60);
    // const timeLogin = await asyncStorage.getTimeLogin();
    // console.log('LOGIN INFO::::', timeLogin);
    // if (
    //   timeLogin &&
    //   timeLogin?.last_login_at !== -1 &&
    //   timeLogin?.levels &&
    //   timeLogin?.levels.length > 0 &&
    //   timeLogin?.last_phone === phone
    // ) {
    //   const resendTimes = timeLogin?.resend_times;
    //   setResendTime(resendTimes);
    //   setTimer(
    //     resendTimes < 3 ? timeLogin?.levels[resendTimes].count_down : -1,
    //   );
    // } else {
    // setTimer(60);
    // await asyncStorage.setTimeLogin({
    //   last_login_at: new Date().getTime(),
    //   last_phone: phone,
    //   resend_times: 0,
    //   levels: [
    //     {level: 0, count_down: 60},
    //     {level: 1, count_down: 120},
    //     {level: 2, count_down: 180},
    //   ],
    // });
    // }
  };
  // const statusDeleteAccount = useSelector(state =>
  //   isStatusDeleteAccount(state),
  // );
  // const statusConfirmDelete = useSelector(state =>
  //   statusConfirmOtpDelete(state),
  // );
  // const messageConfirmDelete = useSelector(state =>
  //   getErrorMessageConfirm(state),
  // );
  const handleAuthenticate = () => {
    if (pinReady) {
      navigation.navigate(NAVIGATION_ACCESS_LOCATION);
    }
  };
  const handleSendCodeAgain = async () => {
    const timeLogin = await asyncStorage.getTimeLogin();
    await asyncStorage.setTimeLogin({
      ...timeLogin,
      resend_times: resendTime + 1,
    });
    setResendTime(resendTime + 1);
    setTimer(
      resendTime + 1 <= 2 ? timeLogin?.levels[resendTime + 1].count_down : -1,
    );
    if (resendTime + 1 <= 2) {
      const interval = setInterval(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000);
      // dispatch(sendPhone('+84' + phone.replace(/^0/, '')));
    }
    setDisableSendAgainButton(true);
  };
  // useEffect(() => {
  //   if (disableSendAgainButton === true) {
  //     if (timer > 0) {
  //       setTimeout(() => {
  //         setDisableSendAgainButton(false);
  //       }, timer * 1000);
  //     }
  //   }
  // }, [disableSendAgainButton]);

  useEffect(() => {
    if (pinReady) {
      // dispatch(confirmOtp(code, deviceId.current, pushToken.current));
      navigation.navigate(NAVIGATION_PROFILE_HEALTH, {phone: '0376525170'});
    }
  }, [pinReady]);

  // useEffect(() => {
  //   if (statusConfirmOtp === Status.SUCCESS) {
  //     resetTimeLogin();
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{name: NAVIGATION_ACCESS_LOCATION}],
  //       }),
  //     );
  //     dispatch(confirmOtpReset());
  //   }
  // }, [statusConfirmOtp]);
  // const resetTimeLogin = async () => {
  //   await asyncStorage.setTimeLogin({
  //     last_login_at: -1,
  //     last_phone: -1,
  //     resend_times: 0,
  //     levels: [],
  //   });
  // };
  // useEffect(() => {
  //   if (type === 1 && statusConfirmDelete === Status.SUCCESS) {
  //     dispatch(getDeleteAccount());
  //   }
  // }, [statusConfirmDelete]);
  // useEffect(() => {
  //   if (statusDeleteAccount === Status.SUCCESS) {
  //     dispatch(resetDeleteOtp());
  //     dispatch(logout());
  //     dispatch(deleteAccountReset());
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{name: NAVIGATION_LOGIN}],
  //       }),
  //     );
  //   }
  // }, [statusDeleteAccount]);
  // useEffect(() => {
  //   getDeviceId();
  //   setTimeout(() => {
  //     Keyboard.dismiss;
  //   }, 300);
  // }, []);
  // const getDeviceId = async () => {
  //   try {
  //     const id = await OneSignal.User.pushSubscription.getPushSubscriptionId();
  //     const token =
  //       await OneSignal.User.pushSubscription.getPushSubscriptionToken();
  //     deviceId.current = id;
  //     pushToken.current = token;
  //   } catch (error) {
  //     console.error('Lỗi khi lấy Subscription ID:', error);
  //   }
  // };
  return (
    <SafeAreaView style={styles.safeView}>
      <Pressable style={styles.safeView} onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
          {/* Title */}
          <View style={styles.wrapperTitle}>
            <TextNormal style={styles.textIntro1}>
              {'Chào mừng bạn đến với'}
            </TextNormal>
            <TextNormal style={styles.textIntro}>{'NEO CARE'}</TextNormal>
            {/* <TextSemiBold>aa:{BASE_PATH_CAFE}</TextSemiBold> */}
            <View style={styles.wrapperSubtitle}>
              <TextNormal style={styles.subtitle}>
                {strings.verifyScreen.title}
              </TextNormal>
              <TextNormal style={styles.textReceive}>
                {'+84' + phone}
              </TextNormal>
            </View>
          </View>
          {/* Input section */}
          <View style={styles.wrapperInput}>
            <CodeInput
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxLength={MAX_CODE_LENGTH}
              navigation={navigation}
            />
            {/* {!errorConfirmOtp && (
              <TextNormal style={styles.textError}>
                {errorConfirmOtp || 'Mã xác minh không đúng'}
              </TextNormal>
            )} */}
          </View>
          {pinReady ? (
            <View style={styles.wrapperSubtitle}>
              <TextNormal style={styles.subtitle}>Đang xác minh...</TextNormal>
            </View>
          ) : (
            <View>
              {timer > 0 ? (
                <View style={styles.textShowTimer}>
                  <TextNormal style={styles.questionSendback}>
                    Bạn không nhận được mã? Gửi lại mã sau
                  </TextNormal>
                  <TextNormal style={styles.textReceive}>
                    {timer <= 59
                      ? timer <= 9
                        ? `00:0${timer}`
                        : `00:${timer}`
                      : `0${parseInt(timer / 60, 10)}:${
                          timer % 60 > 9 ? timer % 60 : '0' + (timer % 60)
                        } `}
                  </TextNormal>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleSendCodeAgain}
                  disabled={disableSendAgainButton || timer > 0}>
                  <TextNormal style={styles.textSend}>
                    {strings.verifyScreen.sendBack}
                  </TextNormal>
                </TouchableOpacity>
              )}
            </View>
          )}
          {/* Button Confirm */}
          {/* <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={handleAuthenticate}
              style={styles.buttonConfirm}>
              <TextSemiBold style={styles.textButton}>
                {strings.common.continue}
              </TextSemiBold>
            </TouchableOpacity>
          </View> */}
        </View>
      </Pressable>
      {/* <Loading isHidden={statusConfirmOtp === Status.LOADING} /> */}
    </SafeAreaView>
  );
};

export default VerifyCode;
