import React from 'react';
import {styles} from './styles';
import {View} from 'react-native';
import Svg from 'common/Svg/Svg';
import {TextNormal, TextNormalSemiBold} from 'common/Text/TextFont';
import Colors from 'theme/Colors';
const StoreList = () => {
  return (
    <View style={styles.wrapperStoreItem}>
      <Svg name={'icon_pharmacy'} size={60} />
      <View style={styles.wrapperStoreInfo}>
        <TextNormalSemiBold style={{fontWeight: 'bold', fontSize: 14}}>
          {'Bệnh viện Bạch Mai'}
        </TextNormalSemiBold>
        <TextNormal style={{paddingVertical: 3, color: Colors.gray.gray60}}>
          {'123 Điện Biên Phủ P. Đa Kao Q.1 TP.HCM'}
        </TextNormal>
        <TextNormal style={{color: Colors.blue.blue40, fontWeight: 'bold'}}>
          {'Xem bản đồ'}
        </TextNormal>
      </View>
    </View>
  );
};

export default StoreList;
