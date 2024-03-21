import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {TextMoneyBold, TextNormalSemiBold} from 'common/Text/TextFont';
import Icons from 'common/Icons/Icons';
import Colors from 'theme/Colors';
import strings from 'localization/Localization';
import HorizontalRange from 'common/HorizontalRange/HorizontalRange';
import CustomButton from 'common/CustomButton/CustomButton';
import {
  HBA1C_MOL,
  HBA1C_PERCENT,
  widthDevice,
  convertDate,
  convertDateParameter,
} from 'assets/constans';
import UnitSelector from 'common/UnitSelector/UnitSelector';
import ConclusionInput from './ConclusionInput';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from './CustomHeader';
import {statusCreateParamSelector} from 'store/selectors';
import {
  createParameterAction,
  resetCreationParameter,
} from 'store/parameter/parameterAction';
import DateTimePicker from '../../common/DateTImePicker/DateTimePicker';
import {CODE_HBA1C, UNIT_MMOL_MOL, UNIT_PERCENTER} from 'assets/constans';
import {NAVIGATION_HOME} from 'navigation/routes';
import Status from 'common/Status/Status';
import TransitionContainer from '../../common/TransitionContainer/TransitionContainer';
const MIN_PERCENT = 3;
const MIN_MOL = 9;
const HbA1c = ({navigation}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [messure, setMessure] = useState(1);
  const [hba1c, setHba1c] = useState(40);
  const inputTransition = new Animated.Value(-widthDevice);
  const conclusionTransition = new Animated.Value(widthDevice);
  const [conclusion, setConclusion] = useState(-1);
  const dispatch = useDispatch();
  const statusCreateParameter = useSelector(state =>
    statusCreateParamSelector(state),
  );
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [loading]);
  useEffect(() => {
    if (!loading && hba1c) {
      setTimeout(() => {
        checkValid();
      }, 100);
    }
  }, [hba1c]);
  const checkValid = () => {
    messure === 1 && setInvalid(parseFloat(hba1c) < parseFloat(MIN_MOL));
    messure === 2 && setInvalid(parseFloat(hba1c) < parseFloat(MIN_PERCENT));
  };
  const processInput = () => {
    if (invalid) {
      return;
    }
    const checkList = messure === 1 ? HBA1C_MOL : HBA1C_PERCENT;
    checkList.map(item => {
      if (parseFloat(hba1c) >= item.min && parseFloat(hba1c) <= item.max) {
        setConclusion({
          content: item.key,
          color: item.color,
          icon: 'test-tube',
        });
        return;
      }
    });
  };
  useEffect(() => {
    conclusion !== -1 &&
      conclusionTransition &&
      animatedAction(conclusionTransition);
    conclusion === -1 && inputTransition && animatedAction(inputTransition);
  }, [conclusion]);
  const animatedAction = val => {
    Animated.timing(val, {
      duration: 600,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const saveParameter = noted => {
    dispatch(
      createParameterAction({
        a1c_lab_test: {
          unit: messure === 1 ? UNIT_MMOL_MOL : UNIT_PERCENTER,
          index: parseFloat(hba1c),
        },
        parameters_monitor_code: CODE_HBA1C,
        noted,
        date: convertDateParameter(date.toLocaleString('en-GB')) || '',
      }),
    );
  };
  useEffect(() => {
    if (statusCreateParameter === Status.SUCCESS) {
      dispatch(resetCreationParameter());
      navigation && navigation.navigate(NAVIGATION_HOME);
    }
  }, [statusCreateParameter]);

  return (
    <View style={styles.container}>
      {conclusion === -1 && (
        <Animated.View
          style={{flex: 1, transform: [{translateX: inputTransition}]}}>
          <CustomHeader
            conclusion={{icon: 'test-tube', color: Colors.blue.blue50}}
            title={'Xét nghiệm HbA1c'}
            navigation={navigation}
            showTextarea={false}
          />
          <Animated.View style={[styles.containerBloodSugar]}>
            <View style={{alignItems: 'center', marginTop: 30}}>
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
              <TextMoneyBold style={styles.bloodSugarText}>
                {hba1c}
              </TextMoneyBold>
              <UnitSelector
                firstOption={'mmol/mol'}
                secondOption={'%'}
                onPressSelector={val => {
                  setHba1c(val === 1 ? 45.0 : 5.5);
                  setMessure(val);
                }}
                isSelected={messure}
              />
            </View>
            {loading ? (
              <ActivityIndicator
                style={{alignSelf: 'center', marginVertical: 20}}
                size={'large'}
                color={Colors.buttonBackground}
              />
            ) : (
              <HorizontalRange
                type={messure === 2 ? '%' : 'mmol/mol'}
                initValue={hba1c}
                setValue={setHba1c}
                max={messure === 2 ? 18 * 10 : 162 * 10}
              />
            )}
            <TextNormalSemiBold style={styles.textNoteSlider}>
              {messure === 2
                ? 'A1C  đơn vị % (3.0 ~ 17.0)'
                : 'A1C  đơn vị mmol/mol (9 ~ 162)'}
            </TextNormalSemiBold>
          </Animated.View>
          <CustomButton
            onPress={() => processInput()}
            isDisabled={invalid}
            labelStyled={invalid && {color: Colors.whiteColor}}
            styled={{
              marginBottom: 20,
              backgroundColor: !invalid ? Colors.primary : Colors.gray.gray80,
            }}
            label={strings.common.continue}
          />
        </Animated.View>
      )}

      {conclusion && conclusion !== -1 && (
        <Animated.View
          style={[
            {
              flex: 1,
              transform: [{translateX: conclusionTransition}],
            },
          ]}>
          <ConclusionInput
            navigation={navigation}
            conclusion={conclusion}
            title={'Xét nghiệm HbA1c'}
            resetConclusion={() => {
              setLoading(true);
              setConclusion(-1);
            }}
            onSave={noted => saveParameter(noted)}
            value={hba1c}
            date={date}
            withTime={false}
            unit={messure === 2 ? '%' : 'mmol/mol'}
            type={4}
          />
        </Animated.View>
      )}
      <TransitionContainer>
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
      </TransitionContainer>
    </View>
  );
};
export default HbA1c;
