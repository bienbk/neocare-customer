import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../common/Icons/Icons';
import {TextNormal, TextSemiBold} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import Images from '../../common/Images/Images';
import styles from './styles';
import {doctor_avatar} from '../../assets/constans';
import ProgressLine from '../../common/ProgressLine/ProgressLine';

const DoctorItem = ({item, selectItem}) => {
  return (
    <TouchableOpacity
      onPress={selectItem}
      style={[
        styles.wrapperDoctorItem,
        !item.isConnect && {elevation: 1, backgroundColor: Colors.blue.blue98},
      ]}>
      <View style={styles.wrapperProfileDoctor}>
        {item && item.isConnect && (
          <View style={styles.wrapperLabel}>
            <Icons
              type={'Feather'}
              name={'star'}
              size={15}
              color={Colors.whiteColor}
            />
            <TextNormal style={{color: Colors.whiteColor}}>
              {' 6 tháng'}
            </TextNormal>
          </View>
        )}
        <Images
          resizeMode="contain"
          style={styles.imageDoctor}
          source={doctor_avatar}
        />
        <View style={styles.wrapperProfileContent}>
          <TextSemiBold style={styles.textDoctorName}>{item.name}</TextSemiBold>
          <TextNormal style={styles.textDoctorDepartment}>
            {item.department}
          </TextNormal>
          {/* <View style={styles.wrapperAddressDoctor}>
            <Icons
              type={'Feather'}
              name={'map-pin'}
              size={20}
              color={Colors.blue.blue40}
            />
            <TextNormal style={{marginLeft: 5, color: Colors.textGrayColor}}>
              {item.address}
            </TextNormal>
          </View> */}
        </View>
      </View>
      {item && item.isConnect && <ProgressLine isDetailDoctor={false} />}
    </TouchableOpacity>
  );
};

export default DoctorItem;
