/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
} from 'common/Text/TextFont';
import styles from './styles';
import Colors from 'theme/Colors';
import MyModal from 'common/MyModal/MyModal';
import strings from 'localization/Localization';
import PackageItem from './PackageItem';
import {useDispatch, useSelector} from 'react-redux';
import {followedDoctorSelector} from 'store/selectors';
import CustomImage from './CustomImage';
import CardInformation from './CardInformation';
import {listDoctorAction, removeDoctorAction} from 'store/doctor/doctorAction';
import {statusRemoveDoctor} from 'store/doctor/doctorSelector';
import Status from 'common/Status/Status';
import {NAVIGATION_HOME} from 'navigation/routes';
import ActivedPackage from './ActivedPackage';

const DoctorDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [showDescription, setShowDescription] = useState(false);
  const [removeModal, setRemoveModal] = useState(-1);
  const [doctor, setDoctor] = useState();
  const [listPackage, setListPackage] = useState([]);
  const statusRemoveDoc = useSelector(state => statusRemoveDoctor(state));
  const followedDoctor = useSelector(state => followedDoctorSelector(state));
  useEffect(() => {
    const {currentDoctor} = route.params;
    if (currentDoctor || followedDoctor) {
      setListPackage(
        currentDoctor?.package_items
          ? currentDoctor?.package_items
          : followedDoctor.package_items,
      );
      setDoctor(currentDoctor ? currentDoctor?.doctor : followedDoctor?.doctor);
    }
  }, [navigation]);

  const renderPackageOfDoctor = ({item, index}) => {
    return (
      <PackageItem packageItem={item} index={index} navigation={navigation} />
    );
  };
  const renderActivePackage = ({item, index}) => {
    return <ActivedPackage packageItem={item} />;
  };
  const headerFlatlist = type => {
    return (
      <View style={styles.wrapperHeaderFlatlis}>
        <TextSemiBold>
          {type === 1 ? 'Gói đang sử dụng' : 'Gói dịch vụ đặc biệt'}
        </TextSemiBold>
      </View>
    );
  };
  useEffect(() => {
    if (statusRemoveDoc === Status.SUCCESS) {
      setRemoveModal(-1);
      dispatch(listDoctorAction());
      setTimeout(() => {
        navigation && navigation.navigate(NAVIGATION_HOME);
      }, 500);
    }
  }, [statusRemoveDoc]);
  const handleRemoveDoctor = () => {
    dispatch(
      removeDoctorAction({
        qr_code: doctor?.id,
      }),
    );
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <CustomImage
          navigation={navigation}
          doctor={doctor}
          onPressOption={() => setRemoveModal(1)}
        />
        {/* DESCRIPTION SECTION */}
        <View style={{flex: 1, marginTop: -50}}>
          <CardInformation
            onPressDescription={() =>
              setShowDescription(prev => (prev = !prev))
            }
            showDescription={showDescription}
            doctor={doctor}
          />
          <View
            style={{
              borderBottomColor: '#F4F4F4',
              borderBottomWidth: 5,
              borderStyle: 'solid',
            }}
          />
          {/* OPTIONS & EXTRA SECTION */}
          {listPackage.length > 0 && (
            <FlatList
              data={listPackage}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => headerFlatlist(2)}
              contentContainerStyle={{
                paddingBottom: 10,
              }}
              renderItem={renderPackageOfDoctor}
              keyExtractor={(_, index) => index}
            />
          )}
          {listPackage.filter(a => a.product_status === 1).length > 0 && (
            <FlatList
              data={listPackage.filter(a => a.product_status === 1)}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => headerFlatlist(1)}
              contentContainerStyle={{
                paddingBottom: 10,
              }}
              renderItem={renderActivePackage}
              keyExtractor={(_, index) => index}
            />
          )}
        </View>
      </ScrollView>
      <MyModal
        visible={removeModal > 0}
        onPressOutSide={() => setRemoveModal(-1)}>
        {removeModal === 1 && (
          <View style={styles.removeModal}>
            <TouchableOpacity
              onPress={() => setRemoveModal(2)}
              style={{paddingVertical: 10}}>
              <TextSemiBold style={{color: '#BA1A1A', textAlign: 'center'}}>
                Xoá bác sĩ
              </TextSemiBold>
            </TouchableOpacity>
          </View>
        )}
        {removeModal === 2 && (
          <View style={styles.confirmRemoveModal}>
            <TextNormalSemiBold
              style={{paddingBottom: 10, fontSize: 20, fontWeight: '600'}}>
              Xoá thông tin bác sĩ
            </TextNormalSemiBold>
            <TextNormal style={{textAlign: 'center', paddingVertical: 10}}>
              {`Bạn có chắc chắn muốn xoá thông tin Bác sĩ ${doctor?.first_name} khỏi
              danh sách đang theo dõi không?`}
            </TextNormal>
            <View style={styles.wrapperRemoveAction}>
              <TouchableOpacity
                onPress={() => setRemoveModal(-1)}
                style={styles.cancelRemoveButton}>
                <TextSemiBold style={{fontSize: 14, color: Colors.main}}>
                  {strings.common.cancel}
                </TextSemiBold>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRemoveDoctor()}
                style={styles.removeButton}>
                <TextSemiBold
                  style={{
                    color: Colors.main,
                    fontSize: 14,
                  }}>
                  {strings.common.delete}
                </TextSemiBold>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </MyModal>
    </SafeAreaView>
  );
};

export default DoctorDetail;
