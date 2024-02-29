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
import {FlatList} from 'react-native-gesture-handler';

const DoctorItem = ({item, selectItem}) => {
  const {package_items} = item?.purchased_package;
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
          {/* {item && !item.isConnect && (
            <TextSmallTwelve style={styles.textRequest}>
              {'Đã gửi yêu cầu mua gói'}
            </TextSmallTwelve>
          )} */}
          {item &&
            package_items &&
            package_items.length > 0 &&
            package_items
              .filter(i => i.product_status === 0)
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
        item.isConnect &&
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
