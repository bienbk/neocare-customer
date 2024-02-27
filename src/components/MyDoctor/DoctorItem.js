import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../common/Icons/Icons';
import {
  TextNormal,
  TextSemiBold,
  TextSmallTwelve,
} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import Images from '../../common/Images/Images';
import styles from './styles';
import {doctor_avatar} from '../../assets/constans';
import ProgressLine from '../../common/ProgressLine/ProgressLine';

const DoctorItem = ({item, selectItem}) => {
  return (
    <TouchableOpacity onPress={selectItem} style={[styles.wrapperDoctorItem]}>
      <View
        style={[
          styles.wrapperProfileDoctor,
          item.isConnect && styles.wrapperActiveProfileDoctor,
        ]}>
        <Images
          resizeMode="contain"
          style={styles.imageDoctor}
          source={doctor_avatar}
        />
        <View style={styles.wrapperProfileContent}>
          <TextSemiBold style={styles.textDoctorName}>{item.name}</TextSemiBold>
          <TextSmallTwelve style={styles.textDoctorDepartment}>
            {item.department}
          </TextSmallTwelve>
          {item && item.isConnect && (
            <TextSmallTwelve style={styles.textRequest}>
              {'Đã gửi yêu cầu mua gói'}
            </TextSmallTwelve>
          )}
        </View>
      </View>
      {item && item.isConnect && <ProgressLine isDetailDoctor={false} />}
      {/* {item && item.isConnect && <ProgressLine isDetailDoctor={false} />} */}
    </TouchableOpacity>
  );
};

export default DoctorItem;
