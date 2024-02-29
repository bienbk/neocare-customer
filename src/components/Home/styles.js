import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  fontSize29: {fontSize: 29},
  wrapperHeader: {
    height: heightDevice * 0.4,
    backgroundColor: '#2544BD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    width: widthDevice * (180 / 390),
    height: heightDevice * (190 / 800),
  },
  wrapperTitle: {
    paddingRight: 12,
    flex: 1,
    // backgroundColor: 'red',
    height: '80%',
  },
  wrapperBellIcon: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  greetingText: {textAlign: 'right', color: 'white'},
  titleText: {
    textAlign: 'right',
    fontSize: 22,
    color: 'white',
    fontWeight: '700',
    lineHeight: 33,
  },
  wrapperCardItem: {
    width: widthDevice - 30,
    alignSelf: 'center',
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 10,
  },
  wrapperOptionIcon: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#E1E9FF',
    alignSelf: 'center',
  },
  wrapperHeaderList: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diseaseNameText: {fontWeight: 'bold', fontSize: 20},
  wrapperContentCard: {
    paddingVertical: 10,
    borderBottomColor: Colors.gray.gray90,
    borderBottomWidth: 1,
  },
  wrapperNameLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '600',
    backgroundColor: '#07C558',
    textAlign: 'center',
  },
  statusDangerText: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '600',
    backgroundColor: '#FF5449',
    textAlign: 'center',
  },
  timeText: {color: '#898989'},
  wrapperValue: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  navigationText: {
    color: '#2544BD',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 12,
  },
  typeTimeText: {fontWeight: 'bold', paddingHorizontal: 5},
  wrapperTypeTime: {flexDirection: 'row', alignItems: 'center', paddingTop: 3},
  unitText: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginBottom: 3,
    marginLeft: 2,
  },
  wrapperSubvalue: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  wrapperListCard: {
    backgroundColor: Colors.backgroundColor,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    marginTop: -55,
  },
});

export default styles;
