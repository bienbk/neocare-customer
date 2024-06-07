import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icons from 'common/Icons/Icons';
import Colors from 'theme/Colors';
import {NAVIGATION_HOME} from 'navigation/routes';
import {widthDevice} from 'assets/constans';
import Svg from 'common/Svg/Svg';
import Images from 'common/Images/Images';

const CustomImage = ({navigation, onPressOption, doctor}) => {
  return (
    <View style={styles.imageDoctor}>
      {doctor?.avarta.length > 0 ? (
        <Images
          source={{uri: doctor?.avarta}}
          style={{height: (widthDevice * 5) / 6, width: '100%'}}
        />
      ) : (
        <Svg
          name={'cover_expert'}
          width={'100%'}
          height={(widthDevice * 5) / 6}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate(NAVIGATION_HOME)}
        style={styles.closeIcon}>
        <Icons
          type={'Feather'}
          name={'arrow-left'}
          size={18}
          color={Colors.gray.gray20}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressOption} style={styles.moreIcon}>
        <Icons
          type={'Feather'}
          name={'more-vertical'}
          size={18}
          color={Colors.gray.gray20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomImage;
