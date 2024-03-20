import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  heightDevice,
  home_image,
  user_example,
  widthDevice,
} from '../../assets/constans';
import Images from '../../common/Images/Images';
import Icons from '../../common/Icons/Icons';
import {TextSmallMedium, TextSemiBold} from '../../common/Text/TextFont';
import styles from './styles';

const CustomeHeader = () => {
  return (
    // <View style={styles.wrapperHeader}>
    //   <Images source={home_image} style={styles.imageBackground} />
    //   <View style={styles.wrapperTitle}>
    //     <TouchableOpacity style={styles.wrapperBellIcon}>
    //       <Icons type={'Feather'} name={'bell'} size={28} color={'black'} />
    //     </TouchableOpacity>
    //     <TextSemiBold style={styles.greetingText}>Xin chào,</TextSemiBold>
    //     <TextMoneyBold style={styles.titleText}>
    //       {'Sức khoẻ bạn\n hôm nay thế nào?'}
    //     </TextMoneyBold>
    //   </View>
    // </View>
    <View style={styles.wrapperFixedHeader}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Images source={user_example} style={styles.avatarIcon} />
        <View style={{paddingHorizontal: 10}}>
          <TextSemiBold>Xin chào Tran,</TextSemiBold>
          <TextSmallMedium>Sức khoẻ bạn hôm nay thế nào?</TextSmallMedium>
        </View>
      </View>
      <Icons type={'Feather'} name={'bell'} size={29} color={'black'} />
    </View>
  );
};

export default CustomeHeader;
