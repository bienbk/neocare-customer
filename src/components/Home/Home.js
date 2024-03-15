import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, View, ScrollView} from 'react-native';
import styles from './styles';
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
    id: 4,
    name: 'HbA1c',
    status: 'Cao bất thường',
    created_at: '27/02/2024, 10:02',
    value: '6.2',
    unit: '%',
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
  {
    id: 5,
    name: 'Axit Uric',
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
  const handlePressCard = item => {
    navigation.navigate(NAVIGATION_HEALTH_MANUAL, {id: item?.id});
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
      onPressItem={() => handlePressCard(item)}
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
