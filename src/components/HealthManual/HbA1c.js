import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {TextMoneyBold, TextNormalSemiBold} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import HorizontalRange from '../../common/HorizontalRange/HorizontalRange';
import CustomButton from '../../common/CustomButton/CustomButton';
import {HBA1C_MOL, HBA1C_PERCENT, widthDevice} from '../../assets/constans';
import UnitSelector from '../../common/UnitSelector/UnitSelector';
import ConclusionInput from './ConclusionInput';
import CustomHeader from './CustomHeader';
const MIN_PERCENT = 3;
const MIN_MOL = 9;
const HbA1c = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [messure, setMessure] = useState(1);
  const [hba1c, setHba1c] = useState(50.0);
  const inputTransition = new Animated.Value(-widthDevice);
  const conclusionTransition = new Animated.Value(widthDevice);
  const [conclusion, setConclusion] = useState(-1);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [loading]);

  const processInput = () => {
    if (messure === 1 && parseFloat(hba1c) < MIN_MOL) {
      return;
    }
    if (messure === 2 && parseFloat(hba1c) < MIN_PERCENT) {
      return;
    }
    const checkList = messure === 1 ? HBA1C_MOL : HBA1C_PERCENT;
    let result = 0;
    checkList.map(item => {
      if (parseFloat(hba1c) >= item.min && parseFloat(hba1c) <= item.max) {
        result = item;
      }
    });
    if (result) {
      setConclusion({
        content: result.key,
        color: result.color,
        icon: 'test-tube',
      });
    }
  };
  useEffect(() => {
    if (conclusion !== -1) {
      conclusionTransition && animatedAction(conclusionTransition);
    }
    inputTransition && animatedAction(inputTransition);
  }, [conclusion]);
  const animatedAction = val => {
    Animated.timing(val, {
      duration: 600,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

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
                onPress={() => {}}
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
            styled={[{marginBottom: 20}]}
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
            value={hba1c}
            unit={messure === 2 ? '%' : 'mmol/mol'}
            type={4}
          />
        </Animated.View>
      )}
    </View>
  );
};
export default HbA1c;
