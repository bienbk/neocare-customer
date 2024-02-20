// import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';
import {heightDevice, widthDevice} from '../../assets/constans';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 15,
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.backgroundColor,
  },
  buttonBack: {
    position: 'absolute',
    top: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    // backgroundColor: 'red',
  },
  wrapperTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    // backgroundColor: 'red',
    paddingVertical: 15,
  },
  weightButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: 'lightgray',
    width: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
  },
  wrapperWeightButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  wrapperHeightButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 5,
    alignItems: 'center',
  },
  activeWeightButton: {
    backgroundColor: Colors.blue.blue50,
  },
  activeTextWeight: {
    fontWeight: '700',
    color: 'white',
  },
  weightValueButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.blue.blue40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperWeightSection: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    paddingHorizontal: 15,
    // flexDirection: 'column',
    paddingVertical: 10,
  },
  wrapperHeightSection: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    paddingHorizontal: 15,
    // flexDirection: 'column',
  },
  wrapperSliderItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContinueButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  wrapperSliderHeight: {
    paddingHorizontal: 15,
    // backgroundColor: 'green',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wrapperCheckbox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginTop: 5,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  buttonContinue: {
    width: widthDevice - 40,
    paddingVertical: 12,
    borderRadius: 40,
    backgroundColor: Colors.gray.gray10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: 5,
  },
});

export default styles;
