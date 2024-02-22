import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icons from '../Icons/Icons';
import {TextNormal} from '../Text/TextFont';
import Colors from '../../theme/Colors';
import {widthDevice} from '../../assets/constans';

const ProgressLine = ({isDetailDoctor}) => {
  return (
    <View style={styles.wrapperTimeSection}>
      {!isDetailDoctor && (
        <View style={styles.wrapperTitleTime}>
          <Icons
            type={'Feather'}
            name={'check-circle'}
            color={'green'}
            size={18}
          />
          <TextNormal style={styles.textTitleTime}>
            Gói chăm sóc sức khoẻ 6 tháng
          </TextNormal>
          <TextNormal style={{textAlign: 'right', flex: 1, fontWeight: 'bold'}}>
            150 ngày
          </TextNormal>
        </View>
      )}
      <View style={styles.wrapperTimeline}>
        <View
          style={
            isDetailDoctor ? styles.wrapperTimeLeft : styles.wrapperTimeLeftRed
          }
        />
      </View>
    </View>
  );
};

export default ProgressLine;
const styles = StyleSheet.create({
  wrapperTimeSection: {paddingVertical: 5},
  wrapperTitleTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperTimeline: {
    backgroundColor: Colors.gray.gray90,
    width: '100%',
    height: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  textTitleTime: {paddingHorizontal: 5},
  wrapperTimeLeftRed: {
    backgroundColor: Colors.blue.blue50,
    width: `${(250 / 365) * 100}%`,
    height: 10,
    borderRadius: 20,
  },
  wrapperTimeLeft: {
    backgroundColor: Colors.pink.pink60,
    width: `${(250 / 365) * 100}%`,
    height: 10,
    borderRadius: 20,
  },
});
