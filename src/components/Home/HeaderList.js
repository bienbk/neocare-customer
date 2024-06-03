import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextSemiBold} from 'common/Text/TextFont';
import Svg from 'common/Svg/Svg';
import styles from './styles';

const HeaderList = ({onPressOption}) => {
  return (
    <View style={styles.wrapperHeaderList}>
      <TextSemiBold>{'Sức khoẻ của tôi'}</TextSemiBold>
      <TouchableOpacity
        onPress={onPressOption}
        style={styles.wrapperOptionIcon}>
        <Svg name={'icon_option'} size={15} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderList;
