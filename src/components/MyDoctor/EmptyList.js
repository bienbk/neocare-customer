import React from 'react';
import Images from '../../common/Images/Images';
import {View} from 'react-native';
import styles from './styles';
import {empty_logo} from '../../assets/constans';
import {TextNormalSemiBold} from '../../common/Text/TextFont';
import CustomButton from '../../common/CustomButton/CustomButton';

const EmptyList = ({onPressAdd}) => {
  return (
    <View style={styles.containerEmpty}>
      <Images
        resizeMode="contain"
        style={styles.imageEmpty}
        source={empty_logo}
      />
      <TextNormalSemiBold style={styles.emptyDoctorText}>
        Thêm thông tin bác sĩ có thể giúp bạn liên hệ với họ dễ dàng hơn
      </TextNormalSemiBold>
      <CustomButton
        onPress={onPressAdd}
        label={'Thêm bác sĩ'}
        styledButton={styles.addDoctorBtn}
      />
    </View>
  );
};

export default EmptyList;
