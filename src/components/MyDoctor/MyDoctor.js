import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
import {
  doctor_avatar,
  heightDevice,
  logo,
  widthDevice,
} from '../../assets/constans';
import DoctorItem from './DoctorItem';
import {
  NAVIGATION_CONNECTION,
  NAVIGATION_DOCTOR_DETAIL,
} from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';
import MyModal from '../../common/MyModal/MyModal';

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
    isConnect: true,
  },
  {
    id: 3,
    name: 'Phan Kim Phương',
    class: 'TS.BS',
    department: 'Chuyên khoa Tim',
    address: 'Quan 1,TP Ho Chi Minh',
    isConnect: false,
  },
  {
    id: 4,
    name: 'Phan Kim Phương',
    class: 'TS.BS',
    department: 'Chuyên khoa Tim',
    address: 'Quan 1,TP Ho Chi Minh',
    isConnect: false,
  },
  {
    id: 5,
    name: 'Phan Kim Phương',
    class: 'TS.BS',
    department: 'Chuyên khoa Tim',
    address: 'Quan 1,TP Ho Chi Minh',
    isConnect: false,
  },
];

const MyDoctor = ({navigation}) => {
  const [listDoctor, setListDoctor] = useState([]);
  const [openOption, setOpenOption] = useState(-1);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerSafeArea}>
        <LinearGradient
          colors={['#6D86F9', '#AFB9FF']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={{height: 117, width: widthDevice}}>
          <View style={styles.wrapperTitle}>
            <TextMoneyBold
              style={{
                fontSize: 24,
                paddingHorizontal: 15,
                paddingVertical: 10,
                color: Colors.blue.blue98,
              }}>
              Bác sĩ
            </TextMoneyBold>
            <TouchableOpacity onPress={() => setOpenOption(1)}>
              <Icons
                type={'Feather'}
                name={'plus-circle'}
                size={25}
                style={styles.iconPlus}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.container}>
          <View style={styles.wrapperMydoctor}>
            <TextSemiBold style={{paddingBottom: 5}}>
              Bác sĩ của tôi
            </TextSemiBold>
            <FlatList
              scrollEnabled={false}
              data={listDoctor.filter(i => i.id <= 2)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={renderDoctorItem}
            />
          </View>
          <View style={styles.wrapperFollowingdoctor}>
            <TextSemiBold>Bác sĩ đang theo dõi</TextSemiBold>
            <FlatList
              scrollEnabled={false}
              data={listDoctor.filter(i => i.id > 2)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={renderDoctorItem}
              contentContainerStyle={{paddingVertical: 5}}
            />
          </View>
        </View>
      </ScrollView>
      <MyModal
        visible={openOption > 0}
        onPressOutSide={() => setOpenOption(-1)}>
        <View style={styles.removeModal}>
          <TouchableOpacity
            onPress={() => {
              setOpenOption(-1);
              navigation.navigate(NAVIGATION_CONNECTION, {type: 1});
            }}
            style={styles.optionButton}>
            <TextSemiBold style={{color: Colors.blue.blue40}}>
              Nhập mã thủ công
            </TextSemiBold>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenOption(-1);
              navigation.navigate(NAVIGATION_CONNECTION, {type: 2});
            }}
            style={styles.optionButton}>
            <TextSemiBold style={{color: Colors.blue.blue40}}>
              Quét mã QR
            </TextSemiBold>
          </TouchableOpacity>
        </View>
      </MyModal>
    </SafeAreaView>
  );
};

export default MyDoctor;
