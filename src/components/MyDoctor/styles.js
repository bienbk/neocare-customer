import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  wrapperTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthDevice,
    paddingVertical: 10,
  },
  removeModal: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -heightDevice / 2 + 30,
    right: -widthDevice / 2 + 15,
    padding: 10,
    width: widthDevice / 2 + 50,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  wrapperIconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  iconPlus: {margin: 15},
  iconClock: {marginLeft: 10, marginRight: 5},
  imageDoctor: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  wrapperDoctorItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    marginVertical: 5,
    marginHorizontal: 1,
    // elevation: 1,
  },
  titleText: {
    fontSize: 24,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Colors.blue.blue98,
  },
  wrapperProfileDoctor: {
    flexDirection: 'row',
    paddingVertical: 5,
    // marginBottom: 5,
  },
  wrapperActiveProfileDoctor: {
    borderBottomColor: Colors.gray.gray95,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 10,
  },
  optionButton: {
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
  },
  wrapperProfileContent: {paddingHorizontal: 10},
  textDoctorName: {marginBottom: 5},
  textDoctorDepartment: {
    marginBottom: 5,
    color: Colors.red.red40,
    paddingVertical: 2,
    backgroundColor: Colors.red.red90,
    paddingHorizontal: 8,
    width: 120,
    textAlign: 'center',
    borderRadius: 8,
  },
  wrapperMydoctor: {
    backgroundColor: Colors.backgroundColor,
    marginTop: -30,
    width: widthDevice,
    paddingHorizontal: 15,
    paddingTop: 30,
    // minHeight: 50,
    borderRadius: 32,
    zIndex: 100,
    alignSelf: 'center',
  },
  // wrapperFollowingdoctor: {
  //   width: widthDevice,
  //   elevation: 0,
  //   paddingHorizontal: 15,
  //   paddingVertical: 15,
  //   borderTopLeftRadius: 32,
  //   borderTopRightRadius: 32,
  //   zIndex: 100,
  //   alignSelf: 'center',
  // },
  textRequest: {
    marginBottom: 5,
    color: '#002BA4',
    paddingVertical: 2,
    backgroundColor: '#DDE1FF',
    paddingHorizontal: 8,
    textAlign: 'center',
    borderRadius: 8,
  },
  containerEmpty: {
    // flex: 1,
    // height: '100%',
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    width: widthDevice * 0.65,
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
  },
  emptyDoctorText: {
    textAlign: 'center',
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  addDoctorBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 24,
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  imageEmpty: {
    width: 135,
    height: 135,
  },
  container: {flex: 1, backgroundColor: Colors.backgroundColor},
  // wrapperAddressDoctor: {flexDirection: 'row', alignItems: 'center'},
});

export default styles;
