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
import {HBA1C_MOL, HBA1C_PERCENT, widthDevice, today} from 'assets/constans';
import UnitSelector from 'common/UnitSelector/UnitSelector';
import ConclusionInput from './ConclusionInput';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from './CustomHeader';
import {statusCreateParamSelector} from 'store/selectors';
import {
  createParameterAction,
  resetCreationParameter,
} from 'store/parameter/parameterAction';
import {CODE_HBA1C, UNIT_MMOL_MOL, UNIT_PERCENTER} from 'assets/constans';
import {NAVIGATION_HOME} from 'navigation/routes';
import Status from 'common/Status/Status';
import {CODE_WEIGHT, UNIT_KG, UNIT_LBS} from '../../assets/constans';
const Weight = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [messure, setMessure] = useState(1);
  const [weight, setWeight] = useState(40);
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
      }, 100);
    }
  }, [loading]);

  const processInput = () => {
    setConclusion({
      content: 'Bình thuờng',
      icon: 'weight',
      color: Colors.greenColor,
      type: 'FontAwesome5',
    });
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
  const saveParameter = () => {
    const payload = {
      weight: {
        unit: messure === 1 ? UNIT_KG : UNIT_LBS,
        index: parseFloat(weight),
      },
      parameters_monitor_code: CODE_WEIGHT,
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
    <View style={styles.container}>
      {conclusion === -1 && (
        <Animated.View
          style={{flex: 1, transform: [{translateX: inputTransition}]}}>
          <CustomHeader
            conclusion={{
              icon: 'weight',
              color: Colors.greenColor,
              type: 'FontAwesome5',
            }}
            title={'Cân nặng'}
            navigation={navigation}
            showTextarea={false}
          />
          <Animated.View style={[styles.containerBloodSugar]}>
            <View
              style={{alignItems: 'center', marginTop: 30, marginBottom: 20}}>
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
                  {today}
                </TextNormalSemiBold>
              </TouchableOpacity>
              <TextMoneyBold style={styles.bloodSugarText}>
                {parseFloat(weight)}
              </TextMoneyBold>
              <UnitSelector
                firstOption={'kg'}
                secondOption={'lbs'}
                onPressSelector={val => {
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
                type={messure === 1 ? 'kg' : 'lbs'}
                initValue={weight}
                setValue={setWeight}
              />
            )}
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
            title={'Cân nặng'}
            resetConclusion={() => {
              setLoading(true);
              setConclusion(-1);
            }}
            onSave={saveParameter}
            value={weight}
            unit={messure === 2 ? 'lbs' : 'kg'}
            type={5}
          />
        </Animated.View>
      )}
    </View>
  );
};
export default Weight;
