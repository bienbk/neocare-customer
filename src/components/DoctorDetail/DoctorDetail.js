/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
} from 'react-native';
import {
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallMedium,
  TextSmallTwelve,
} from '../../common/Text/TextFont';
import styles from './styles';
import {doctor_detail} from '../../assets/constans';
import Colors from '../../theme/Colors';
import Icons from '../../common/Icons/Icons';
import {NAVIGATION_MY_DOCTOR} from '../../navigation/routes';
import MyModal from '../../common/MyModal/MyModal';
import strings from '../../localization/Localization';
import PackageItem from './PackageItem';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Status from '../../common/Status/Status';
import {resetGetDoctorDetail} from '../../store/doctor/doctorAction';
import {followedDoctorSelector} from '../../store/doctor/doctorSelector';

const DoctorDetail = ({navigation, route}) => {
  const AVATAR_URL = 'https://i.pravatar.cc/?img=';
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionHeight, setdescriptionHeight] = useState(0);
  const [removeModal, setRemoveModal] = useState(-1);
  const [doctor, setDoctor] = useState();
  const [listPackage, setListPackage] = useState([]);
  const followedDoctor = useSelector(state => followedDoctorSelector(state));
  const dispatch = useDispatch();
  useEffect(() => {
    const {currentDoctor} = route.params;
    if (currentDoctor || followedDoctor) {
      setListPackage(
        currentDoctor?.package_items
          ? currentDoctor?.package_items
          : followedDoctor.package_items,
      );
      setDoctor(currentDoctor ? currentDoctor : followedDoctor);
    }
  }, [navigation]);

  const renderPackageOfDoctor = ({item, index}) => {
    return (
      <PackageItem packageItem={item} index={index} navigation={navigation} />
    );
  };
  const layoutDescription = event => {
    const {height} = event.nativeEvent.layout;
    setdescriptionHeight(height);
  };
  const headerFlatlist = () => {
    return (
      <View style={styles.wrapperHeaderFlatlis}>
        <TextSemiBold>Gói sức khoẻ</TextSemiBold>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode={'cover'}
          source={{uri: `${AVATAR_URL}${Math.round(Math.random() * 100)}`}}
          style={styles.imageDoctor}>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_MY_DOCTOR)}
            style={styles.closeIcon}>
            <Icons
              type={'Feather'}
              name={'arrow-left'}
              size={18}
              color={Colors.gray.gray20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRemoveModal(1)}
            style={styles.moreIcon}>
            <Icons
              type={'Feather'}
              name={'more-vertical'}
              size={18}
              color={Colors.gray.gray20}
            />
          </TouchableOpacity>
          <LinearGradient
            colors={['rgba(0,0,0,0.001)', '#FBF8FF']}
            style={{height: '40%', width: '100%'}}
          />
        </ImageBackground>

        <View style={[styles.wrapeprCardInfo]}>
          <TouchableOpacity style={styles.phoneIcon}>
            <Icons type={'Feather'} name={'phone'} size={18} color={'white'} />
          </TouchableOpacity>
          <View style={styles.inforCard}>
            <TextSemiBold style={{paddingVertical: 5, fontSize: 20}}>
              {doctor?.doctor.last_name + ' ' + doctor?.doctor.first_name}
            </TextSemiBold>
            <TextSmallTwelve style={{color: Colors.gray.gray50, marginLeft: 5}}>
              {doctor?.department || 'Chuyên khoa Tim'}
            </TextSmallTwelve>
            <TextSmallTwelve style={styles.wrapperDepartmentLabel}>
              {'Tim mạch'}
            </TextSmallTwelve>
            <TouchableOpacity
              onPress={() => setShowDescription(prev => (prev = !prev))}
              style={styles.toggleIcon}>
              <TextSmallMedium
                style={{
                  textDecorationLine: 'underline',
                  color: Colors.blue.blue20,
                  fontWeight: 'bold',
                }}>
                {showDescription ? 'Rút gọn' : 'Xem thêm'}
              </TextSmallMedium>
            </TouchableOpacity>
          </View>
          <View
            onLayout={layoutDescription}
            style={[
              styles.wrapperDescription,
              // !showDescription && {height: '50%'},
            ]}>
            <TextSmallMedium numberOfLines={showDescription ? 0 : 3}>
              BS CKI Lê Hoàng Bảo công tác tại bệnh viện Đại học Y dược TP.HCM,
              có hơn 10 năm kinh nghiệm điều trị các bệnh lý nội tiết, bao gồm
              đái tháo đường, tuyến giáp, tuyến thượng thận, tuyến yên, chuyển
              hóa. Ngoài ra, BS Lê Hoàng Bảo còn là Hội viên Hội Đái tháo đường
              và Nội tiết TP. HCM.BS CKI Lê Hoàng Bảo công tác tại bệnh viện Đại
              học Y dược TP.HCM, có hơn 10 năm kinh nghiệm điều trị các bệnh lý
              nội tiết, bao gồm đái tháo đường, tuyến giáp, tuyến thượng thận,
              tuyến yên, chuyển hóa. Ngoài ra, BS Lê Hoàng Bảo còn là Hội viên
              Hội Đái tháo đường và Nội tiết TP. HCM
            </TextSmallMedium>
          </View>
        </View>
        {/* DESCRIPTION SECTION */}
        <View style={{paddingHorizontal: 15, flex: 1}}>
          {/* OPTIONS & EXTRA SECTION */}
          <FlatList
            data={listPackage}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={headerFlatlist}
            contentContainerStyle={{
              backgroundColor: 'white',
              marginBottom: 10,
              borderRadius: 10,
              marginTop: descriptionHeight + 20,
            }}
            renderItem={renderPackageOfDoctor}
            keyExtractor={(_, index) => index}
          />
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
              Bạn có chắc chắn muốn xoá thông tin Bác sĩ Nguyễn Hữu Nghĩa khỏi
              danh sách đang theo dõi không?
            </TextNormal>
            <View style={styles.wrapperRemoveAction}>
              <TouchableOpacity
                onPress={() => setRemoveModal(-1)}
                style={styles.cancelRemoveButton}>
                <TextSemiBold style={{fontSize: 14, color: '#2544BD'}}>
                  {strings.common.cancel}
                </TextSemiBold>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRemoveModal(-1)}
                style={styles.removeButton}>
                <TextSemiBold
                  style={{
                    color: Colors.whiteColor,
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
