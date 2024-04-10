import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {TextNormal, TextSemiBold, TextSmallMedium} from 'common/Text/TextFont';
import Images from 'common/Images/Images';
import {home_add_doctor} from 'assets/constans';
import {TextSmallTwelve} from 'common/Text/TextFont';
import Svg from 'common/Svg/Svg';
const DoctorInfo = ({currentDoctor = -1, onPress, packagePurchased}) => {
  // console.log(packagePurchased);
  const leftDay =
    packagePurchased && packagePurchased.length
      ? (new Date().getTime() -
          new Date(packagePurchased[0]?.purchased_date).getTime()) /
        60000 /
        (24 * 60)
      : -1;
  const totalDay =
    packagePurchased && packagePurchased.length
      ? parseInt(packagePurchased[0]?.name.match(/\d+/)[0], 10) * 30
      : -1;
  return (
    <View style={styles.doctorContainer}>
      <TextSemiBold>{'Chuyên gia tư vấn của tôi'}</TextSemiBold>
      {currentDoctor !== -1 ? (
        <TouchableOpacity onPress={onPress} style={styles.wrapperDoctorInfo}>
          <View style={styles.wrapperMainDoctor}>
            <Svg name={'doctor_icon'} size={70} style={styles.imageDoctor} />
            <View style={styles.paddingH10}>
              <TextNormal style={styles.doctorName}>
                {currentDoctor?.doctor?.last_name
                  ? currentDoctor?.doctor?.last_name +
                    ' ' +
                    currentDoctor?.doctor?.first_name
                  : 'Nguyen Tran'}
              </TextNormal>
              <TextSmallMedium>{'Chuyên khoa tim mạch'}</TextSmallMedium>
            </View>
          </View>
          {packagePurchased && leftDay !== -1 && totalDay !== -1 && (
            <TextNormal style={{paddingTop: 10}}>
              {`${packagePurchased[0]?.name} còn lại ${
                totalDay - parseInt(leftDay, 10)
              } ngày`}
            </TextNormal>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.containerAsking}>
          <Images source={home_add_doctor} style={styles.imageDoctorAsking} />
          <View style={styles.wrapperTitleAsking}>
            <TextNormal style={styles.titleAsking}>
              Thêm chuyên gia để được hỗ trợ tư vấn mọi lúc mọi nơi.
            </TextNormal>
            <TouchableOpacity onPress={onPress} style={styles.buttonAsking}>
              <TextSmallTwelve style={styles.textBold}>
                Thêm ngay
              </TextSmallTwelve>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default DoctorInfo;
