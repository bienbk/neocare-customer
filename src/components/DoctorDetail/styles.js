import {heightDevice, widthDevice} from 'assets/constans';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  imageDoctor: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  wrapperDoctorInfo: {
    paddingHorizontal: 10,
    // backgroundColor: 'green',
  },
  textDoctorName: {marginBottom: 5},
  textDoctorDepartment: {
    color: Colors.textGrayColor,
  },
  wrapperAddress: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  toggleIcon: {
    position: 'absolute',
    padding: 5,
    borderRadius: 15,
    // borderWidth: 1,
    // backgroundColor: 'red',
    bottom: 0,
    right: 0,
  },
  wrapperDescription: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.blue.blue95,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  wrapperDoctorContainer: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Colors.gray.gray95,
    borderRadius: 10,
  },
});

export default styles;
