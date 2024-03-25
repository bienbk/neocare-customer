/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Animated, TextInput, TouchableOpacity, View,Pressable} from 'react-native';
import styles from './styles';
import {TextNormalSemiBold, TextSemiBold} from 'common/Text/TextFont';
import Icons from 'common/Icons/Icons';
import Colors from 'theme/Colors';
import strings from 'localization/Localization';
import CustomButton from 'common/CustomButton/CustomButton';
import {AXIT_URIC_MG, AXIT_URIC_MOL, CODE_AXIT_URIC, UNIT_MG_DL, UNIT_UMOLL, heightDevice,widthDevice,convertDateParameter,convertDate,} from 'assets/constans';
import CustomHeader from './CustomHeader';
import UnitSelector from 'common/UnitSelector/UnitSelector';
import {NAVIGATION_HOME} from 'navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {statusCreateParamSelector} from 'store/selectors';
import {createParameterAction,resetCreationParameter} from 'store/parameter/parameterAction';
import Status from 'common/Status/Status';
import DateTimePicker from 'common/DateTImePicker/DateTimePicker';

const PLACEHOLDER =
  'Ghi chú trạng thái cảm giác của bạn khi đo huyết áp, chất luợng giấc ngủ, chế độ dinh duỡng, bài tập thể dục gần đây của bạn...';
const AxitUric = ({navigation}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [axitUric, setAxitUric] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [conclusion, setConclusion] = useState(-1);
  const [messure, setMessure] = useState(1);
  const [showTextarea, setShowTextarea] = useState(false);
  const refCardHeight = React.useRef();
  const [note, setNote] = useState('');
  const cardTransition = new Animated.Value(0);
  const inputTransition = new Animated.Value(0);
  const textInputRef = useRef();
  const dispatch = useDispatch();
  const refNoteInput = useRef(-1);
  const statusCreateParameter = useSelector(state =>
    statusCreateParamSelector(state),
  );
  Keyboard.addListener('keyboardDidHide', () => {
    if (
      showTextarea &&
      refNoteInput.current &&
      refNoteInput.current.length > 0
    ) {
      setNote(refNoteInput.current);
    }
    setShowTextarea(false);
    setInputFocused(false);
  });
  Keyboard.addListener('keyboardDidShow', () => {
    if (showTextarea) {
      startAnimation(cardTransition, inputTransition);
    }
  });
  const startAnimation = (card, input) => {
    Animated.timing(card, {
      duration: 400,
      toValue: widthDevice,
      useNativeDriver: true,
    }).start();
    Animated.timing(input, {
      duration: 500,
      toValue: -refCardHeight.current - 20,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    if (warningMessage || !axitUric) {
      return;
    }
    Keyboard.dismiss();
    const checkList = messure === 1 ? AXIT_URIC_MG : AXIT_URIC_MOL;
    let result;

    checkList.map(item => {
      if (
        parseFloat(item?.min) <= parseFloat(axitUric) &&
        parseFloat(axitUric) <= parseFloat(item.max)
      ) {
        result = item;
        return;
      }
    });
    if (result) {
      setConclusion({content: result?.key, color: result?.color, status: result?.status});
    }
  };
  const saveParameter = () => {
    const payload = {
      acid_uric: {
        index: parseFloat(axitUric),
        unit: messure === 1 ? UNIT_MG_DL : UNIT_UMOLL,
      },
      noted: note,
      status: conclusion.status,
      date: convertDateParameter(date.toLocaleString('en-GB')) || '',
      parameters_monitor_code: CODE_AXIT_URIC,
    };
    dispatch(createParameterAction(payload));
  };
  useEffect(() => {
    if (statusCreateParameter === Status.SUCCESS) {
      dispatch(resetCreationParameter());
      navigation && navigation.navigate(NAVIGATION_HOME);
    }
  }, [statusCreateParameter]);
  const handleFocusInput = () => {
    textInputRef.current.focus();
    setAxitUric('');
    setInputFocused(true);
    setConclusion(-1);
  };
  const handleBlurInput = () => {
    Keyboard.dismiss();
    setInputFocused(false);
  };
  const handleResetConclusion = () => {
    textInputRef.current.focus();
    setAxitUric('');
    setConclusion(-1);
  };
  const handleNoteInput = ({nativeEvent}) => {
    refNoteInput.current = nativeEvent.text;
  };
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <CustomHeader
        conclusion={conclusion}
        title={'Axit Uric'}
        navigation={navigation}
        showTextarea={showTextarea}
      />
      <Animated.View
        onLayout={({nativeEvent}) => {
          refCardHeight.current = nativeEvent.layout.height;
        }}
        style={[
          styles.wrapperAxitUric,
          showTextarea && {
            transform: [{translateX: cardTransition}],
          },
        ]}>
        <TouchableOpacity
          onPress={handleResetConclusion}
          style={[styles.editButton, {padding: 10}]}>
          <Icons
            type={'AntDesign'}
            name={'edit'}
            size={20}
            color={Colors.gray.gray40}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenDatePicker(true)}
          style={styles.wrapperDateAxit}>
          <Icons
            type={'Fontisto'}
            name={'calendar'}
            size={18}
            color={Colors.gray.gray40}
          />
          <TextNormalSemiBold style={styles.textTodayAxit}>
            {`${convertDate(date, true)}`}
          </TextNormalSemiBold>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={[
              styles.inputAxitUric,
              inputFocused && styles.activeInputAxit,
            ]}>
            <View style={styles.inputContainerPressable}>
              <TextSemiBold style={styles.textAxitUric}>
                {axitUric || '- - -'}
              </TextSemiBold>
            </View>
            {conclusion !== -1 && !inputFocused && axitUric && (
              <TextNormalSemiBold style={styles.labelAxit}>
                {messure === 1 ? 'mg/dL' : 'Umol/L'}
              </TextNormalSemiBold>
            )}
            <TextInput
              onChangeText={setAxitUric}
              maxLength={3}
              keyboardType="number-pad"
              value={axitUric}
              returnKeyType="done"
              textContentType="oneTimeCode"
              ref={textInputRef}
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
              style={styles.inputCholesterol}
            />
          </TouchableOpacity>
          {conclusion === -1 && (
            <TextNormalSemiBold style={styles.textAxitLabel}>
              {messure === 1
                ? 'Axit uric đơn vị md/dL (0 ~ 13)'
                : 'Axit uric đơn vị Umol/L (200 ~ 700)'}
            </TextNormalSemiBold>
          )}
        </View>
        {conclusion && conclusion?.content && (
          <View style={[styles.wrapperConclusion]}>
            <View style={styles.line}>
              <Icons
                type={'Fontisto'}
                name={'blood-drop'}
                size={22}
                color={conclusion?.color}
              />
              <TextSemiBold
                style={[styles.conclusionText, {color: conclusion?.color}]}>
                {conclusion?.content}
              </TextSemiBold>
            </View>

            <TouchableOpacity>
              <Icons
                type={'AntDesign'}
                name={'questioncircleo'}
                size={20}
                color={'gray'}
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      {conclusion === -1 && (
        <UnitSelector
          firstOption={'mg/dL'}
          secondOption={'Umol/L'}
          onPressSelector={val => {
            if (conclusion !== -1) {
              return;
            }
            setAxitUric('');
            setMessure(val);
          }}
          isSelected={messure}
        />
      )}
      {conclusion && conclusion !== -1 && (
        <Animated.View
          style={[
            showTextarea && {
              height: heightDevice / 2,
              transform: [
                {
                  translateY: inputTransition,
                },
              ],
            },
          ]}>
          <TouchableOpacity style={styles.wrapperInputArea}>
            <Icons
              type={'Entypo'}
              name={'text'}
              size={18}
              style={styles.iconText}
              color={'gray'}
            />
            <TextInput
              placeholder={PLACEHOLDER}
              numberOfLines={5}
              multiline
              autoCapitalize={'sentences'}
              onChange={handleNoteInput}
              onSubmitEditing={Keyboard.dismiss}
              onFocus={() => setShowTextarea(true)}
              onBlur={() => setShowTextarea(false)}
              style={styles.inputArea}
              textAlignVertical={'top'}
              placeholderTextColor={'gray'}
            />
          </TouchableOpacity>
          {showTextarea && (
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setShowTextarea(false);
                setNote(refNoteInput.current);
              }}
              style={styles.btnSaveNote}>
              <TextSemiBold style={{color: Colors.whiteColor}}>
                Lưu
              </TextSemiBold>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}

      {!showTextarea && (
        <CustomButton
          styled={{
            marginBottom: 10,
            backgroundColor: !axitUric ? 'lightgray' : Colors.primary,
          }}
          onPress={() => {
            conclusion !== -1 && saveParameter();
            conclusion === -1 && handleSubmit();
          }}
          isDisabled={!axitUric}
          label={
            conclusion !== -1 ? strings.common.save : strings.common.continue
          }
        />
      )}
      <DateTimePicker
        isOpen={openDatePicker}
        maxDate={new Date()}
        type={'date'}
        onConfirm={v => {
          setDate(v);
          setOpenDatePicker(false);
        }}
        onClose={() => setOpenDatePicker(false)}
      />
    </Pressable>
  );
};
export default AxitUric;
