import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerChildren: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor: 'red',
  },
  headerModal: {
    // backgroundColor: '#255D54',
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContentConfirm: {
    justifyContent: 'center',
    paddingVertical: 20,
    alignItems: 'center',
  },
  wrapperActionWarning: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  textContents: {width: '80%', textAlign: 'center'},
  modalButtonCancel: {
    width: 150,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.blackColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalButtonOk: {
    width: 150,
    paddingVertical: 7,
    backgroundColor: Colors.blue.blue30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalButtonCancelText: {
    color: Colors.gray.gray10,
  },
  modalButtonOkText: {
    color: 'white',
  },
  wrapperButtonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 5,
  },
  containerModalWithChildren: {
    backgroundColor: 'whitesmoke',
    width: widthDevice - 24,
    borderRadius: 10,
  },
  containerModal: {
    backgroundColor: 'whitesmoke',
    width: widthDevice - 24,
    // height: heightDevice / 4,
    borderRadius: 20,
  },
});

export default styles;
