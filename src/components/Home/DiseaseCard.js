import React from 'react';
import {
  TextMoneyBold,
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
} from '../../common/Text/TextFont';
import {TouchableOpacity, View} from 'react-native';
// import {MIDDLE_DOT,} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import styles from './styles';
// import Colors from '../../theme/Colors';

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
    <View style={styles.wrapperCardItem}>
      <View style={styles.wrapperContentCard}>
        <View style={styles.wrapperNameLine}>
          <TextSemiBold style={styles.diseaseNameText}>{name}</TextSemiBold>
          <TextNormal
            style={
              status === 'Bình thường'
                ? styles.statusText
                : styles.statusDangerText
            }>
            {status}
          </TextNormal>
        </View>
        <TextNormal style={styles.timeText}>{created_at}</TextNormal>
        {index === 1 && (
          <View style={styles.wrapperTypeTime}>
            <TextNormal style={styles.timeText}>Trạng thái:</TextNormal>
            <TextNormal style={styles.typeTimeText}>Trước ăn</TextNormal>
          </View>
        )}
      </View>
      <View style={styles.wrapperValue}>
        <View style={{flexDirection: 'row'}}>
          <TextMoneyBold style={styles.fontSize29}>{value}</TextMoneyBold>
          {subValue && (
            <View style={styles.wrapperSubvalue}>
              <Icons type={'Feather'} name={'heart'} size={25} color={'red'} />
              <TextMoneyBold style={styles.fontSize29}>
                {subValue}
              </TextMoneyBold>
            </View>
          )}
          {unit && <TextNormal style={styles.unitText}>{unit}</TextNormal>}
        </View>
        <TouchableOpacity onPress={onPressItem}>
          <TextNormal style={styles.navigationText}>Nhập thủ công</TextNormal>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiseaseCard;
