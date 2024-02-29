import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {
  MIDDLE_DOT,
  heightDevice,
  home_img,
  widthDevice,
} from '../../assets/constans';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import Images from '../../common/Images/Images';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import DiseaseCard from './DiseaseCard';
import CustomeHeader from './CustomeHeader';
import {NAVIGATION_HEALTH_MANUAL} from '../../navigation/routes';
import {asyncStorage} from '../../store';
import HeaderList from './HeaderList';
const fakeData = [
  {
    id: 1,
    name: 'Huyết áp',
    status: 'Bình thường',
    created_at: '27/02/2024, 10:02',
    value: '120/80',
    subVal: '80',
  },
  {
    id: 2,
    name: 'Đường huyết',
    status: 'Bình thường',
    created_at: '27/02/2024, 10:02',
    value: '120',
    unit: 'mg/dL',
    subVal: '',
  },
  {
    id: 3,
    name: 'Mỡ máu',
    status: 'Cao bất thường',
    created_at: '27/02/2024, 10:02',
    value: '6.2',
    unit: '%',
  },
];

const Home = ({navigation}) => {
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    const user = await asyncStorage.getUser();
    console.log('STORAGE USER:::', user);
  };
  const handlePressCard = index => {
    navigation.navigate(NAVIGATION_HEALTH_MANUAL, {id: index + 1});
  };
  const renderCardItem = ({item, index}) => (
    <DiseaseCard
      name={item?.name}
      status={item?.status}
      created_at={item.created_at}
      value={item.value}
      unit={item.unit}
      subValue={item.subVal}
      index={index}
      onPressItem={() => handlePressCard(index)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomeHeader />
        <View style={styles.wrapperListCard}>
          <FlatList
            data={fakeData}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={i => i.name}
            renderItem={renderCardItem}
            ListHeaderComponent={<HeaderList onPressOption={() => {}} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
