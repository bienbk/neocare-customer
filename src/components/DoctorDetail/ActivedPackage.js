import React, {View} from 'react-native';
import styles from './styles';
import {TextNormal, TextSmallTwelve} from 'common/Text/TextFont';
import Icons from 'common/Icons/Icons';
import Colors from 'theme/Colors';
import {useEffect, useState} from 'react';
const ActivedPackage = ({packageItem, totalDay}) => {
  console.log('package item::', packageItem);
  const [leftDays, setLeftDays] = useState('');
  const convertDate = date => {
    const splited = date.split('-');
    return `${splited[2]}-${splited[1]}-${splited[0]}`;
  };
  useEffect(() => {
    if (packageItem && packageItem?.name.length > 0) {
      const numberTime = parseInt(packageItem.name.match(/\d+/)[0], 10);
      const totalDays = numberTime <= 12 ? numberTime * 30 : numberTime;
      const passedDay =
        (new Date().getTime() -
          (packageItem?.purchased_date.startsWith('0')
            ? new Date().getTime()
            : new Date(packageItem?.purchased_date).getTime())) /
        60000 /
        (24 * 60);
      setLeftDays(totalDays - parseInt(passedDay, 10));
    }
  }, [packageItem]);
  return (
    <View
      style={[
        styles.wrapperActivePackage,
        {padding: 10, marginVertical: 10, backgroundColor: '#FFF4D1'},
      ]}>
      {/* <View style={styles.decorationActived} /> */}
      <View style={{paddingHorizontal: 20, marginLeft: 5}}>
        <TextNormal style={{paddingTop: 5, fontWeight: 'bold', fontSize: 14}}>
          {packageItem.name}
        </TextNormal>
        <TextSmallTwelve style={{paddingVertical: 2}}>
          {'Ngày tham gia: '}
          <TextSmallTwelve style={{fontWeight: 'bold'}}>
            {convertDate(packageItem.purchased_date.substring(0, 10))}
          </TextSmallTwelve>
        </TextSmallTwelve>
        <TextSmallTwelve style={{paddingVertical: 2}}>
          {'Thời hạn còn lại: '}
          <TextSmallTwelve style={{fontWeight: 'bold'}}>
            {leftDays || ''}
          </TextSmallTwelve>
        </TextSmallTwelve>
        <TextSmallTwelve style={{paddingVertical: 2}}>
          {'Số lần tư vấn: '}
          <TextSmallTwelve style={{fontWeight: 'bold'}}>{0}</TextSmallTwelve>
        </TextSmallTwelve>
      </View>
      <Icons
        type={'FontAwesome'}
        name={'check-square'}
        size={20}
        color={Colors.primary}
        style={{position: 'absolute', top: 15, left: 10}}
      />
    </View>
  );
};
export default ActivedPackage;
