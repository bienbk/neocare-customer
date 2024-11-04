import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from 'theme/Colors';
import {TextNormalSemiBold, TextSemiBold} from 'common/Text/TextFont';
import CustomCheckbox from 'common/CustomCheckbox/CustomCheckbox';
import Icons from '../../common/Icons/Icons';
import {NAVIGATION_HOME} from '../../navigation/routes';
import {widthDevice} from '../../assets/constans';
const temp = [
  {id: 1, name: 'Huyết áp', checked: false},
  {id: 2, name: 'Đường huyết', checked: false},
  {id: 3, name: 'Cholesterols', checked: true},
  {id: 4, name: 'Acid Uric', checked: false},
  {id: 5, name: 'HbA1c', checked: true},
  {id: 6, name: 'Số đo cơ thể', checked: true},
];
const ShowManager = ({navigation}) => {
  const [listDiseases, setlistDiseases] = useState(temp);
  const cardAnimatedY = new Animated.Value(-widthDevice);
  useEffect(() => {
    setlistDiseases(temp);
  }, []);
  const handleValueCheckbox = item => {
    const tempList = Array.from(listDiseases);
    tempList.map(i => {
      if (i.id === item.id) {
        i.checked = !i.checked;
        i.symtoms = '';
      }
    });
    setlistDiseases(tempList);
  };
  const renderSelector = () =>
    listDiseases.map(item => {
      return (
        <View key={item.id} style={styled.wrapperCheckbox}>
          <TextNormalSemiBold
            style={{fontWeight: 'bold', color: Colors.gray.gray50}}>
            {item.name}
          </TextNormalSemiBold>
          <CustomCheckbox
            value={item.checked}
            setValue={() => handleValueCheckbox(item)}
          />
        </View>
      );
    });
  const onPressBack = () => {
    navigation && navigation.navigate(NAVIGATION_HOME);
  };
  useEffect(() => {
    Animated.timing(cardAnimatedY, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);
  const opacityCard = cardAnimatedY.interpolate({
    inputRange: [-widthDevice, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styled.container}>
      <Animated.View style={[styled.wrapperHeader, {opacity: opacityCard}]}>
        <TouchableOpacity onPress={onPressBack} style={styled.backIcon}>
          <Icons
            type={'Ionicons'}
            name={'arrow-back-outline'}
            size={25}
            color={'black'}
          />
        </TouchableOpacity>
        <TextSemiBold>{'Quản lý danh mục hiển thị'}</TextSemiBold>
      </Animated.View>
      <Animated.ScrollView
        style={[
          styled.wrapperScrollView,
          {
            transform: [{translateX: cardAnimatedY}],
            opacity: opacityCard,
          },
        ]}>
        <View style={styled.wrapperList}>{renderSelector()}</View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ShowManager;
const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  wrapperScrollView: {marginTop: 10},
  wrapperList: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginHorizontal: 15,
    borderRadius: 20,
  },
  wrapperCheckbox: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
    paddingVertical: 12,
    borderStyle: 'solid',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.gray95,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperHeader: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
});
