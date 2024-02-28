import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {heightDevice, home_image, widthDevice} from '../../assets/constans';
import Images from '../../common/Images/Images';
import Icons from '../../common/Icons/Icons';
import {TextMoneyBold, TextSemiBold} from '../../common/Text/TextFont';
import styles from './styles';

const CustomeHeader = () => {
  return (
    <View style={styles.wrapperHeader}>
      <Images source={home_image} style={styles.imageBackground} />
      <View style={styles.wrapperTitle}>
        <TouchableOpacity style={styles.wrapperBellIcon}>
          <Icons type={'Feather'} name={'bell'} size={28} color={'black'} />
        </TouchableOpacity>
        <TextSemiBold style={styles.greetingText}>Xin chào,</TextSemiBold>
        <TextMoneyBold style={styles.titleText}>
          {'Sức khoẻ bạn\n hôm nay thế nào?'}
        </TextMoneyBold>
      </View>
    </View>
  );
};

export default CustomeHeader;
