import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  Animated,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {TextMoneyBold, TextNormalSemiBold} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import HorizontalRange from '../../common/HorizontalRange/HorizontalRange';
import CustomButton from '../../common/CustomButton/CustomButton';
import {
  BLOOD_SUGAR_MG,
  BLOOD_SUGAR_MOL,
  widthDevice,
} from '../../assets/constans';
import UnitSelector from '../../common/UnitSelector/UnitSelector';
import ConclusionInput from './ConclusionInput';
import CustomHeader from './CustomHeader';
const MIN_MG = 36;
const MIN_MOL = 2.0;
const BloodSugar = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [messure, setMessure] = useState(1);
  const [bloodSugar, setBloodSugar] = useState(40);
  const [timeMessure, setTimeMessure] = useState(1);
  const [conclusion, setConclusion] = useState(-1);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [loading]);

  const renderTimerItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setTimeMessure(index + 1)}
        style={[
          styles.wrapperTime,
          timeMessure === index + 1 && {
            backgroundColor: '#d30c7b',
          },
        ]}>
        <TextNormalSemiBold
          style={
            timeMessure === index + 1 && {
              color: Colors.whiteColor,
            }
          }>
          {item.name}
        </TextNormalSemiBold>
      </TouchableOpacity>
    );
  };
  const processInput = () => {
    if (messure === 1 && parseFloat(bloodSugar) < MIN_MG) {
      return;
    }
    if (messure === 2 && parseFloat(bloodSugar) < MIN_MOL) {
      return;
    }
    let result;
    const checkList = messure === 1 ? BLOOD_SUGAR_MG : BLOOD_SUGAR_MOL;
    checkList.map(item => {
      if (
        timeMessure === 1 &&
        item.type_1.min <= parseFloat(bloodSugar) &&
        parseFloat(bloodSugar) <= item.type_1.max
      ) {
        result = item;
      }
      if (
        timeMessure === 2 &&
        item.type_2.min <= parseFloat(bloodSugar) &&
        parseFloat(bloodSugar) <= item.type_2.max
      ) {
        result = item;
      }
      if (
        timeMessure === 3 &&
        item.type_3.min <= parseFloat(bloodSugar) &&
        parseFloat(bloodSugar) <= item.type_3.max
      ) {
        result = item;
      }
    });
    if (result) {
      setConclusion({content: result.key, color: result.type_1.color});
    }
  };
  useEffect(() => {
    if (conclusion !== -1) {
      conclusionTransition && animatedAction(conclusionTransition);
    } else {
      inputTransition && animatedAction(inputTransition);
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
  return (
    <View style={styles.container}>
      {conclusion === -1 && (
        <Animated.View
          style={{flex: 1, transform: [{translateX: inputTransition}]}}>
          <CustomHeader
            conclusion={''}
            title={'Đuờng huyết'}
            navigation={navigation}
            showTextarea={false}
          />
          <Animated.View style={[styles.containerBloodSugar]}>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => console.log()}
                style={styles.wrapperDatePicker}>
                <Icons
                  type={'Feather'}
                  name={'calendar'}
                  size={18}
                  color={'black'}
                />
                <TextNormalSemiBold style={styles.textToday}>
                  {new Date().toUTCString()}
                </TextNormalSemiBold>
              </TouchableOpacity>
              <TextMoneyBold style={styles.bloodSugarText}>
                {bloodSugar}
              </TextMoneyBold>
              <UnitSelector
                firstOption={'mg/dL'}
                secondOption={'mmol/L'}
                onPressSelector={val => {
                  setBloodSugar(val === 1 ? 45.0 : 5.5);
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
                type={messure === 1 ? 'mg' : 'mol'}
                initValue={bloodSugar}
                setValue={setBloodSugar}
                max={messure === 2 ? 50 * 10 : 200 * 10}
              />
            )}
            <TextNormalSemiBold style={styles.textNoteSlider}>
              {messure === 1
                ? 'Đuờng huyết đơn vị mg/dL (36 ~ 240)'
                : 'Đuờng huyết đơn vị mmol/L (2.0 ~ 49.9)'}
            </TextNormalSemiBold>
            <View style={{paddingVertical: 15, alignItems: 'center'}}>
              <FlatList
                data={[{name: 'Nhịn ăn'}, {name: 'Sau ăn'}, {name: 'Truớc ăn'}]}
                contentContainerStyle={styles.wrapperTimerFlatlist}
                horizontal={true}
                renderItem={renderTimerItem}
              />
              <TextNormalSemiBold style={styles.textTimeMessure}>
                {timeMessure === 1
                  ? '8 giờ hoặc hơn kể từ sau bữa ăn gần nhất'
                  : timeMessure === 2
                  ? '2 giờ sau ăn'
                  : 'Bất cứ khi nào'}
              </TextNormalSemiBold>
            </View>
          </Animated.View>
          <CustomButton
            onPress={() => processInput()}
            styled={{marginBottom: 20}}
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
            title={'Đuờng huyết'}
            resetConclusion={() => {
              setLoading(true);
              setConclusion(-1);
            }}
            value={bloodSugar}
            unit={messure ? 'mg/dL' : 'mmol/L'}
            time={timeMessure}
          />
        </Animated.View>
      )}
    </View>
  );
};
export default BloodSugar;
