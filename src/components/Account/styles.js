import {widthDevice, heightDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  buttonClose: {
    position: 'absolute',
    top: 6,
    right: 3,
    paddingRight: 5,
    paddingTop: 5,
  },
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  // flatlistContainer: {
  //   marginTop: -30,
  // },
  content: {
    // backgroundColor: 'red',
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // //
    // justifyContent: 'center',
  },
  content1: {
    height: heightDevice * 0.336,
    backgroundColor: '#05102A',
    // marginTop: -30,
  },
  content2: {
    marginTop: -30,
    backgroundColor: '#F4F4F4',
    height: 120,
  },
  content3: {
    marginTop: 40,
    backgroundColor: '#F4F4F4',
    // height: 180,
  },
  flatlistContainer: {
    marginTop: -30,
  },
  textVersion: {
    color: Colors.buttonTextColor,
    marginBottom: 5,
  },
  containerSelect: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    right: 15,
    paddingHorizontal: 10,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
  },
  iconLanguage: {
    height: 16,
    width: 16,
  },
  containerImage: {
    marginLeft: 5,
  },
  point: {
    backgroundColor: '#BCBCBC',
  },
  separator: {
    width: '100%',
    backgroundColor: '#BCBCBC',
  },
  containerModalVoucher: {
    // paddingTop: 20,
    backgroundColor: 'whitesmoke',
    width: widthDevice - 24,
    borderRadius: 18,
    // height: heightDevice / 3,
  },
  textVoucher: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  headerModal: {
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  bodyModal: {
    // height: heightDevice / 2.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textInput: {
    width: widthDevice - 90,
    height: 45,
    color: 'black',
    fontStyle: 'italic',
    backgroundColor: 'white',
    // borderColor: 'gray',
    // borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#255D54',
    borderRadius: 20,
    width: 120,
    height: 40,
    marginTop: 20,
    justifyContent: 'center',
    // width: 100,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
  textMessage: {
    textAlign: 'center',
    width: '80%',
    color: '#004D40',
    fontStyle: 'italic',
    marginTop: 5,
  },
  textMessageError: {
    textAlign: 'center',
    width: '80%',
    color: 'red',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default styles;
