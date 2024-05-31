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
      <TextSemiBold style={{color: Colors.whiteColor}}>
        {'Chuyên gia tư vấn của tôi'}
      </TextSemiBold>
      {currentDoctor !== -1 ? (
        <TouchableOpacity onPress={onPress} style={styles.wrapperDoctorInfo}>
          <View style={styles.wrapperMainDoctor}>
            {doctor?.avarta && doctor?.avarta.length > 0 ? (
              <Images
                source={{uri: doctor?.avarta}}
                style={{height: 107, width: 107, borderRadius: 10}}
              />
            ) : (
              <Svg
                name={'avatar_default'}
                size={107}
                style={styles.imageDoctor}
              />
            )}
            <View style={styles.wrapperInfoText}>
              <TextNormal style={styles.doctorName}>
                {`BS.${doctor?.last_name} ${doctor?.first_name}`}
              </TextNormal>
              <TextSmallTwelve style={{paddingVertical: 4}}>
                {'Chuyên khoa tim mạch'}
              </TextSmallTwelve>
              <TextSmallTwelve>
                {'Mã giới thiệu: '}
                <TextSmallTwelve style={{fontWeight: 'bold'}}>
                  {doctor?.qr_code}
                </TextSmallTwelve>
              </TextSmallTwelve>
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
