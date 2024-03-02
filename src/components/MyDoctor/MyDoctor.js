import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {TextSemiBold} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import DoctorItem from './DoctorItem';
import {
  NAVIGATION_CONNECTION,
  NAVIGATION_DOCTOR_DETAIL,
} from '../../navigation/routes';
import MyModal from '../../common/MyModal/MyModal';
import CustomeHeader from './CustomeHeader';
import EmptyList from './EmptyList';
import {useDispatch, useSelector} from 'react-redux';
import {
  listDoctorSelector,
  statusFollowDoctorSelector,
  statusListDoctorSelector,
} from '../../store/doctor/doctorSelector';
import {
  listDoctorAction,
  resetListDoctor,
} from '../../store/doctor/doctorAction';
import Status from '../../common/Status/Status';

const MyDoctor = ({navigation}) => {
  const [listDoctor, setListDoctor] = useState([]);
  const [openOption, setOpenOption] = useState(-1);
  const dispatch = useDispatch();
  const listDoctors = useSelector(state => listDoctorSelector(state));
  const statusFollowDoctor = useSelector(state =>
    statusFollowDoctorSelector(state),
  );
  const statusListDoctor = useSelector(state =>
    statusListDoctorSelector(state),
  );
  useEffect(() => {
    fetchDoctorData();
    console.log('come to my doctor');
  }, [statusFollowDoctor]);
  const fetchDoctorData = () => {
    const query = {
      patient_id: 7,
      qr_code: '',
      size: 100,
      page: 1,
    };
    dispatch(listDoctorAction(query));
  };
  useEffect(() => {
    if (
      statusListDoctor === Status.SUCCESS &&
      listDoctors &&
      listDoctors.length
    ) {
      dispatch(resetListDoctor());
      showListDoctor();
    }
  }, [statusListDoctor, listDoctors]);
  const showListDoctor = () => {
    const tempListDoctor = JSON.parse(JSON.stringify(listDoctors));
    tempListDoctor.map(doc => {
      doc.department = 'Chuyên khoa Tim';
      doc.name = `${doc?.doctor?.last_name} ${doc?.doctor?.first_name}`;
      const {package_items} = doc || [];
      if (
        package_items &&
        package_items.length &&
        package_items.findIndex(i => i.product_status === 1) !== -1
      ) {
        doc.isConnect = true;
      }
    });
    setListDoctor(tempListDoctor);
  };
  const renderDoctorItem = ({item, index}) => {
    return (
      <DoctorItem
        item={item}
        selectItem={() =>
          navigation.navigate(NAVIGATION_DOCTOR_DETAIL, {currentDoctor: item})
        }
      />
    );
  };
  const headerFollowingList = () => (
    <TextSemiBold style={{paddingBottom: 5}}>Bác sĩ đang theo dõi</TextSemiBold>
  );
  const headerActivedList = () =>
    listDoctor.filter(i => i.isConnect).length > 0 && (
      <TextSemiBold style={{paddingBottom: 5}}>Bác sĩ của tôi</TextSemiBold>
    );
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerSafeArea}>
        <CustomeHeader
          onPressOption={() => setOpenOption(1)}
          isShow={listDoctor.length > 0}
        />
        <View style={styles.container}>
          <View style={styles.wrapperMydoctor}>
            {listDoctor && listDoctor.length > 0 && (
              <FlatList
                scrollEnabled={false}
                data={
                  listDoctor && listDoctor.length > 0
                    ? listDoctor.filter(i => i.isConnect)
                    : []
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${index}_${item.id}_2`}
                renderItem={renderDoctorItem}
                contentContainerStyle={{
                  marginBottom:
                    listDoctor.filter(i => i.isConnect).length > 0 ? 15 : 0,
                }}
                ListHeaderComponent={headerActivedList}
              />
            )}
            {listDoctor && listDoctor.length > 0 && (
              <FlatList
                scrollEnabled={false}
                data={
                  listDoctor && listDoctor.length > 0
                    ? listDoctor.filter(i => !i.isConnect)
                    : []
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${index}_${item.id}_1`}
                renderItem={renderDoctorItem}
                ListHeaderComponent={headerFollowingList}
                contentContainerStyle={{paddingVertical: 0}}
              />
            )}
            {listDoctor.length === 0 && (
              <EmptyList
                onPressAdd={() =>
                  navigation.navigate(NAVIGATION_CONNECTION, {type: 1})
                }
              />
            )}
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
