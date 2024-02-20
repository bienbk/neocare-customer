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
  wrapperTitle: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 15,
    // backgroundColor: 'red',
  },
  textInput: {
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 50,
    paddingHorizontal: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: Colors.textGrayColor,
  },
  wrapperSection: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  birthSection: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 5,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.textGrayColor,
  },
  btnContinue: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray.gray10,
    borderRadius: 40,
    width: widthDevice - 30,
  },
  wrapperButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.whiteColor,
  },
  modalView: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -heightDevice / 2.3,
    left: -widthDevice / 2 + 15,
    padding: 10,
    width: widthDevice - 30,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textTitleModal: {textAlign: 'center', fontSize: 24, fontWeight: 'bold'},
  wrapperContentModal: {flex: 1, backgroundColor: 'white'},
  wrapperItemGender: {
    width: widthDevice / 2 - 50,
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  wrapperContentGender: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  activeGenderMale: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'blue',
  },
  activeGenderFemale: {
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: 'red',
  },
  btnSelectGender: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 40,
    backgroundColor: Colors.gray.gray10,
    width: '50%',
  },
});

export default styles;
