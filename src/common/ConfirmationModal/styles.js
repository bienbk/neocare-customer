import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerChildren: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    // backgroundColor: 'red',
  },
  headerModal: {
    // backgroundColor: '#255D54',
    borderRadius: 20,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContentConfirm: {
    justifyContent: 'center',
    paddingVertical: 15,

    alignItems: 'center',
  },
  wrapperActionWarning: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  textContents: {width: '80%', textAlign: 'center'},
  buttonCancel: {
    width: '90%',
    alignSelf: 'center',
    // paddingVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#2544BD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  buttonOk: {
    width: 120,
    height: 35,
    backgroundColor: Colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  modalButtonCancelText: {
    color: Colors.buttonBackground,
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtonOkText: {
    color: Colors.main,
    fontSize: 14,
    fontWeight: '600',
  },
  wrapperButtonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 5,
  },
  containerModalWithChildren: {
    backgroundColor: Colors.backgroundColor,
    width: widthDevice - 50,
    borderRadius: 10,
  },
  buttonConfirm: {
    width: '90%',
    alignSelf: 'center',
    // paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  buttonBack: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    height: 35,
    borderRadius: 24,
    width: 120,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2544BD',
  },
  containerModal: {
    backgroundColor: Colors.backgroundColor,
    width: widthDevice - 50,
    // height: heightDevice / 4,
    borderRadius: 20,
  },
});

export default styles;
