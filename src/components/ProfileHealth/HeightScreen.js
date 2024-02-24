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
import Icons from '../../common/Icons/Icons';
import Svg from '../../common/Svg/Svg';
const heightValues = type => {
  const result = [];
  for (let i = 200; i > 100; i--) {
    result.push(type === 1 ? i : parseFloat(i * 0.03).toFixed(2));
  }
  return result;
};
const HeightScreen = ({nextStep}) => {
  const [height, setHeight] = useState({type: 1, val: 0});
  const [heightData, setHeightData] = useState([]);
  const refWeight = useRef(null);
  useEffect(() => {
    const tempList = heightValues(1) || [];
    setHeightData(tempList);
    setHeight({type: 1, val: 165});
  }, []);
  const handleWeightType = type => {
    const newWeight = {
      ...height,
      type: type,
    };
    const tempList = heightValues(type) || [];
    setHeightData(tempList);
    setHeight(newWeight);
  };
  useEffect(() => {
    if (refWeight && refWeight.current) {
      refWeight.current.scrollToItem({
        item: height.val,
        animated: true,
        viewOffset: 150,
        // viewPostion: 0,
      });
    }
  }, [height]);
  const handleWeightVal = type => {
    const tempHeight = {
      ...height,
      val:
        type === 0 ? (height.val > 100 ? height.val - 1 : 100) : height.val + 1,
    };
    setHeight(tempHeight);
  };
  const renderSlider = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setHeight({...height, val: item})}
        style={styles.wrapperSliderHeight}>
        <View
          style={{
            height: item !== height.val ? 3 : 4,
            width: index % 5 === 0 ? 55 : 30,
            borderRadius: 2,
            marginRight: index % 5 === 0 ? 5 : item === height.val ? 5 : 20,
            backgroundColor: item !== height.val ? 'lightgray' : 'blue',
          }}
        />
        {item === height.val && index % 5 !== 0 && (
          <View
            style={{
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Icons
              type={'Feather'}
              name={'chevron-left'}
              size={20}
              color={'blue'}
            />
          </View>
        )}
        {index % 5 === 0 && (
          <TextNormal
            style={{
              color: item === height.val ? 'blue' : 'gray',
              fontWeight: item === height.val ? 'bold' : 'light',
              fontSize: item === height.val ? 16 : 15,
            }}>
            {item}
          </TextNormal>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* TITLE SECTION */}
      <View style={styles.wrapperTitle}>
        <TextMoneyBold style={{fontSize: 24, marginBottom: 5}}>
          {'Chiều cao của bạn'}
        </TextMoneyBold>
        <TextNormal style={{textAlign: 'center'}}>
          {
            'Thông tin này rất quan trọng để tính toán sự trao đổi chất cơ bản của bạn'
          }
        </TextNormal>
      </View>
      {/* HeightScreen SECTION */}
      <View style={styles.wrapperHeightSection}>
        {/* TYPE OF HEIGHT */}
        <View style={[styles.wrapperWeightButton, {paddingHorizontal: 40}]}>
          <TouchableOpacity
            onPress={() => handleWeightType(1)}
            style={[
              styles.weightButton,
              height.type === 1 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[height.type === 1 && styles.activeTextWeight]}>
              CM
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleWeightType(2)}
            style={[
              styles.weightButton,
              height.type === 2 && styles.activeWeightButton,
            ]}>
            <TextNormal style={[height.type === 2 && styles.activeTextWeight]}>
              FT
            </TextNormal>
          </TouchableOpacity>
        </View>
        {/* VALUE OF HEIGHT */}
        <View style={styles.wrapperHeightButton}>
          <TouchableOpacity
            onPress={() => handleWeightVal(0)}
            style={styles.weightValueButton}>
            <Icons type={'Feather'} name={'minus'} size={26} color={'white'} />
          </TouchableOpacity>
          <TextMoneyBold style={{fontSize: 40}}>{height.val}</TextMoneyBold>
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
          // width: '100%',
          // backgroundColor: 'red',
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <Svg
          name={'icon_height'}
          size={200}
          style={{minHeight: 350, marginLeft: 10}}
        />
        <FlatList
          ref={refWeight}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{alignSelf: 'flex-end'}}
          data={heightData ? heightData : []}
          renderItem={renderSlider}
          onScrollToIndexFailed={error => {
            if (heightData && refWeight && refWeight.current) {
              refWeight.current.scrollToOffset({
                offset: error.averageItemLength * error.index,
                animated: true,
              });
            }
            setTimeout(() => {
              if (heightData && refWeight.current) {
                refWeight.current.scrollToIndex({
                  index: error.index,
                  animated: true,
                });
              }
            }, 100);
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={nextStep} style={styles.buttonContinue}>
          <TextSemiBold style={styles.textContinueButton}>
            {strings.common.continue}
          </TextSemiBold>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeightScreen;
