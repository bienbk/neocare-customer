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
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    width: widthDevice * (180 / 390),
    height: heightDevice * (190 / 800),
  },
  wrapperTitle: {
    paddingRight: 5,
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
    fontSize: 23,
    color: 'white',
    lineHeight: 33,
  },
  wrapperCardItem: {
    width: widthDevice - 30,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 10,
  },
  diseaseNameText: {fontWeight: 'bold'},
  wrapperInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: Colors.gray.gray90,
    borderBottomWidth: 1,
  },
  statusText: {color: '#07C558', paddingRight: 10},
  statusDangerText: {
    paddingRight: 10,
    color: '#BA1A1A',
  },
  timeText: {color: '#898989', paddingLeft: 4},
  wrapperValue: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  unitText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    backgroundColor: 'transparent',
    marginTop: -55,
  },
});

export default styles;
