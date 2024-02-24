/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
} from 'react-native';
import {
  TextMoneyBold,
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallMedium,
  TextSmallTwelve,
} from '../../common/Text/TextFont';
import styles from './styles';
import Images from '../../common/Images/Images';
import {doctor_detail, widthDevice} from '../../assets/constans';
import Colors from '../../theme/Colors';
import Icons from '../../common/Icons/Icons';
import {NAVIGATION_MY_DOCTOR} from '../../navigation/routes';
import MyModal from '../../common/MyModal/MyModal';
import strings from '../../localization/Localization';
import PackageItem from './PackageItem';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectorPakageOfDoctor,
  selectorStatusPackageDoctor,
} from '../../store/doctor/doctorSelector';
import {actionGetPackageDoctor} from '../../store/doctor/doctorAction';
import Status from '../../common/Status/Status';
// import {ScrollView} from 'react-native-gesture-handler';
const IMAGE_HEIGHT = (widthDevice * 5) / 6;
const DoctorDetail = ({navigation}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionHeight, setdescriptionHeight] = useState(0);
  const [removeModal, setRemoveModal] = useState(-1);
  const dispatch = useDispatch();
  const packagesDoctor = useSelector(state => selectorPakageOfDoctor(state));
  const statusPackagesDoctor = useSelector(state =>
    selectorStatusPackageDoctor(state),
  );

  useEffect(() => {
    dispatch(actionGetPackageDoctor());
  }, []);
  useEffect(() => {
    // if (statusPackagesDoctor === Status.SUCCESS && packagesDoctor) {
    // }
    console.log('statusPackagesDoctor:::', statusPackagesDoctor);
    console.log('packagesDoctor::::', packagesDoctor);
  }, [statusPackagesDoctor]);

  const renderPackageOfDoctor = ({item, index}) => {
    return <PackageItem item={item} index={index} navigation={navigation} />;
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
        <ImageBackground source={doctor_detail} style={styles.imageDoctor}>
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
              {'Nguyễn Hữu Nghĩa'}
            </TextSemiBold>
            <TextSmallTwelve style={{color: Colors.gray.gray50}}>
              {'Chuyên khoa ung bướu'}
            </TextSmallTwelve>
            <TextSmallTwelve style={styles.wrapperDepartmentLabel}>
              {'Viêm khớp'}
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
            <TextSmallMedium numberOfLines={showDescription ? -1 : 3}>
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
            data={[1, 2, 3, 4]}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={headerFlatlist}
            contentContainerStyle={{
              backgroundColor: 'white',
              marginBottom: 10,
              borderRadius: 10,
              marginTop:
                showDescription && descriptionHeight
                  ? descriptionHeight + 20
                  : descriptionHeight + 20,
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
