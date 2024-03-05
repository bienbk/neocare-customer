import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextSemiBold, TextSmallTwelve} from '../../common/Text/TextFont';
import Images from '../../common/Images/Images';
import styles from './styles';
import {doctor_avatar} from '../../assets/constans';
import ProgressLine from '../../common/ProgressLine/ProgressLine';
const AVATAR_URL = 'https://i.pravatar.cc/?img=';
const DoctorItem = ({item, selectItem, index}) => {
  const {package_items} = item || [];
  return (
    <TouchableOpacity onPress={selectItem} style={[styles.wrapperDoctorItem]}>
      <View
        style={[
          styles.wrapperProfileDoctor,
          item.isActived && styles.wrapperActiveProfileDoctor,
        ]}>
        <Images
          resizeMode="contain"
          style={styles.imageDoctor}
          source={{uri: `${AVATAR_URL}${Math.round(Math.random() * 100)}`}}
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
                  <TextSmallTwelve key={index} style={styles.textRequest}>
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
          .map((line, ind) => {
            return (
              <ProgressLine
                key={index}
                isDetailDoctor={false}
                index={ind}
                line={line}
              />
            );
          })}
    </TouchableOpacity>
  );
};

export default DoctorItem;
