import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import {widthDevice} from '../../assets/constans';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  containerScrollView: {
    borderRadius: 12,
    marginTop: -60,
    // marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  wrapperListStore: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textTitleList: {paddingVertical: 10, marginTop: 5},
  wrapperList: {marginVertical: 5, paddingBottom: 20},
  textTitleHeader: {
    fontSize: 24,
    color: Colors.whiteColor,
    paddingLeft: 15,
    marginTop: 10,
  },
  wrapperProductItem: {
    marginRight: 5,
    backgroundColor: Colors.whiteColor,
    width: (150 / 390) * widthDevice,
    height: 200,
    borderRadius: 12,
  },
  productImage: {
    width: '100%',
    height: 109,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productName: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },
  backBtn: {
    marginLeft: 15,
    marginTop: 10,
  },
  wrapperStoreItem: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomWidth: 1.5,
    borderStyle: 'dashed',
    borderBottomColor: Colors.gray.gray90,
  },
  wrapperStoreInfo: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});
