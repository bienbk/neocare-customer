import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, View, ScrollView} from 'react-native';
import styles from './styles';
import DiseaseCard from './DiseaseCard';
import CustomeHeader from './CustomeHeader';
import {NAVIGATION_HEALTH_MANUAL} from 'navigation/routes';
import {asyncStorage} from 'store';
import HeaderList from './HeaderList';
import {useDispatch, useSelector} from 'react-redux';
import {
  listParameterSelector,
  statusListingParam,
} from 'store/parameter/parameterSelector';
import {
  listParameterAction,
  resetListingParameter,
} from 'store/parameter/parameterAction';
import Status from 'common/Status/Status';
import {NAVIGATION_SHOW_MANAGER} from '../../navigation/routes';
const fakeData = [
  {
    id: 1,
    name: 'Huyết áp',
    status: 'Bình thường',
    created_at: '27/02/2024, 10:02',
    value: '120/80',
    subVal: '80',
    label: 'Thêm chỉ số đo',
  },
  {
    id: 4,
    name: 'HbA1c',
    status: 'Cao bất thường',
    created_at: '27/02/2024, 10:02',
    value: '6.2',
    unit: '%',
    label: 'Thêm kết quả',
  },
  {
    id: 2,
    name: 'Đường huyết',
    status: 'Bình thường',
    created_at: '27/02/2024, 10:02',
    value: '120',
    unit: 'mg/dL',
    subVal: '',
    label: 'Thêm chỉ số đo',
  },
  {
    id: 3,
    name: 'Mỡ máu',
    status: 'Cao bất thường',
    created_at: '27/02/2024, 10:02',
    value: '6.2',
    unit: '%',
    label: 'Thêm kết quả',
  },
  {
    id: 5,
    name: 'Axit Uric',
    status: 'Cao bất thường',
    created_at: '27/02/2024, 10:02',
    value: '6.2',
    unit: '%',
    label: 'Thêm kết quả',
  },
  {
    id: 6,
    name: 'Cân nặng',
    status: 'Bình thường',
    created_at: '27/02/2024, 10:02',
    value: '78',
    unit: 'kg',
    label: 'Thêm chỉ số đo',
  },
];

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const listParameter = useSelector(state => listParameterSelector(state));
  const statusListing = useSelector(state => statusListingParam(state));
  useEffect(() => {
    const valid = checkUser();
    if (valid) {
      getParameterData();
    }
  }, []);
  const getParameterData = () => {
    const query = {
      size: 100,
      page: 1,
      from_at: '2024-02-12T00:00:00Z',
      to_at: '2024-03-14T00:00:00Z',
    };
    dispatch(listParameterAction(query));
  };
  useEffect(() => {
    if (statusListing === Status.SUCCESS) {
      dispatch(resetListingParameter());
    }
  }, [statusListing]);
  const checkUser = async () => {
    const user = (await asyncStorage.getUser()) || -1;
    return user !== -1;
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
      label={item.label}
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
            ListHeaderComponent={
              <HeaderList
                onPressOption={() =>
                  navigation.navigate(NAVIGATION_SHOW_MANAGER)
                }
              />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
