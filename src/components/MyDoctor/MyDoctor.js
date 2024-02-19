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
import DoctorItem from './DoctorItem';
import {NAVIGATION_DOCTOR_DETAIL} from '../../navigation/routes';

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
      <DoctorItem
        item={item}
        selectItem={() => navigation.navigate(NAVIGATION_DOCTOR_DETAIL)}
      />
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
