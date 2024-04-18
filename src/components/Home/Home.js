import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
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
import {OneSignal} from 'react-native-onesignal';
import {asyncStorage} from 'store';
import {FlashList} from '@shopify/flash-list';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const listParameter = useSelector(state => listParameterSelector(state));
  const [listParams, setListParams] = useState([]);
  const statusListing = useSelector(state => statusListingParam(state));
  const listDoctors = useSelector(state => listDoctorSelector(state));
  const [currentDoctor, setCurrentDoctor] = useState(-1);
  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(
        listParameterAction({
          size: 100,
          page: 1,
        }),
      );
      dispatch(listDoctorAction());
    });
    return listener;
  }, [navigation]);
  useEffect(() => {
    if (listParameter && listParameter.length) {
      mapParameter();
    }
  }, [listParameter]);
  const mapParameter = () => {
    const tempMap = new Map(
      HOME_DATA.map(i => {
        return [i.code, i];
      }),
    );
    listParameter.map(p => {
      if (tempMap.has(p.name)) {
        const mapItem = tempMap.get(p.name);
        if (p.name === 'Blood Pressure') {
          mapItem.value = `${p.index_sys}/${p.index_dia}`;
          mapItem.subVal = p.index_pulse;
        } else if (p.name === 'Cholesterol') {
          mapItem.value = p.total;
        } else if (p.name === 'Blood Glucose') {
          mapItem.value = p.index;
          mapItem.eating_status = p.eating_status;
        } else {
          mapItem.value = p.index;
        }
        mapItem.created_at = p.date;
        mapItem.status = p.status;
        mapItem.unit = p.unit_name;
        tempMap.set(p.name, mapItem);
      }
    });
    setListParams(Array.from(tempMap.values()));
  };
  useEffect(() => {
    if (listDoctors && listDoctors.length) {
      setCurrentDoctor({...listDoctors[0]});
    }
  }, [listDoctors]);
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
      id={item.id}
      item={item}
      subValue={item.subVal}
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
    // navigation.navigate(NAVIGATION_CONNECTION, {type: 1});
  };

  const sendOneSignal = async () => {
    const tempUser = await asyncStorage.getUser();
    if (tempUser == null) {
      return;
    }
    OneSignal.login(tempUser?.id.toString());
    let dataOneSignal = {
      cid: tempUser?.id.toString(),
      name: tempUser?.first_name + ' ' + tempUser?.last_name,
    };
    OneSignal.User.addTags(dataOneSignal);
  };

  useEffect(() => {
    sendOneSignal();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DoctorInfo
          currentDoctor={currentDoctor ? currentDoctor : -1}
          onPress={handleSelectDoctor}
          packagePurchased={
            currentDoctor && currentDoctor?.package_items
              ? currentDoctor.package_items.filter(i => i.product_status === 1)
              : []
          }
        />
        <View style={styles.wrapperListCard}>
          <FlashList
            data={listParams.length > 0 ? listParams : HOME_DATA}
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
