import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
    backgroundColor: Colors.backgroundColor,
  },
  hiddenTextInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  wrapperTypeMessure: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    width: '60%',
    alignItems: 'center',
    backgroundColor: Colors.gray.gray95,
    borderRadius: 30,
  },
  wrapperDataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    // backgroundColor: 'red',
    // marginVertical: 10,
  },
  textTimeMessure: {
    color: Colors.gray.gray50,
    textAlign: 'center',
    marginTop: 5,
  },
  inputCholesterol: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  wrapperInputCholesterol: {
    width: widthDevice * 0.38,
    borderRadius: 16,
    // paddingVertical: 2,
    height: 50,
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  wrapperRowItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  otpInputText: {
    fontSize: 40,
    color: Colors.gray.gray30,
    fontWeight: 'bold',
  },
  otpInputView: {
    justifyContent: 'center',
    paddingHorizontal: 2,
    height: 85,
  },
  invalidWrapper: {
    backgroundColor: Colors.pink.pink80,
  },
  inputContainerPressable: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  activeInputText: {
    color: Colors.blue.blue30,
  },
  inputSection: {
    alignItems: 'center',
    marginBottom: -30,
    flex: 1,
  },
  wrapperDateSelector: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  wrapperInputArea: {
    minHeight: 100,
    backgroundColor: Colors.whiteColor,
    borderRadius: 16,
    marginTop: 10,
    marginHorizontal: 15,
  },
  wrapperInputHeath: {
    width: widthDevice * 0.28,
    height: 100,
    paddingBottom: 10,
    borderRadius: 16,
    backgroundColor: '#EFEFEF',
  },
  iconText: {position: 'absolute', top: 18, left: 15},
  inputArea: {
    marginLeft: 40,
    paddingVertical: 15,
    flex: 1,
    color: Colors.gray.gray40,
  },
  btnSaveNote: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: Colors.blue.blue30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  textWarning: {
    color: '#ff2400',
    padding: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  containerBloodSugar: {
    paddingVertical: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  textCholesterol: {fontSize: 28, fontWeight: 'bold'},
  activeInputCholesterol: {
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  wrapperClose: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: Colors.gray.gray10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.gray.gray10,
    paddingVertical: 15,
    fontSize: 20,
  },
  textAxitUric: {
    fontSize: 55,
  },
  editButton: {padding: 10, position: 'absolute', top: 25, right: 10},
  wrapperMainContent: {
    marginHorizontal: 10,
    marginTop: 20,
    paddingVertical: 10,
    // backgroundColor: Colors.whiteColor,
    borderRadius: 16,
  },
  wrapperDateAxit: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    paddingVertical: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
  },
  inputAxitUric: {
    width: widthDevice * 0.4,
    borderRadius: 26,
    height: 130,
    marginVertical: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  activeInputAxit: {
    borderColor: Colors.gray.gray90,
    borderWidth: 1.5,
    borderStyle: 'solid',
    backgroundColor: 'whitesmoke',
  },
  labelAxit: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '600',
    backgroundColor: Colors.pinkColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: 20,
  },
  textAxitLabel: {
    alignSelf: 'center',
    color: Colors.gray.gray40,
    marginVertical: 10,
  },
  wrapperAxitUric: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: Colors.whiteColor,
    borderRadius: 30,
  },
  conclusionText: {
    fontSize: 20,
    marginLeft: 10,
  },
  line: {flexDirection: 'row'},
  wrapperConclusion: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    borderTopColor: Colors.gray.gray95,
    borderTopWidth: 1.5,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerInputHealth: {
    // padding: 10,
    marginTop: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  wrapperManualText: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    // backgroundColor: 'red',
  },
  manualText: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.gray.gray95,
    borderRadius: 20,
    color: Colors.gray.gray50,
    fontWeight: 'bold',
  },
  wrapperActiveInputHealth: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.blue.blue30,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  wrapperTitle: {paddingVertical: 10, flexDirection: 'row'},
  placeholderInput: {
    width: 14,
    paddingHorizontal: 2,
    backgroundColor: Colors.gray.gray40,
    height: 2.5,
  },
  textLabelInput: {textAlign: 'center', color: Colors.gray.gray40},
  textNoteSlider: {
    color: Colors.gray.gray40,
    textAlign: 'center',
    // width: '100%',
    paddingVertical: 10,
    marginTop: 10,
  },
  bloodSugarText: {
    fontSize: 45,
    paddingVertical: 25,
    color: Colors.gray.gray20,
  },
  wrapperDatePicker: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    borderRadius: 20,
  },
  textToday: {
    marginLeft: 5,
    color: Colors.gray.gray20,
  },
  wrapperTime: {
    paddingHorizontal: 25,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  wrapperTimerFlatlist: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default styles;
