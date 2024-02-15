import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
  },
  wrapperTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperIconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  iconPlus: {marginLeft: 20},
  iconClock: {marginLeft: 10, marginRight: 5},
  textWeightHeight: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleWeightHeight: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  wrapperWeightHeight: {
    padding: 10,
    borderRadius: 20,
    width: '49%',
    backgroundColor: 'white',
  },
  containerListFooter: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wrapperSubValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textIndexDesease: {fontSize: 24, fontWeight: 'bold'},
  containerValueDesease: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heartIcon: {marginLeft: 10, marginRight: 5},
  wrapperContentData: {
    flexDirection: 'row',
    paddingVertical: 10,
    // backgroundColor: 'red',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  containerFlatlistItem: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    borderRadius: 20,
  },
});

export default styles;
