import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Animated,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {TextNormalSemiBold, TextSemiBold} from 'common/Text/TextFont';
import Icons from 'common/Icons/Icons';
import Colors from 'theme/Colors';
import InputManual from './InputManual';
import strings from 'localization/Localization';
import CustomButton from 'common/CustomButton/CustomButton';
import {
  BLOOD_PRESSURE_DATA,
  CODE_BLOOD_PRESSURE,
  UNIT_BEAT_MIN,
  UNIT_MMHG,
  convertDateParameter,
  convertDate,
  widthDevice,
} from 'assets/constans';
import CustomHeader from './CustomHeader';
import {statusCreateParamSelector} from 'store/parameter/parameterSelector';
import {useDispatch, useSelector} from 'react-redux';
import {
  createParameterAction,
  resetCreationParameter,
} from 'store/parameter/parameterAction';
import {NAVIGATION_HOME} from 'navigation/routes';
import Status from 'common/Status/Status';
import DateTimePicker from 'common/DateTImePicker/DateTimePicker';
const PLACEHOLDER =
  'Ghi chú trạng thái cảm giác của bạn khi đo huyết áp, chất luợng giấc ngủ, chế độ dinh duỡng, bài tập thể dục gần đây của bạn...';
const BloodPressure = ({navigation, setWarningModal}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [systolic, setSystolic] = useState('');
  const [firstReady, setFirstReady] = useState(false);
  const [diastolic, setDiastolic] = useState('');
  const [secondReady, setSecondReady] = useState(false);
  const [heartbeat, setHeartbeat] = useState('');
  const [thirdReady, setThirdReady] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [conclusion, setConclusion] = useState(-1);
  const [showTextarea, setShowTextarea] = useState(false);
  const refCardHeight = React.useRef(0);
  const [note, setNote] = useState('');
  const refNoteInput = useRef('');
  const cardTransition = new Animated.Value(0);
  const inputTransition = new Animated.Value(0);
  const [activeInput, setActiveInput] = useState(0);
  Keyboard.addListener('keyboardDidHide', () => {
    setActiveInput(-1);
    setShowTextarea(false);
  });
  Keyboard.addListener('keyboardDidShow', () => {
    if (showTextarea) {
      Animated.timing(cardTransition, {
        duration: 400,
        toValue: widthDevice,
        useNativeDriver: true,
      }).start();
      Animated.timing(inputTransition, {
        duration: 500,
        toValue: -refCardHeight.current,
        useNativeDriver: true,
      }).start();
    }
  });
  useEffect(() => {
    if (
      !showTextarea &&
      refNoteInput.current &&
      refNoteInput.current.length > 0
    ) {
      setNote(refNoteInput.current);
    }
  }, [showTextarea]);
  useEffect(() => {
    if (firstReady && !secondReady && !thirdReady && !warningMessage) {
      setActiveInput(2);
    }
  }, [firstReady]);
  useEffect(() => {
    if (firstReady && secondReady && !thirdReady && !warningMessage) {
      setActiveInput(3);
    }
  }, [secondReady]);
  useEffect(() => {
    if (!firstReady && secondReady && thirdReady && !warningMessage) {
      setActiveInput(1);
    }
    if (firstReady && secondReady && thirdReady && !warningMessage) {
      setActiveInput(0);
    }
  }, [thirdReady]);
  const handleActiveInput = type => {
    if (warningMessage) {
      return;
    }
    setActiveInput(type);
  };
  const handleSubmit = () => {
    if (warningMessage) {
      return;
    }
    Keyboard.dismiss();
    setActiveInput(0);
    let resultFirst;
    let resultSecond;
    for (let [key, value] of BLOOD_PRESSURE_DATA.entries()) {
      if (
        key.min_tam_thu <= parseInt(systolic, 10) &&
        parseInt(systolic, 10) <= key.max_tam_thu
      ) {
        resultFirst = {key, value};
      }
      if (
        key.min_tam_truong <= parseInt(diastolic, 10) &&
        parseInt(diastolic, 10) <= key.max_tam_truong
      ) {
        resultSecond = {key, value};
      }
    }
    const result = {
      content:
        resultFirst.key.id > resultSecond.key.id
          ? resultFirst.value
          : resultSecond.value,
      color:
        resultFirst.key.id > resultSecond.key.id
          ? resultFirst.key.color
          : resultSecond.key.color,
      status:
        resultFirst.key.id > resultSecond.key.id
          ? resultFirst.key.status
          : resultSecond.key.status,
    };
    console.log('my conclusion::', result);
    setConclusion(result);
  };
  const handleSelectInput = index => {
    handleActiveInput(index);
    if (index === 1) {
      setSystolic('');
      setConclusion(-1);
    } else if (index === 2) {
      setDiastolic('');
      setConclusion(-1);
    } else {
      setHeartbeat('');
    }
  };
  const dispatch = useDispatch();
  const statusCreateParameter = useSelector(state =>
    statusCreateParamSelector(state),
  );
  const saveParameter = () => {
    const payload = {
      blood_pressure: {
        index_dia: parseInt(diastolic, 10),
        index_pulse: parseInt(heartbeat, 10),
        index_sys: parseInt(systolic, 10),
        unit_dia: UNIT_MMHG,
        unit_pulse: UNIT_BEAT_MIN,
        unit_sys: UNIT_MMHG,
      },
      noted: note || '',
      status: conclusion.status,
      date: convertDateParameter(date.toLocaleString('en-GB')) || '',
      parameters_monitor_code: CODE_BLOOD_PRESSURE,
    };

    dispatch(createParameterAction(payload));
  };

  useEffect(() => {
    if (statusCreateParameter === Status.SUCCESS) {
      dispatch(resetCreationParameter());
      conclusion.status === 0
        ? navigation.navigate(NAVIGATION_HOME)
        : setWarningModal(true);
    }
  }, [statusCreateParameter]);
  const handleNoteInput = ({nativeEvent}) => {
    refNoteInput.current = nativeEvent.text;
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        conclusion={conclusion}
        title={'Huyết áp'}
        navigation={navigation}
        showTextarea={showTextarea}
      />
      <Animated.View
        onLayout={({nativeEvent}) => {
          if (conclusion) {
            refCardHeight.current = nativeEvent.layout.height;
          }
        }}
        style={[
          styles.wrapperMainContent,
          conclusion !== -1 && {
            backgroundColor: Colors.whiteColor,
            marginHorizontal: 15,
          },
          showTextarea && {
            transform: [
              {
                translateX: cardTransition,
              },
            ],
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            setActiveInput(-1);
            Keyboard.dismiss();
            showTextarea && setShowTextarea(false);
            setOpenDatePicker(true);
          }}
          style={styles.wrapperDateAxit}>
          <Icons
            type={'Fontisto'}
            name={'calendar'}
            size={18}
            color={Colors.gray.gray40}
          />
          <TextNormalSemiBold style={styles.textTodayAxit}>
            {`${convertDate(date)} ${date
              .toLocaleTimeString('vi-VN')
              .substring(0, 5)}`}
          </TextNormalSemiBold>
        </TouchableOpacity>
        {conclusion !== -1 && (
          <TouchableOpacity
            onPress={() => setConclusion(-1)}
            style={[styles.editButton]}>
            <Icons
              type={'AntDesign'}
              name={'edit'}
              size={20}
              color={Colors.gray.gray40}
            />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.containerInputHealth,
            conclusion !== -1 && {marginTop: 0},
          ]}>
          <TouchableOpacity
            onPress={() => handleSelectInput(1)}
            style={[
              styles.wrapperInputHeath,
              conclusion !== -1 && {backgroundColor: 'white'},
              activeInput === 1 && styles.wrapperActiveInputHealth,
            ]}>
            <InputManual
              code={systolic}
              setCode={setSystolic}
              setPinReady={setFirstReady}
              min={30}
              max={300}
              onWarning={value =>
                setWarningMessage(value === true ? 'Tâm thu không hợp lệ' : '')
              }
              isFocused={activeInput === 1}
            />
            <TextNormalSemiBold
              style={[
                styles.textLabelInput,
                activeInput === 1 && {color: Colors.main},
              ]}>
              {'Tâm thu'}
            </TextNormalSemiBold>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectInput(2)}
            style={[
              styles.wrapperInputHeath,
              conclusion !== -1 && {backgroundColor: 'white'},
              activeInput === 2 && styles.wrapperActiveInputHealth,
            ]}>
            <InputManual
              code={diastolic}
              setCode={setDiastolic}
              setPinReady={setSecondReady}
              min={20}
              max={250}
              onWarning={value =>
                setWarningMessage(
                  value === true ? 'Tâm truơng không hợp lệ' : '',
                )
              }
              isFocused={activeInput === 2}
            />
            <TextNormalSemiBold
              style={[
                styles.textLabelInput,
                activeInput === 2 && {color: Colors.gray.gray20},
              ]}>
              {'Tâm truơng'}
            </TextNormalSemiBold>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectInput(3)}
            style={[
              styles.wrapperInputHeath,
              conclusion !== -1 && {backgroundColor: 'white'},
              activeInput === 3 && styles.wrapperActiveInputHealth,
            ]}>
            <InputManual
              code={heartbeat}
              setCode={setHeartbeat}
              setPinReady={setThirdReady}
              min={45}
              max={240}
              isFocused={activeInput === 3}
              onWarning={value => {
                setWarningMessage(
                  value === true ? 'Nhịp tim không hợp lệ' : '',
                );
              }}
            />
            <TextNormalSemiBold
              style={[
                styles.textLabelInput,
                activeInput === 3 && {color: Colors.gray.gray20},
              ]}>
              {'Nhịp tim'}
            </TextNormalSemiBold>
          </TouchableOpacity>
        </View>
        {conclusion === -1 ? (
          <View style={styles.wrapperManualText}>
            <TextNormalSemiBold style={{color: Colors.gray.gray50}}>
              {activeInput === 1
                ? 'Tầm thu theo mmHg (30 ~ 300)'
                : activeInput === 3
                ? 'Nhịp tim theo nhịp/phút (45 - 240)'
                : 'Tầm truơng theo mmHg (20 ~ 250)'}
            </TextNormalSemiBold>
            {warningMessage && (
              <TextNormalSemiBold style={styles.textWarning}>
                {warningMessage}
              </TextNormalSemiBold>
            )}
          </View>
        ) : (
          <View style={styles.labelAxit}>
            <TextNormalSemiBold style={styles.methodText}>
              {'Thủ công'}
            </TextNormalSemiBold>
          </View>
        )}
        {conclusion !== -1 && (
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
      {conclusion !== -1 && (
        <Animated.View
          style={[
            showTextarea && {transform: [{translateY: inputTransition}]},
          ]}>
          <TouchableOpacity
            style={[
              styles.wrapperInputArea,
              showTextarea && styles.activeTextArea,
            ]}>
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
              onChange={handleNoteInput}
              onFocus={() => setShowTextarea(true)}
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
                {'Hoàn thành'}
              </TextSemiBold>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
      {!showTextarea && (
        <CustomButton
          styled={{
            marginBottom: 10,
            backgroundColor:
              !systolic || !diastolic ? 'lightgray' : Colors.primary,
          }}
          onPress={() => {
            conclusion !== -1 && saveParameter();
            conclusion === -1 && handleSubmit();
          }}
          isDisabled={!systolic || !diastolic}
          label={
            conclusion !== -1 ? strings.common.save : strings.common.continue
          }
        />
      )}
      <DateTimePicker
        isOpen={openDatePicker}
        maxDate={new Date()}
        onConfirm={v => {
          setDate(v);
          setOpenDatePicker(false);
        }}
        onClose={() => setOpenDatePicker(false)}
      />
    </View>
  );
};
export default BloodPressure;
