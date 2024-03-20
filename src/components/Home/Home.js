import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import DiseaseCard from './DiseaseCard';
import CustomeHeader from './CustomeHeader';
import {NAVIGATION_HEALTH_MANUAL} from 'navigation/routes';
import HeaderList from './HeaderList';
import {useDispatch, useSelector} from 'react-redux';
import {
  listParameterSelector,
  statusListingParam,
  listDoctorSelector,
} from 'store/selectors';
import {
  listParameterAction,
  listDoctorAction,
  resetListingParameter,
} from 'store/actions';
import Status from 'common/Status/Status';
import {
  NAVIGATION_CONNECTION,
  NAVIGATION_DOCTOR_DETAIL,
  NAVIGATION_SHOW_MANAGER,
} from 'navigation/routes';
import DoctorInfo from './DoctorInfo';
import {HOME_DATA} from 'assets/constans';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const listParameter = useSelector(state => listParameterSelector(state));
  const statusListing = useSelector(state => statusListingParam(state));
  const listDoctors = useSelector(state => listDoctorSelector(state));
  const [currentDoctor, setCurrentDoctor] = useState(-1);
  useEffect(() => {
    getParameterData();
    dispatch(listDoctorAction());
  }, []);
  useEffect(() => {
    if (listDoctors && listDoctors.length) {
      setCurrentDoctor({...listDoctors[0]});
    }
  }, [listDoctors]);
  const getParameterData = () => {
    const query = {
      size: 100,
      page: 1,
      // from_at: '2024-02-12T00:00:00Z',
      // to_at: '2024-03-14T00:00:00Z',
    };
    dispatch(listParameterAction(query));
  };
  useEffect(() => {
    if (statusListing === Status.SUCCESS) {
      dispatch(resetListingParameter());
    }
  }, [statusListing]);

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
  const handleSelectDoctor = () => {
    if (currentDoctor !== -1) {
      navigation.navigate(NAVIGATION_DOCTOR_DETAIL, {
        currentDoctor: currentDoctor,
      });
    } else {
      navigation.navigate(NAVIGATION_CONNECTION, {type: 1});
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DoctorInfo
          currentDoctor={currentDoctor ? currentDoctor : -1}
          onPress={handleSelectDoctor}
        />
        <View style={styles.wrapperListCard}>
          <FlatList
            data={HOME_DATA}
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
