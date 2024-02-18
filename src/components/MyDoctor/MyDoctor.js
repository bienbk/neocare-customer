import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import Svg from '../../common/Svg/Svg';
import Images from '../../common/Images/Images';
import {doctor_avatar, logo} from '../../assets/constans';

const doctors = [
  {
    id: 1,
    name: 'Nguyễn Hữu Nghĩa',
    class: 'PGS.TS.BS',
    department: 'Chuyên khoa ung bướu',
    address: 'Long Bien,TP Ha Noi',
    isConnect: true,
  },
  {
    id: 2,
    name: 'Lê Hoàng Bảo',
    class: 'BS',
    department: 'Chuyên khoa nội tiết',
    address: 'Cau Giay,TP Ha Noi',
    isConnect: false,
  },
  {
    id: 3,
    name: 'Phan Kim Phương',
    class: 'TS.BS',
    department: 'Chuyên khoa Tim',
    address: 'Quan 1,TP Ho Chi Minh',
    isConnect: true,
  },
];

const MyDoctor = ({navigation}) => {
  const [listDoctor, setListDoctor] = useState([]);
  useEffect(() => {
    setListDoctor(doctors);
  }, []);
  const renderDoctorItem = ({item, index}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.gray.gray95,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.gray.gray60,
            borderBottomWidth: 1,
            paddingVertical: 10,
            borderStyle: 'dotted',
          }}>
          {item && item.isConnect && (
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                paddingHorizontal: 10,
                flexDirection: 'row',
                borderTopRightRadius: 10,
                paddingVertical: 2,
                alignItems: 'center',
                borderBottomLeftRadius: 10,
                backgroundColor: Colors.blue.blue40,
              }}>
              <Icons
                type={'Feather'}
                name={'star'}
                size={15}
                color={Colors.whiteColor}
              />
              <TextNormal style={{color: Colors.whiteColor}}>
                {` ${index + 6} tháng `}
              </TextNormal>
            </View>
          )}
          <Images
            resizeMode="contain"
            style={styles.imageDoctor}
            source={doctor_avatar}
            // source={banner.image}
          />
          <View style={{paddingHorizontal: 10}}>
            <TextSemiBold style={{marginBottom: 5}}>{item.name}</TextSemiBold>
            <TextNormal style={{marginBottom: 5}}>
              {item.class + ' - ' + item.department}
            </TextNormal>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons
                type={'Feather'}
                name={'map-pin'}
                size={20}
                color={Colors.blue.blue40}
              />
              <TextNormal style={{marginLeft: 5, color: 'black'}}>
                {item.address}
              </TextNormal>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={{flex: 1, padding: 10, backgroundColor: Colors.background}}>
        <View style={styles.wrapperTitle}>
          <TextMoneyBold style={{fontSize: 24}}>Bác sĩ của tôi</TextMoneyBold>
          <View style={styles.wrapperIconSection}>
            <TouchableOpacity>
              <Icons
                type={'Feather'}
                name={'plus-circle'}
                size={25}
                style={styles.iconPlus}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, paddingVertical: 5}}>
          <FlatList
            data={listDoctor}
            showsVerticalScrollIndicator={false}
            renderItem={renderDoctorItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyDoctor;
