import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {TextNormalSemiBold, TextSemiBold} from '../../common/Text/TextFont';
import {NAVIGATION_HOME} from '../../navigation/routes';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import {
  CHOLESTEROL_MG,
  CHOLESTEROL_MOL,
  CODE_CHOLESTEROL,
  UNIT_MG_DL,
  UNIT_MMOL_MOL,
  convertDate,
  widthDevice,
} from '../../assets/constans';
import strings from '../../localization/Localization';
import UnitSelector from '../../common/UnitSelector/UnitSelector';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomHeader from './CustomHeader';
import ConclusionInput from './ConclusionInput';
import {useDispatch, useSelector} from 'react-redux';
import {statusCreateParamSelector} from 'store/selectors';
import {
  createParameterAction,
  resetCreationParameter,
} from '../../store/parameter/parameterAction';
import Status from '../../common/Status/Status';
import DateTimePicker from '../../common/DateTImePicker/DateTimePicker';
const items = [
  {id: 1, name: 'HDL-C'},
  {id: 2, name: 'LDL-C'},
  {id: 3, name: 'Triglycerides'},
  {id: 4, name: 'Toàn phần'},
];

const Cholesterol = ({navigation, route}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [HDL, setHDL] = useState('');
  const [LDL, setLDL] = useState('');
  const [Triglycerides, setTriglycerides] = useState('');
  const [total, setTotal] = useState(0);
  const [inputActive, setInputActive] = useState(-1);
  const textInputRef = useRef(null);
  const [messure, setMessure] = useState(1);
  const [warning, setWarning] = useState(false);
  const [conclusion, setConclusion] = useState(-1);
  const dispatch = useDispatch();
  const statusCreateParameter = useSelector(state =>
    statusCreateParamSelector(state),
  );
  Keyboard.addListener('keyboardDidHide', () => setInputActive(-1));
  const handleInput = (val, index) => {
    const value =
      messure === 2 ? val.replace(/\D\./g, '') : val.replace(/\D/g, '');
    switch (index) {
      case 0:
        setHDL(value ? value : '');
        break;
      case 1:
        setLDL(value ? value : '');
        break;
      case 2:
        setTriglycerides(value ? value : '');
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (HDL) {
      messure === 1
        ? setHDL(prev => (prev = Math.round(prev * 38.67).toFixed(0)))
        : setHDL(prev => (prev = parseFloat(prev / 38.67).toFixed(2)));
    }
    if (LDL) {
      messure === 1
        ? setLDL(prev => (prev = Math.round(prev * 38.67).toFixed(0)))
        : setLDL(prev => (prev = parseFloat(prev / 38.67).toFixed(2)));
    }
    if (Triglycerides) {
      messure === 1
        ? setTriglycerides(prev =>
            Math.round((prev = parseFloat(prev * 88.57396))),
          )
        : setTriglycerides(
            prev => (prev = parseFloat(prev * 0.01129).toFixed(2)),
          );
    }
  }, [messure]);
  useEffect(() => {
    if (LDL && HDL && Triglycerides) {
      setTotal(
        parseFloat(LDL) + parseFloat(HDL) + parseFloat(Triglycerides) * 0.2,
      );
    }
  }, [LDL, HDL, Triglycerides]);
  const footerComponent = () => {
    return (
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <UnitSelector
          firstOption={'mg/dL'}
          secondOption={'mmol/L'}
          onPressSelector={val => setMessure(val)}
          isSelected={messure}
        />
      </View>
    );
  };
  const handleBlurInput = () => {
    if (inputActive === -1) {
      Keyboard.dismiss();
      setInputActive(-1);
    }
  };
  const renderInputItem = ({item, index}) => {
    if (!item) {
      return;
    }
    return (
      <View style={styles.wrapperDataItem}>
        <TextSemiBold>{item?.name.toUpperCase()}</TextSemiBold>
        <View style={styles.wrapperRowItem}>
          <TouchableOpacity
            style={[
              styles.wrapperInputCholesterol,
              inputActive === index && styles.activeInputCholesterol,
            ]}>
            <View style={styles.inputContainerPressable}>
              <TextSemiBold style={styles.textCholesterol}>
                {index === 0
                  ? HDL
                    ? HDL
                    : '-'
                  : index === 1
                  ? LDL
                    ? LDL
                    : '-'
                  : index === 2
                  ? Triglycerides
                    ? Triglycerides
                    : '-'
                  : total}
              </TextSemiBold>
            </View>
            {index !== 3 && (
              <TextInput
                onChangeText={e => handleInput(e, index)}
                maxLength={5}
                keyboardType="number-pad"
                returnKeyType="done"
                textContentType="oneTimeCode"
                ref={textInputRef}
                onFocus={() => setInputActive(index)}
                onBlur={handleBlurInput}
                style={styles.inputCholesterol}
              />
            )}
          </TouchableOpacity>

          <Icons
            type={'AntDesign'}
            name={'questioncircleo'}
            size={20}
            color={'gray'}
          />
        </View>
      </View>
    );
  };
  const processInput = () => {
    const checkList = messure === 1 ? CHOLESTEROL_MG : CHOLESTEROL_MOL;
    console.log(checkList);
    let conclusions = {
      unit: messure === 1 ? 'mg/dL' : 'mmol/L',
      HDL: {
        value: HDL,
        name: 'HDL-C',
        review: '',
        color: '',
      },
      LDL: {
        value: LDL,
        review: '',
        name: 'LDL-C',
        color: '',
      },
      Trig: {
        value: Triglycerides,
        review: '',
        name: 'Triglycerides',
        color: '',
      },
      Total: {
        value: total,
        review: '',
        name: 'TOTAL',
        color: '',
      },
    };
    checkList.map(item => {
      if (item.name === 'HDL') {
        conclusions.HDL.review =
          parseFloat(HDL) >= item.average ? 'Bình thuờng ' : 'Thấp';
        conclusions.HDL.color =
          parseFloat(HDL) >= item.average ? '#50C878' : '#f73e3a';
      }
      if (item.name === 'LDL') {
        conclusions.LDL.review =
          parseFloat(LDL) <= item.average ? 'Bình thuờng ' : 'Cao';
        conclusions.LDL.color =
          parseFloat(LDL) <= item.average ? '#50C878' : '#f73e3a';
      }
      if (item.name === 'TRIG') {
        conclusions.Trig.review =
          parseFloat(Triglycerides) <= item.average ? 'Bình thuờng ' : 'Cao';
        conclusions.Trig.color =
          parseFloat(Triglycerides) <= item.average ? '#50C878' : '#f73e3a';
      } else {
        conclusions.Total.review =
          parseFloat(total) <= item.average ? 'Bình thuờng ' : 'Cao';
        conclusions.Total.color =
          parseFloat(total) <= item.average ? '#50C878' : '#f73e3a';
      }
    });
    setConclusion(conclusions);
  };
  useEffect(() => {
    if (conclusion && conclusion !== -1) {
      animatedAction(conclusionTransition);
    } else {
      animatedAction(inputTransition);
    }
  }, [conclusion]);
  const animatedAction = val => {
    Animated.timing(val, {
      duration: 600,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const conclusionTransition = new Animated.Value(widthDevice);
  const inputTransition = new Animated.Value(-widthDevice);

  const saveParameter = () => {
    const payload = {
      cholesterol: {
        unit: conclusion.unit === 1 ? UNIT_MG_DL : UNIT_MMOL_MOL,
        index_hdlc: parseFloat(HDL),
        index_ldlc: parseFloat(LDL),
        triglycerides: parseFloat(Triglycerides),
        total: parseFloat(total),
      },
      parameters_monitor_code: CODE_CHOLESTEROL,
    };
    dispatch(createParameterAction(payload));
  };
  useEffect(() => {
    if (statusCreateParameter === Status.SUCCESS) {
      dispatch(resetCreationParameter());
      navigation && navigation.navigate(NAVIGATION_HOME);
    }
  }, [statusCreateParameter]);
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      {conclusion === -1 && (
        <Animated.View
          style={{flex: 1, transform: [{translateX: inputTransition}]}}>
          <CustomHeader
            conclusion={{color: '#FFE600'}}
            title={'Mỡ máu'}
            navigation={navigation}
            showTextarea={false}
          />
          <View style={{paddingVertical: 20, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
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
                {`${convertDate(date, true)}`}
              </TextNormalSemiBold>
            </TouchableOpacity>
          </View>
          <FlatList
            data={items}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderInputItem}
            ListFooterComponent={footerComponent}
          />
          <CustomButton
            isDisabled={total === 0}
            onPress={processInput}
            labelStyled={total === 0 && {color: 'white'}}
            styled={{
              backgroundColor:
                total === 0 ? Colors.gray.gray80 : Colors.primary,
              marginBottom: 20,
            }}
            label={strings.common.continue}
          />
        </Animated.View>
      )}
      {conclusion !== -1 && (
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
            onSave={saveParameter}
            withTime={false}
            date={date}
            title={'Mỡ máu'}
            resetConclusion={() => setConclusion(-1)}
            value={conclusion}
            unit={messure === 1 ? 'mg/dL' : 'mmol/L'}
            time={''}
          />
        </Animated.View>
      )}
      <DateTimePicker
        isOpen={openDatePicker}
        type={'date'}
        maxDate={new Date()}
        onConfirm={v => {
          setDate(v);
          setOpenDatePicker(false);
        }}
        onClose={() => setOpenDatePicker(false)}
      />
    </Pressable>
  );
};

export default Cholesterol;
