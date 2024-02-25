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
    paddingTop: 10,
    backgroundColor: Colors.backgroundColor,
  },
  buttonBack: {
    position: 'absolute',
    top: 16,
    left: 16,

    // backgroundColor: 'red',
  },
  wrapperTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  subtitleText: {textAlign: 'center', color: Colors.gray.gray50},
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
    backgroundColor: '#7189F7',
  },
  activeTextWeight: {
    fontWeight: '700',
    color: 'white',
  },
  weightValueButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#7189F7',
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
    fontSize: 17,
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
});

export default styles;
