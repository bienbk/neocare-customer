/* eslint-disable react-native/no-inline-styles */
import {React, useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
// import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import {widthDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import Svg from '../../common/Svg/Svg';
import HorizontalRange from '../../common/HorizontalRange/HorizontalRange';
const weightValues = () => {
  const result = [];
  for (let i = 0; i < 100; i++) {
    result.push(i);
  }
  return result;
};
const WeightScreen = ({nextStep}) => {
  const [weight, setWeight] = useState(0);
  const [typeWeight, setTypeWeight] = useState(1);
  const [dataWeight, setDataWeight] = useState([]);
  useEffect(() => {
    const tempList = weightValues() || [];
    setDataWeight(tempList);
  }, []);

  const handleWeightType = type => {
    setTypeWeight(type);
  };
  const handleWeightVal = type => {
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
            onPress={() => handleWeightVal(0)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'minus'} size={26} color={'white'} />
          </TouchableOpacity>
          <TextMoneyBold style={{fontSize: 40}}>{weight}</TextMoneyBold>
          <TouchableOpacity
            onPress={() => handleWeightVal(1)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'plus'} size={26} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* SLIDER */}
      <HorizontalRange
        dataRange={dataWeight}
        value={weight}
        setValue={setWeight}
      />
      {/* <View
        style={{
          // width: '100%',
          // backgroundColor: 'red',
          paddingVertical: 20,
        }}>
        <FlatList
          horizontal
          ref={refWeight}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          data={dataWeight ? dataWeight : []}
          renderItem={renderSlider}
          onScrollToIndexFailed={error => {
            if (dataWeight && refWeight && refWeight.current) {
              refWeight.current.scrollToOffset({
                offset: error.averageItemLength * error.index,
                animated: true,
              });
            }
            setTimeout(() => {
              if (dataWeight && refWeight.current) {
                refWeight.current.scrollToIndex({
                  index: error.index,
                  animated: true,
                });
              }
            }, 100);
          }}
        />
        </View>*/}
      <View style={{flex: 1, alignItems: 'center'}}>
        <Svg name={'icon_weight'} size={200} />
        <TouchableOpacity onPress={nextStep} style={styles.buttonContinue}>
          <TextSemiBold style={styles.textContinueButton}>
            {strings.common.continue}
          </TextSemiBold>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeightScreen;
