import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
    zIndex: 999,
  },
  warningText: {
    paddingVertical: 5,
    color: '#762E44',
    // fontStyle: 'italic',
    // backgroundColor: Colors.red.red95,
    // marginTop: 5,
    borderRadius: 10,
  },
  contentLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  wrapperContentCard: {
    padding: 20,
    // elevation: 3,
    // marginHorizontal: 10,
    backgroundColor: Colors.whiteColor,
    borderRadius: 20,
    width: widthDevice - 20,
  },
  wrapperPaymentLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    borderTopColor: Colors.gray.gray90,
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
});

export default styles;
