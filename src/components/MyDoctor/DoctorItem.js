import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextSemiBold, TextSmallTwelve} from '../../common/Text/TextFont';
import Images from '../../common/Images/Images';
import styles from './styles';
import {doctor_avatar} from '../../assets/constans';
import ProgressLine from '../../common/ProgressLine/ProgressLine';

const DoctorItem = ({item, selectItem}) => {
  const {package_items} = item || [];
  const findItem = i => {
    let result;
    if (
      item &&
      item?.purchased_packages &&
      item?.purchased_packages.length > 0
    ) {
      item.purchased_packages.map(order => {
        if (
          order.package_items[0] &&
          order.package_items[0]?.product_id === i?.product_id
        ) {
          result = {
            ...i,
            ...order,
          };
        }
      });
    }
    return result;
  };
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
              <ProgressLine
                isDetailDoctor={false}
                index={index}
                line={findItem(line)}
              />
            );
          })}
      {/* {item && item.isConnect && <ProgressLine isDetailDoctor={false} />} */}
    </TouchableOpacity>
  );
};

export default DoctorItem;
