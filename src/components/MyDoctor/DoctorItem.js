import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextSemiBold, TextSmallTwelve} from '../../common/Text/TextFont';
import Images from '../../common/Images/Images';
import styles from './styles';
import {doctor_avatar} from '../../assets/constans';
import ProgressLine from '../../common/ProgressLine/ProgressLine';

const DoctorItem = ({item, selectItem}) => {
  const {package_items} = item || [];
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
          {item &&
            package_items &&
            package_items.length > 0 &&
            package_items
              .filter(i => i.product_status === 2)
              .map((line, index) => {
                return (
                  <TextSmallTwelve style={styles.textRequest}>
                    {line.name}
                  </TextSmallTwelve>
                );
              })}
        </View>
      </View>
      {item &&
        package_items &&
        package_items.length > 0 &&
        package_items
          .filter(i => i.product_status === 1)
          .map((line, index) => {
            return (
              <ProgressLine isDetailDoctor={false} index={index} line={line} />
            );
          })}
      {/* {item && item.isConnect && <ProgressLine isDetailDoctor={false} />} */}
    </TouchableOpacity>
  );
};

export default DoctorItem;
