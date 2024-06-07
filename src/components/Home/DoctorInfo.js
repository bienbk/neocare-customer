import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {TextNormal, TextSemiBold} from 'common/Text/TextFont';
import Images from 'common/Images/Images';
import {TextSmallTwelve} from 'common/Text/TextFont';
import Svg from 'common/Svg/Svg';
import Colors from 'theme/Colors';
// import {widthDevice} from 'assets/constans';
const DoctorInfo = ({currentDoctor = -1, onPress}) => {
  const {doctor} = currentDoctor;
  return (
    <View style={styles.doctorContainer}>
      <TextSemiBold style={{color: Colors.whiteColor, fontSize: 24}}>
        {'Chuyên gia tư vấn của tôi'}
      </TextSemiBold>
      {currentDoctor !== -1 ? (
        <TouchableOpacity onPress={onPress} style={styles.wrapperDoctorInfo}>
          <View style={styles.wrapperMainDoctor}>
            {doctor?.avarta && doctor?.avarta.length > 0 ? (
              <Images
                source={{uri: doctor?.avarta}}
                style={styles.imageDoctor}
              />
            ) : (
              <Svg name={'default_doctor'} size={93} />
            )}
            <View style={styles.wrapperInfoText}>
              <TextNormal numberOfLines={2} style={styles.doctorName}>
                {`BS.${doctor?.last_name} ${doctor?.first_name}`}
              </TextNormal>
              <TextNormal style={{paddingVertical: 4, fontSize: 16}}>
                {'Chuyên khoa tim mạch'}
              </TextNormal>
              <TextNormal style={{fontSize: 16}}>
                {'Mã giới thiệu: '}
                <TextSemiBold>{doctor?.qr_code || ''}</TextSemiBold>
              </TextNormal>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.containerAsking}>
          <Svg
            name={'home_doctor'}
            size={120}
            style={styles.imageDoctorAsking}
          />
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
