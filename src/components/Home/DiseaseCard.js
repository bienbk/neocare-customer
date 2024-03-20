import React from 'react';
import {
  TextMoneyBold,
  TextNormal,
  TextSmallTwelve,
  TextSemiBold,
} from 'common/Text/TextFont';
import {TouchableOpacity, View} from 'react-native';
// import {MIDDLE_DOT,} from 'assets/constans';
import Icons from 'common/Icons/Icons';
import styles from './styles';
import Colors from '../../theme/Colors';
// import Colors from 'theme/Colors';

const DiseaseCard = ({
  name,
  status,
  unit,
  value,
  label,
  subValue,
  created_at,
  onPressItem,
  index,
}) => {
  return (
    <View style={styles.wrapperCardItem}>
      <View style={styles.wrapperContentCard}>
        <View style={styles.wrapperNameLine}>
          <TextSemiBold>{name}</TextSemiBold>
          <View
            style={
              status === 'Bình thường'
                ? styles.statusText
                : styles.statusDangerText
            }>
            <TextSmallTwelve style={{color: Colors.whiteColor}}>
              {status}
            </TextSmallTwelve>
          </View>
        </View>
        {index === 1 && (
          <View style={styles.wrapperTypeTime}>
            <TextNormal style={styles.timeText}>Trạng thái:</TextNormal>
            <TextNormal style={styles.typeTimeText}>Trước ăn</TextNormal>
          </View>
        )}
        <TextSmallTwelve style={styles.timeText}>{created_at}</TextSmallTwelve>
      </View>
      <View style={styles.wrapperValue}>
        <View style={{flexDirection: 'row'}}>
          <TextMoneyBold style={styles.fontSize24}>{value}</TextMoneyBold>
          {subValue && (
            <View style={styles.wrapperSubvalue}>
              <Icons
                type={'FontAwesome'}
                name={'heartbeat'}
                size={22}
                style={{paddingHorizontal: 3}}
                color={'red'}
              />
              <TextMoneyBold style={styles.fontSize24}>
                {subValue}
              </TextMoneyBold>
            </View>
          )}
          {unit && <TextNormal style={styles.unitText}>{unit}</TextNormal>}
        </View>
        <TouchableOpacity onPress={onPressItem}>
          <TextNormal style={styles.navigationText}>
            {label || 'Nhập thủ công'}
          </TextNormal>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiseaseCard;
