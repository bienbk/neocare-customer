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
  imageDoctor: {
    width: 75,
    height: 75,
    borderRadius: 4,
  },
  wrapperDoctorItem: {
    padding: 10,
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
  },
  wrapperProfileDoctor: {
    flexDirection: 'row',
    borderBottomColor: Colors.gray.gray80,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderStyle: 'solid',
  },
  wrapperLabel: {
    position: 'absolute',
    top: -10,
    right: -10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderTopRightRadius: 10,
    paddingVertical: 2,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.blue.blue40,
  },
  wrapperProfileContent: {paddingHorizontal: 10},
  textDoctorName: {marginBottom: 5},
  textDoctorDepartment: {marginBottom: 5, color: Colors.textGrayColor},
  wrapperAddressDoctor: {flexDirection: 'row', alignItems: 'center'},
  wrapperTimeSection: {paddingVertical: 10},
  wrapperTitleTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitleTime: {marginLeft: 5},
  wrapperTimeline: {
    backgroundColor: Colors.gray.gray95,
    width: '100%',
    height: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  wrapperTimeLeft: {
    backgroundColor: Colors.blue.blue50,
    width: `${(250 / 365) * 100}%`,
    height: 10,
    borderRadius: 20,
  },
});

export default styles;
