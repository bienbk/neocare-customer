/* eslint-disable react-native/no-inline-styles */
import {React, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import {heightDevice, widthDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import Svg from '../../common/Svg/Svg';
const weightValues = () => {
  const result = [];
  for (let i = 0; i <= 100; ) {
    result.push(i);
    i += 1;
  }
  return result;
};
const WeightScreen = ({nextStep}) => {
  const [weight, setWeight] = useState({type: 1, val: 0});
  const refWeight = useRef(null);

  const handleWeightType = type => {
    const newWeight = {
      ...weight,
      type: type,
    };
    setWeight(newWeight);
  };
  useEffect(() => {
    if (refWeight && refWeight.current) {
      refWeight.current.scrollToItem({
        item: weight.val,
        animated: true,
        viewOffset: widthDevice / 2 - 25,
        // viewPostion: 0,
      });
    }
  }, [weight]);
  const handleWeightVal = type => {
    const tempWeight = {
      ...weight,
      val: type === 0 ? weight.val - 1 : weight.val + 1,
    };
    setWeight(tempWeight);
  };
  const renderSlider = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setWeight({...weight, val: item})}
        style={styles.wrapperSliderItem}>
        <View
          style={{
            height: item % 5 === 0 ? 50 : 25,
            width: item !== weight.val ? 3 : 4,
            borderRadius: 2,
            marginBottom: item % 5 === 0 ? 10 : item === weight.val ? 0 : 20,
            backgroundColor: item !== weight.val ? 'lightgray' : 'blue',
          }}
        />
        {item === weight.val && item % 5 !== 0 && (
          <View
            style={{
              marginTop: 5,
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Icons
              type={'Feather'}
              name={'navigation-2'}
              size={20}
              color={'blue'}
            />
          </View>
        )}
        {item % 5 === 0 && (
          <View>
            <TextNormal
              style={{
                color: item === weight.val ? 'blue' : 'gray',
                fontWeight: item === weight.val ? 'bold' : '',
                fontSize: item === weight.val ? 15 : 14,
              }}>
              {item}
            </TextNormal>
          </View>
        )}
      </TouchableOpacity>
    );
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
              weight.type === 1 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[weight.type === 1 && styles.activeTextWeight]}>
              KG
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleWeightType(2)}
            style={[
              styles.weightButton,
              weight.type === 2 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[weight.type === 2 && styles.activeTextWeight]}>
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
          <TextMoneyBold style={{fontSize: 40}}>{weight.val}</TextMoneyBold>
          <TouchableOpacity
            onPress={() => handleWeightVal(1)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'plus'} size={26} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* SLIDER */}
      <View
        style={{
          width: '100%',
          // backgroundColor: 'red',
          paddingVertical: 20,
        }}>
        <FlatList
          horizontal
          ref={refWeight}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          data={weightValues()}
          renderItem={renderSlider}
          onScrollToIndexFailed={error => {
            if (refWeight && refWeight.current) {
              refWeight.current.scrollToOffset({
                offset: error.averageItemLength * error.index,
                animated: true,
              });
            }
            setTimeout(() => {
              if (refWeight.current) {
                refWeight.current.scrollToIndex({
                  index: error.index,
                  animated: true,
                });
              }
            }, 100);
          }}
        />
      </View>
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
