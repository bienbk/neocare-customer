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
import {asyncStorage} from 'store';
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
  NAVIGATION_DOCTOR_DETAIL,
  NAVIGATION_SHOW_MANAGER,
} from '../../navigation/routes';
import {
  TextNormal,
  TextSemiBold,
  TextSmallMedium,
} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import Images from '../../common/Images/Images';
import {doctor_avatar, user_example, widthDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
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
  const listDoctors = useSelector(state => listDoctorSelector(state));
  const [currentDoctor, setCurrentDoctor] = useState(-1);
  useEffect(() => {
    const valid = checkUser();
    if (valid) {
      getParameterData();
      dispatch(listDoctorAction());
    }
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
      <View style={styles.wrapperFixedHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Images source={user_example} style={styles.avatarIcon} />
          <View style={{paddingHorizontal: 10}}>
            <TextSemiBold>Xin chào Tran,</TextSemiBold>
            <TextSmallMedium>Sức khoẻ bạn hôm nay thế nào?</TextSmallMedium>
          </View>
        </View>
        <Icons type={'Feather'} name={'bell'} size={29} color={'black'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <CustomeHeader /> */}

        <View style={{marginHorizontal: 15, paddingTop: 10}}>
          <TextSemiBold>{'Chuyên gia tư vấn'}</TextSemiBold>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_DOCTOR_DETAIL, {
                currentDoctor: currentDoctor,
              })
            }
            style={{
              padding: 15,
              marginVertical: 10,
              backgroundColor: Colors.primary,
              borderRadius: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: Colors.whiteColor,
                borderBottomWidth: 1,
                borderStyle: 'solid',
                paddingBottom: 10,
              }}>
              <Images
                source={doctor_avatar}
                style={{height: 70, width: 70, borderRadius: 10}}
              />
              <View style={{paddingHorizontal: 10}}>
                <TextNormal
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    paddingVertical: 5,
                  }}>
                  {currentDoctor?.doctor?.last_name +
                    ' ' +
                    currentDoctor?.doctor?.first_name}
                </TextNormal>
                <TextSmallMedium>{'Chuyên khoa tim mạch'}</TextSmallMedium>
              </View>
            </View>
            <TextNormal style={{paddingTop: 10}}>
              Gói chăm sóc đặc biệt 6 tháng còn lại 250 ngày
            </TextNormal>
          </TouchableOpacity>
        </View>
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
