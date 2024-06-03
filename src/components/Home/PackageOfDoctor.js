import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextNormalSemiBold, TextSmallEleven} from '../../common/Text/TextFont';
import ProgressCircle from 'react-native-progress-circle';
import Svg from '../../common/Svg/Svg';
import Colors from '../../theme/Colors';
const PackageOfDoctor = ({currentPackge}) => {
  return (
    <View style={styles.containerPackageInfo}>
      <View style={styles.wrapperPackageName}>
        <Svg name={'icon_gift'} size={40} color={'black'} />
        <TextNormalSemiBold numberOfLines={3} style={styles.packageNameText}>
          {currentPackge.name}
        </TextNormalSemiBold>
      </View>
      <View style={styles.wrapperProgresCircle}>
        <ProgressCircle
          percent={10}
          radius={25}
          borderWidth={3}
          color="black"
          shadowColor="#999"
          bgColor="#fff">
          <TextNormalSemiBold style={styles.leftDayText}>
            {currentPackge.name.match(/\d+/)[0]}
            <TextSmallEleven style={styles.subtitleProgress}>
              {currentPackge.name.match(/\d+/)[0] <= 12 ? '\ntháng' : '\nngày'}
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
};

export default PackageOfDoctor;

const styles = StyleSheet.create({
  containerPackageInfo: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 4,
    borderStyle: 'solid',
    borderColor: Colors.backgroundColor,
    marginTop: 10,
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
    fontSize: 15,
    paddingHorizontal: 5,
    textAlign: 'center',
    width: '85%',
  },
  wrapperProgresCircle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '32%',
  },
});
