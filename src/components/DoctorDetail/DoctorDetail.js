import React, {useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {
  TextHighLightBold,
  TextMoneyBold,
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallMedium,
} from '../../common/Text/TextFont';
import styles from './styles';
import Titles from '../../common/Titles/Titles';
import Images from '../../common/Images/Images';
import {doctor_avatar} from '../../assets/constans';
import Colors from '../../theme/Colors';
import Icons from '../../common/Icons/Icons';
import {NAVIGATION_MY_DOCTOR} from '../../navigation/routes';

const DoctorDetail = ({navigation}) => {
  const [showDescription, setShowDescription] = useState(true);

  const renderPackageOfDoctor = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: Colors.blue.blue80,
          padding: 10,
          borderRadius: 20,
          marginTop: 5,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 20,
            backgroundColor: Colors.blue.blue70,
            borderRadius: 50,
            right: -40,
            height: 100,
            width: 100,
          }}
        />

        <TextSemiBold style={{padding: 5}}>
          {'Chăm sóc đặc biệt 6 tháng'}
        </TextSemiBold>
        <FlatList
          data={[1, 3, 4]}
          renderItem={() => (
            <View style={{flexDirection: 'row', paddingVertical: 3}}>
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
          ListFooterComponent={() => (
            <View
              style={{
                paddingVertical: 1,
                backgroundColor: 'lightgray',
                marginVertical: 5,
              }}
            />
          )}
        />
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextSemiBold style={{color: Colors.blue.blue20}}>
            2.500.000đ
          </TextSemiBold>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: Colors.blue.blue50,
              borderRadius: 20,
            }}>
            <TextSemiBold>Mua gói</TextSemiBold>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <Titles
        title={'Thông tin bác sĩ'}
        iconBack={true}
        onPressBack={() => navigation.navigate(NAVIGATION_MY_DOCTOR)}
      />
      <View style={styles.container}>
        <View style={styles.wrapperDoctorContainer}>
          <Images
            resizeMode="contain"
            style={styles.imageDoctor}
            source={doctor_avatar}
          />
          <View style={styles.wrapperDoctorInfo}>
            <TextSemiBold style={styles.textDoctorName}>
              Nguyễn Hữu Nghĩa
            </TextSemiBold>
            <TextNormal style={styles.textDoctorDepartment}>
              {'PGS.TS.BS - Chuyên khoa ung bướu'}
            </TextNormal>
            <View style={styles.wrapperAddress}>
              <Icons
                type={'Feather'}
                name={'phone-outgoing'}
                size={20}
                color={Colors.blue.blue30}
              />
              <TextNormal
                style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold'}}>
                0376525171
              </TextNormal>
            </View>
          </View>
          <TouchableOpacity
            style={styles.toggleIcon}
            onPress={() => setShowDescription(prev => (prev = !prev))}>
            <Icons
              type={'Feather'}
              name={showDescription ? 'chevron-up' : 'chevron-down'}
              size={25}
              color={Colors.blue.blue30}
            />
          </TouchableOpacity>
        </View>
        {showDescription && (
          <View style={styles.wrapperDescription}>
            <TextSmallMedium>
              TS.Bác Sĩ Nguyễn Hữu Nghĩa Nguyên Phó giám đốc Bệnh Viện Phòng
              Không Không Quân, Nguyên Giám đốc Viện y học phóng xạ và u bướu
              Quân đội. Bác sĩ Nguyễn
            </TextSmallMedium>
          </View>
        )}
        <View style={{flex: 1}}>
          <FlatList
            data={[1, 2]}
            showsVerticalScrollIndicator={false}
            renderItem={renderPackageOfDoctor}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetail;
