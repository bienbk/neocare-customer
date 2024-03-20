import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {TextNormal, TextSemiBold, TextSmallMedium} from 'common/Text/TextFont';
import Colors from 'theme/Colors';
import Images from 'common/Images/Images';
import {doctor_avatar} from 'assets/constans';
import {home_add_doctor} from '../../assets/constans';
import {TextSmallTwelve} from '../../common/Text/TextFont';
const DoctorInfo = ({currentDoctor = -1, onPress}) => {
  return (
    <View style={styles.doctorContainer}>
      <TextSemiBold>{'Chuyên gia tư vấn của tôi'}</TextSemiBold>
      {currentDoctor !== -1 ? (
        <TouchableOpacity onPress={onPress} style={styles.wrapperDoctorInfo}>
          <View style={styles.wrapperMainDoctor}>
            <Images source={doctor_avatar} style={styles.imageDoctor} />
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
          <TextNormal style={{paddingTop: 10}}>
            Gói chăm sóc đặc biệt 6 tháng còn lại 250 ngày
          </TextNormal>
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
