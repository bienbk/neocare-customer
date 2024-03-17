import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextSemiBold} from '../../common/Text/TextFont';
import Svg from '../../common/Svg/Svg';
import styles from './styles';

const HeaderList = ({onPressOption}) => {
  return (
    <View style={styles.wrapperHeaderList}>
      <TextSemiBold>{'Chỉ số sức khoẻ'}</TextSemiBold>
      <TouchableOpacity
        onPress={onPressOption}
        style={styles.wrapperOptionIcon}>
        <Svg name={'icon_option'} size={20} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderList;
