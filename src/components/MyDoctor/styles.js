import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
  },
  wrapperTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperIconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  iconPlus: {marginLeft: 20},
  iconClock: {marginLeft: 10, marginRight: 5},
  imageDoctor: {
    width: 75,
    height: 75,
    borderRadius: 4,
  },
});

export default styles;
