import React, {View} from 'react-native';
import styles from './styles';
import {
  TextSemiBold,
  TextSmallTwelve,
  TextNormal,
  TextSmallMedium,
} from 'common/Text/TextFont';
import Icons from 'common/Icons/Icons';
import Colors from 'theme/Colors';
import {useEffect, useState} from 'react';
import moment from 'moment';
const ActivedPackage = ({packageItem}) => {
  const [leftDays, setLeftDays] = useState('');
  const [expired, setExpired] = useState('');
  const convertDate = date => {
    const splited = date.split('-');
    return `${splited[2]}-${splited[1]}-${splited[0]}`;
  };
  useEffect(() => {
    if (packageItem && packageItem?.name.length > 0) {
      const type = parseInt(packageItem.name.match(/\d+/)[0], 10) < 36 ? 1 : 2;
      const numberTime = parseInt(packageItem.name.match(/\d+/)[0], 10);
      const tempExpired = moment(new Date(packageItem.purchased_date))
        .add(numberTime, type === 1 ? 'M' : 'days')
        .format('DD-MM-YYYY');
      setExpired(tempExpired);
      const start = moment(new Date(), 'DD-MM-YYYY');
      const end = moment(tempExpired, 'DD-MM-YYYY');
      const left = moment.duration(end.diff(start)).asDays();
      setLeftDays(Math.floor(left));
    }
  }, [packageItem]);
  return (
    <View style={[styles.wrapperActivePackage, styles.isActived]}>
      <View style={{paddingLeft: 20, marginLeft: 5}}>
        <TextSemiBold style={styles.activePackName}>
          {packageItem.name}
        </TextSemiBold>
        <TextNormal style={styles.padVertical2}>
          {'Ngày tham gia: '}
          <TextSmallMedium style={styles.textVal}>
            {convertDate(packageItem.purchased_date.substring(0, 10))}
          </TextSmallMedium>
        </TextNormal>
        <TextNormal style={styles.padVertical2}>
          {'Ngày hết hạn: '}
          <TextSmallMedium style={styles.textVal}>
            {expired || ''}
          </TextSmallMedium>
        </TextNormal>
        <TextNormal style={styles.padVertical2}>
          {'Thời hạn còn lại: '}
          <TextNormal style={styles.textVal}>
            {leftDays + ' ngày' || ''}
          </TextNormal>
        </TextNormal>
        <TextNormal style={styles.padVertical2}>
          {'Số lần tư vấn: '}
          <TextNormal style={styles.textVal}>{0}</TextNormal>
        </TextNormal>
      </View>
      <Icons
        type={'FontAwesome'}
        name={'check-square'}
        size={20}
        color={Colors.primary}
        style={{position: 'absolute', top: 17, left: 15}}
      />
    </View>
  );
};
export default ActivedPackage;
