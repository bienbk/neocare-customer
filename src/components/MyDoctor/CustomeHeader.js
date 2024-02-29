import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {TextMoneyBold} from '../../common/Text/TextFont';
import LinearGradient from 'react-native-linear-gradient';
import {heightDevice, widthDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';

const CustomeHeader = ({onPressOption, isShow}) => {
  return (
    <LinearGradient
      colors={['#2643B3', '#546DE0']}
      // start={{x: 0, y: 1}}
      // end={{x: 1, y: 1}}
      style={{height: heightDevice * (117 / 844), width: widthDevice}}>
      <View style={styles.wrapperTitle}>
        <TextMoneyBold style={styles.titleText}>Bác sĩ</TextMoneyBold>
        {isShow && (
          <TouchableOpacity onPress={onPressOption}>
            <Icons
              type={'Feather'}
              name={'plus-circle'}
              size={25}
              style={styles.iconPlus}
              color={'white'}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default CustomeHeader;
