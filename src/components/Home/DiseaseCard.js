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
import Colors from 'theme/Colors';
import {STATUS_COLORS, STATUS} from 'assets/constans';
// import Colors from 'theme/Colors';

const DiseaseCard = ({
  name,
  status,
  unit,
  value,
  label,
  subValue,
  id,
  item,
  created_at,
  onPressItem,
}) => {
  return (
    <View style={styles.wrapperCardItem}>
      <View style={styles.wrapperContentCard}>
        <View style={styles.wrapperNameLine}>
          <TextSemiBold>{name}</TextSemiBold>
          {id !== 6 && (
            <View
              style={[
                styles.statusText,
                {backgroundColor: STATUS_COLORS[status || 0]},
              ]}>
              <TextSmallTwelve style={{color: Colors.whiteColor}}>
                {STATUS[status || 0]}
              </TextSmallTwelve>
            </View>
          )}
        </View>
        {id === 2 && item?.eating_status && (
          <View style={styles.wrapperTypeTime}>
            <TextNormal style={styles.timeText}>Trạng thái:</TextNormal>
            <TextNormal style={styles.typeTimeText}>
              {item?.eating_status === 1
                ? 'Nhịn ăn'
                : item?.eating_status === 2
                ? 'Sau ăn'
                : 'Truớc ăn'}
            </TextNormal>
          </View>
        )}
        <TextSmallTwelve style={styles.timeText}>
          {new Date(created_at)
            .toLocaleDateString('en-GB')
            .replaceAll('/', '-') +
            ', ' +
            new Date(created_at).toLocaleTimeString('vi-VN').substring(0, 5)}
        </TextSmallTwelve>
      </View>
      <View style={styles.wrapperValue}>
        <View style={{flexDirection: 'row'}}>
          <TextMoneyBold
            style={[
              {
                color: parseInt(value, 10) > 0 ? 'black' : 'lightgray',
                fontSize: 20,
              },
            ]}>
            {value}
          </TextMoneyBold>
          {subValue && (
            <View style={styles.wrapperSubvalue}>
              <Icons
                type={'FontAwesome'}
                name={'heartbeat'}
                size={20}
                style={{paddingHorizontal: 3}}
                color={'red'}
              />
              <TextMoneyBold
                style={{
                  fontSize: 20,
                  color: parseInt(subValue, 10) > 0 ? 'black' : 'lightgray',
                }}>
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
