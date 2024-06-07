import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextNormalSemiBold, TextSmallEleven} from 'common/Text/TextFont';
import ProgressCircle from 'react-native-progress-circle';
import Svg from 'common/Svg/Svg';
import Colors from 'theme/Colors';
import moment from 'moment';
const PackageOfDoctor = ({currentPackge}) => {
  const [percent, setPercent] = useState(0);
  const [leftDays, setLeftDays] = useState(0);
  React.useEffect(() => {
    if (currentPackge && currentPackge?.name.length > 0) {
      const type =
        parseInt(currentPackge.name.match(/\d+/)[0], 10) < 36 ? 1 : 2;
      const numberTime = parseInt(currentPackge.name.match(/\d+/)[0], 10);

      const tempExpired = moment(new Date(currentPackge.purchased_date))
        .add(numberTime, type === 1 ? 'M' : 'days')
        .format('DD-MM-YYYY');
      const start = moment(
        new Date(currentPackge.purchased_date),
        'DD-MM-YYYY',
      );

      const end = moment(tempExpired, 'DD-MM-YYYY');
      const now = moment(new Date(), 'DD-MM-YYYY');

      const total = moment.duration(end.diff(start)).asDays();
      const passed = moment.duration(now.diff(start)).asDays();
      const left = parseInt(total, 10) - parseInt(passed, 10);
      setLeftDays(left);
      setPercent((left / parseInt(total, 10)) * 100);
    }
  }, [currentPackge]);
  if (currentPackge && currentPackge?.name && currentPackge?.name.length > 0) {
    return (
      <View style={styles.containerPackageInfo}>
        <View style={styles.wrapperPackageName}>
          <Svg name={'icon_gift'} size={25} color={'black'} />
          <TextNormalSemiBold numberOfLines={3} style={styles.packageNameText}>
            {currentPackge.name}
          </TextNormalSemiBold>
        </View>
        <View style={styles.wrapperProgresCircle}>
          <ProgressCircle
            percent={percent}
            radius={25}
            borderWidth={3}
            color="black"
            shadowColor="#999"
            bgColor="#fff">
            <TextNormalSemiBold style={styles.leftDayText}>
              {leftDays}
              <TextSmallEleven style={styles.subtitleProgress}>
                {'\nngày'}
              </TextSmallEleven>
            </TextNormalSemiBold>
          </ProgressCircle>
          <ProgressCircle
            percent={1}
            radius={25}
            borderWidth={3}
            color="black"
            shadowColor="#999"
            bgColor="#fff">
            <TextNormalSemiBold style={styles.leftDayText}>
              {'0'}
              <TextSmallEleven style={styles.subtitleProgress}>
                {'\nlần'}
              </TextSmallEleven>
            </TextNormalSemiBold>
          </ProgressCircle>
        </View>
      </View>
    );
  }
};

export default PackageOfDoctor;

const styles = StyleSheet.create({
  containerPackageInfo: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 4,
    borderStyle: 'solid',
    borderColor: Colors.backgroundColor,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftDayText: {fontSize: 14, textAlign: 'center', fontWeight: 'bold'},
  subtitleProgress: {color: Colors.gray.gray50, fontSize: 10},
  wrapperPackageName: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
  },
  packageNameText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 10,
    // textAlign: 'center',
    // width: '80%',
  },
  wrapperProgresCircle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '32%',
  },
});
