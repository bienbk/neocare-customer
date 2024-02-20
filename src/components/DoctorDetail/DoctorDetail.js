import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  TextMoneyBold,
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallMedium,
} from '../../common/Text/TextFont';
import styles from './styles';
import Images from '../../common/Images/Images';
import {doctor_detail, formatMoney, widthDevice} from '../../assets/constans';
import Colors from '../../theme/Colors';
import Icons from '../../common/Icons/Icons';
import {NAVIGATION_MY_DOCTOR} from '../../navigation/routes';

const DoctorDetail = ({navigation}) => {
  const [showDescription, setShowDescription] = useState(true);
  const [descriptionHeight, setdescriptionHeight] = useState(0);

  const renderPackageOfDoctor = ({item, index}) => {
    return (
      <View style={styles.wrapperCardPackage}>
        <View style={styles.decoration} />

        <TextSemiBold style={{padding: 5}}>
          {`Chăm sóc đặc biệt ${(index + 1) * 6} tháng`}
        </TextSemiBold>
        <FlatList
          data={[1, 3, 4]}
          renderItem={() => (
            <View style={{flexDirection: 'row', paddingVertical: 4}}>
              <Icons
                type={'Feather'}
                name={'check'}
                size={19}
                color={'black'}
                style={{paddingHorizontal: 5}}
              />
              <TextNormalSemiBold>
                Kiểm tra sức khoẻ dựa theo chỉ số hằng tuần
              </TextNormalSemiBold>
            </View>
          )}
        />
        <View style={styles.wrapperFooterCard}>
          <TextSemiBold style={{color: Colors.blue.blue20}}>
            {formatMoney((index + 1) * 2500000) + 'đ'}
          </TextSemiBold>
          <TouchableOpacity style={styles.buyPackageButton}>
            <TextSemiBold style={{color: Colors.whiteColor}}>
              Mua gói
            </TextSemiBold>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const positionY = useRef(new Animated.Value(0)).current;
  const IMAGE_HEIGHT = (widthDevice * 5) / 8;
  // const imageAnimation = {
  //   transform: [
  //     {
  //       translateY: positionY.interpolate({
  //         inputRange: [0, IMAGE_HEIGHT],
  //         outputRange: [0, IMAGE_HEIGHT / 4],
  //         extrapolate: 'clamp',
  //       }),
  //     },
  //     {
  //       scale: positionY.interpolate({
  //         inputRange: [0, IMAGE_HEIGHT],
  //         outputRange: [1, 0.5],
  //         extrapolate: 'clamp',
  //       }),
  //     },
  //   ],
  // };
  const opacityImage = {
    opacity: positionY.interpolate({
      inputRange: [0, IMAGE_HEIGHT / 2, IMAGE_HEIGHT],
      outputRange: [1, 0.3, 0],
      extrapolate: 'clamp',
    }),
  };
  // const opacityHeader = positionY.interpolate({
  //   inputRange: [IMAGE_HEIGHT - 20, IMAGE_HEIGHT - 10, IMAGE_HEIGHT],
  //   outputRange: [0, 0.8, 1],
  //   extrapolate: 'clamp',
  // });
  const layoutDescription = event => {
    const {height} = event.nativeEvent.layout;
    setdescriptionHeight(height);
  };
  const headerFlatlist = () => {
    return (
      <View style={{padding: 5}}>
        <TextMoneyBold>Gói sức khoẻ</TextMoneyBold>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      {/* ANIMATED SCROLL */}
      <View style={styles.container}>
        {/* HEADER ANIMATED */}
        {/* <Animated.View
          style={[styles.wrapperAnimationHeader, {opacity: opacityHeader}]}>
          <View style={styles.wrapperHeaderTitle}>
            <TextSemiBold>{'Nguyễn Hữu Nghĩa'}</TextSemiBold>
            <TextSmallMedium style={{color: Colors.blue.blue40}}>
              {'Chuyên khoa ung bướu'}
            </TextSmallMedium>
          </View>
        </Animated.View> */}

        {/* IMAGE ANIMATED */}
        <Animated.ScrollView
          style={styles.scrollContainer}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: positionY}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}>
          <Animated.View style={[styles.wrapperImageDoctor, opacityImage]}>
            <Images
              source={doctor_detail}
              style={[styles.imageDoctor]}
              resizeMode={'cover'}
            />
          </Animated.View>
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
          {/* DESCRIPTION SECTION */}
          <View style={{paddingHorizontal: 10}}>
            <View style={[styles.wrapeprCardInfo]}>
              <TouchableOpacity style={styles.phoneIcon}>
                <Icons type={'Feather'} name={'phone'} size={20} color={'white'} />
              </TouchableOpacity>
              <View style={styles.inforCard}>
                <TextSemiBold>{'Nguyễn Hữu Nghĩa'}</TextSemiBold>
                <TextNormal>{'Chuyên khoa ung bướu'}</TextNormal>
                <TouchableOpacity style={styles.wrapperDepartmentLabel}>
                  <TextSmallMedium style={{color: Colors.red.red40}}>
                    {'Viêm khớp'}
                  </TextSmallMedium>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDescription(prev => (prev = !prev))}
                  style={styles.toggleIcon}>
                  <Icons
                    type={'Feather'}
                    name={showDescription ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={'black'}
                  />
                </TouchableOpacity>
              </View>
              {showDescription && (
                <View
                  onLayout={layoutDescription}
                  style={[styles.wrapperDescription]}>
                  <TextSmallMedium>
                    BS CKI Lê Hoàng Bảo công tác tại bệnh viện Đại học Y dược
                    TP.HCM, có hơn 10 năm kinh nghiệm điều trị các bệnh lý nội
                    tiết, bao gồm đái tháo đường, tuyến giáp, tuyến thượng thận,
                    tuyến yên, chuyển hóa. Ngoài ra, BS Lê Hoàng Bảo còn là Hội
                    viên Hội Đái tháo đường và Nội tiết TP. HCM.
                  </TextSmallMedium>
                </View>
              )}
            </View>
            {/* OPTIONS & EXTRA SECTION */}
            <FlatList
              data={[1, 2, 3, 4]}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={headerFlatlist}
              contentContainerStyle={{
                marginBottom: 10,
                marginTop:
                  showDescription && descriptionHeight ? descriptionHeight : 0,
              }}
              renderItem={renderPackageOfDoctor}
              keyExtractor={(_, index) => index}
            />
          </View>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetail;
