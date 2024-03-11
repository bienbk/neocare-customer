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
} from '../../common/Text/TextFont';
import styles from './styles';
import Colors from '../../theme/Colors';
import MyModal from '../../common/MyModal/MyModal';
import strings from '../../localization/Localization';
import PackageItem from './PackageItem';
import {useSelector} from 'react-redux';
import {followedDoctorSelector} from '../../store/doctor/doctorSelector';
import CustomImage from './CustomImage';
import CardInformation from './CardInformation';

const DoctorDetail = ({navigation, route}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [removeModal, setRemoveModal] = useState(-1);
  const [doctor, setDoctor] = useState();
  const [listPackage, setListPackage] = useState([]);
  const followedDoctor = useSelector(state => followedDoctorSelector(state));
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
  const headerFlatlist = () => {
    return (
      <View style={styles.wrapperHeaderFlatlis}>
        <TextSemiBold>{'Gói sức khoẻ'}</TextSemiBold>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <CustomImage
          navigation={navigation}
          onPressOption={() => setRemoveModal(1)}
        />
        {/* DESCRIPTION SECTION */}
        <View style={{paddingHorizontal: 15, flex: 1, marginTop: -50}}>
          <CardInformation
            onPressDescription={() =>
              setShowDescription(prev => (prev = !prev))
            }
            showDescription={showDescription}
            doctor={doctor}
          />
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
