import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {NAVIGATION_MY_DOCTOR} from '../../navigation/routes';
const AVATAR_URL = 'https://i.pravatar.cc/?img=';

const CustomImage = ({navigation, onPressOption}) => {
  return (
    <ImageBackground
      resizeMode={'cover'}
      source={{uri: `${AVATAR_URL}${Math.round(Math.random() * 20)}`}}
      style={styles.imageDoctor}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NAVIGATION_MY_DOCTOR)}
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
      <LinearGradient
        colors={['rgba(0,0,0,0.001)', '#FBF8FF']}
        style={{height: '40%', width: '100%'}}
      />
    </ImageBackground>
  );
};

export default CustomImage;
