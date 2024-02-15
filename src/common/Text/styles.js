import {Platform, StyleSheet} from 'react-native';
import Colors from 'theme/Colors';
const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  small11: {
    fontFamily: 'SVN-Poppins-Regular',
    fontSize: 11,
    color: Colors.black,
    fontWeight: '400',
  },
  small12: {
    fontFamily: 'SVN-Poppins-Regular',
    fontSize: 12,
    color: Colors.black,
    fontWeight: '400',
  },
  smallMedium12: {
    fontFamily: 'SVN-Poppins-Medium',
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
  },
  normal13: {
    fontFamily: 'SVN-Poppins-Regular',
    fontSize: 13,
    color: Colors.black,
    fontWeight: '400',
  },
  normalSemiBold13: {
    fontFamily: 'SVN-Poppins-SemiBold',
    fontSize: 13,
    color: Colors.black,
    fontWeight: '600',
  },
  highLightBold16: {
    fontFamily: 'SVN-Poppins-Bold',
    fontSize: 16,
    color: Colors.black,
    // fontWeight: '700',
  },
  semiBold16: {
    fontFamily: 'SVN-Poppins-SemiBold',
    fontSize: 17,
    color: Colors.black,
    fontWeight: '700',
    fontStyle: 'normal',
  },
  moneyBold20: {
    fontFamily: 'SVN-Poppins-Bold',
    fontSize: 20,
    color: Colors.black,
    fontWeight: isAndroid ? 'bold' : '700',
  },
});

export default styles;
