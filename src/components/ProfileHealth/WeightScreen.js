/* eslint-disable react-native/no-inline-styles */
import {React, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {TextMoneyBold, TextNormal} from '../../common/Text/TextFont';
// import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';

import Icons from '../../common/Icons/Icons';
import Svg from '../../common/Svg/Svg';
import HorizontalRange from '../../common/HorizontalRange/HorizontalRange';
import CustomButton from '../../common/CustomButton/CustomButton';
const WeightScreen = ({nextStep}) => {
  const [weight, setWeight] = useState(50);
  const [typeWeight, setTypeWeight] = useState(1);
  const [weightChanged, setWeightChanged] = useState(0);

  const handleWeightType = type => {
    setTypeWeight(type);
    setWeight(0);
  };
  const handleWeightVal = type => {
    setWeightChanged(type === 0 ? -1 : 1);
    setWeight(prev => (prev = type === 0 ? prev - 1 : prev + 1));
  };
  return (
    <View style={{flex: 1}}>
      {/* TITLE SECTION */}
      <View style={styles.wrapperTitle}>
        <TextMoneyBold style={{fontSize: 24, marginBottom: 5}}>
          {'Cân nặng của bạn'}
        </TextMoneyBold>
        <TextNormal style={{textAlign: 'center'}}>
          {'Thông tin này rất quan trọng để tính chỉ số khối cơ thể của bạn'}
        </TextNormal>
      </View>
      {/* WEIGHT SECTION */}
      <View style={styles.wrapperWeightSection}>
        {/* TYPE OF WEIGHT */}
        <View style={[styles.wrapperWeightButton, {paddingHorizontal: 40}]}>
          <TouchableOpacity
            onPress={() => handleWeightType(1)}
            style={[
              styles.weightButton,
              typeWeight === 1 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[typeWeight === 1 && styles.activeTextWeight]}>
              KG
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleWeightType(2)}
            style={[
              styles.weightButton,
              typeWeight === 2 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[typeWeight === 2 && styles.activeTextWeight]}>
              LBS
            </TextNormal>
          </TouchableOpacity>
        </View>
        {/* VALUE OF WEIGHT */}
        <View style={styles.wrapperWeightButton}>
          <TouchableOpacity
            disabled={typeWeight === 2}
            onPress={() => handleWeightVal(0)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'minus'} size={26} color={'white'} />
          </TouchableOpacity>
          <TextMoneyBold style={{fontSize: 60}}>
            {parseInt(weight, 10)}
          </TextMoneyBold>
          <TouchableOpacity
            disabled={typeWeight === 2}
            onPress={() => handleWeightVal(1)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'plus'} size={26} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* SLIDER */}
      <HorizontalRange
        onChangeValue={weightChanged}
        onChangeFinished={() => setWeightChanged(0)}
        initValue={weight}
        setValue={setWeight}
        type={typeWeight === 1 ? 'kg' : 'lbs'}
      />

      <View style={{flex: 1, alignItems: 'center'}}>
        <Svg name={'icon_weight'} size={220} />
      </View>
      <CustomButton
        onPress={() => nextStep({weight})}
        label={strings.common.continue}
      />
    </View>
  );
};

export default WeightScreen;
