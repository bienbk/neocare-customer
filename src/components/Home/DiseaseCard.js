import React from 'react';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {MIDDLE_DOT, widthDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import styles from './styles';
import Colors from '../../theme/Colors';

const DiseaseCard = ({
  name,
  status,
  unit,
  value,
  subValue,
  created_at,
  onPressItem,
  index,
}) => {
  return (
    <Pressable onPress={onPressItem} style={styles.wrapperCardItem}>
      <TextSemiBold style={styles.diseaseNameText}>{name}</TextSemiBold>
      <View style={styles.wrapperInfo}>
        <TextNormal
          style={
            status === 'Bình thường'
              ? styles.statusText
              : styles.statusDangerText
          }>
          {MIDDLE_DOT + ` ${status}`}
        </TextNormal>
        <Icons type={'Feather'} name={'clock'} color={'lightgray'} />
        <TextNormal style={styles.timeText}>{created_at}</TextNormal>
      </View>
      <View style={styles.wrapperValue}>
        <TextMoneyBold style={styles.fontSize29}>{value}</TextMoneyBold>
        {subValue && (
          <View style={styles.wrapperSubvalue}>
            <Icons type={'Feather'} name={'heart'} size={25} color={'red'} />
            <TextMoneyBold style={styles.fontSize29}>{subValue}</TextMoneyBold>
          </View>
        )}
        {unit && <TextNormal style={styles.unitText}>{unit}</TextNormal>}
      </View>
    </Pressable>
  );
};

export default DiseaseCard;
