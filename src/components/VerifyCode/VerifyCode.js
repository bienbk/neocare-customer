import {
  NAVIGATION_LOGIN,
  NAVIGATION_PROFILE_HEALTH,
  NAVIGATION_MAIN,
} from 'navigation/routes';
import {React, useState, useEffect} from 'react';
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
import {
  confirmOtp,
  reSendPhone,
  confirmOtpReset,
  getDeleteAccount,
  deleteAccountReset,
} from 'store/actions';
import {
  isStatusDeleteAccount,
  isStatusConfirmOtp,
  getDeviceId,
  getPreAuthSessionId,
} from 'store/selectors';
import Status from 'common/Status/Status';
import {TextNormal} from 'common/Text/TextFont';
import {CommonActions} from '@react-navigation/native';
import {asyncStorage} from 'store/index';
import strings from 'localization/Localization';
import SuperTokens from 'supertokens-react-native';

import {getUserInfoAction} from 'store/user/userAction';
import {getStatusGetUserInfo} from 'store/selectors';

const VerifyCode = ({navigation, route}) => {
  const {phone, screen} = route.params;
  const MAX_CODE_LENGTH = 6;
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const statusConfirmOtp = useSelector(state => isStatusConfirmOtp(state));
  const [disableSendAgainButton, setDisableSendAgainButton] = useState(false);
  const [timer, setTimer] = useState(60);
  const statusGetUser = useSelector(state => getStatusGetUserInfo(state));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
  }, []);
  const statusDeleteAccount = useSelector(state =>
    isStatusDeleteAccount(state),
  );
  const deviceId = useSelector(state => getDeviceId(state));
  const preAuthSessionId = useSelector(state => getPreAuthSessionId(state));
  const handleSendCodeAgain = async () => {
    setDisableSendAgainButton(true);
    dispatch(
      reSendPhone({deviceId: deviceId, preAuthSessionId: preAuthSessionId}),
    );
  };
  useEffect(() => {
    if (disableSendAgainButton === true) {
      if (timer > 0) {
        setTimeout(() => {
          setDisableSendAgainButton(false);
        }, timer * 1000);
      }
    }
  }, [disableSendAgainButton]);

  useEffect(() => {
    if (pinReady) {
      dispatch(confirmOtp(code, deviceId, preAuthSessionId));
    }
  }, [pinReady]);

  useEffect(() => {
    if (statusConfirmOtp === Status.SUCCESS) {
      dispatch(confirmOtpReset());
      if (screen === 'account') {
        deleteAccount();
      } else {
        dispatch(getUserInfoAction());
      }
    }
  }, [statusConfirmOtp]);
  useEffect(() => {
    if (statusGetUser === Status.SUCCESS) {
      checkUser();
    }
    if (statusGetUser === Status.ERROR) {
      navigation.navigate(NAVIGATION_LOGIN);
    }
  }, [statusGetUser]);
  const checkUser = async () => {
    const user = await asyncStorage.getUser();
    user &&
      user?.info_submitted === 0 &&
      navigation.navigate(NAVIGATION_PROFILE_HEALTH);

    user && user?.info_submitted === 1 && navigation.navigate(NAVIGATION_MAIN);
  };

  //Delete the account
  const deleteAccount = () => {
    dispatch(getDeleteAccount());
  };

  const handleLogOut = async () => {
    await asyncStorage.clearStorage();
    await SuperTokens.signOut();
    dispatch(deleteAccountReset());
    setTimeout(() => {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: NAVIGATION_LOGIN}],
          }),
        );
      }, 50);
    }, 100);
  };

  useEffect(() => {
    if (statusDeleteAccount === Status.SUCCESS) {
      handleLogOut();
    }
  }, [statusDeleteAccount]);

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
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default VerifyCode;
