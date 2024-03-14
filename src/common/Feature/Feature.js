import {widthDevice} from 'assets/constans';
import Icons from 'common/Icons/Icons';
import Images from 'common/Images/Images';
import {TextNormal} from 'common/Text/TextFont';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from 'theme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg from 'common/Svg/Svg';
import {useDispatch} from 'react-redux';
import {resetOrder, logout, resetCurrentLocation} from 'store/actions';
import {asyncStorage} from 'store/index';
const Feature = ({
  icon,
  name,
  navigation,
  link,
  onPress,
  user,
  index,
  showModalLogin,
  codeAffiliate,
}) => {
  const dispatch = useDispatch();
  const [isNotUser, setIsNotUser] = useState(false);
  useEffect(() => {
    checkAccessPermission();
  }, []);
  const checkAccessPermission = async () => {
    const theFirstLogin = await asyncStorage.getTheFirstLogin();
    if (theFirstLogin) {
      console.log('The first login::::::', theFirstLogin);
      setIsNotUser(true);
    }
  };
  const handleNavigation = async () => {
    if (isNotUser && name !== 'Đăng xuất') {
      showModalLogin();
      return;
    }
    if (name === 'Đăng xuất') {
      dispatch(resetCurrentLocation({isLogout: true}));
      dispatch(logout());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: link}],
        }),
      );
    } else if (codeAffiliate?.ref_phone && name === 'Mã giới thiệu') {
    } else if (name === 'Mã quà tặng') {
      // console.log('get to e voucher');
      onPress(1);
    } else if (name === 'Mã giới thiệu') {
      onPress(2);
    } else {
      navigation.navigate(link);
    }
  };
  return (
    <TouchableOpacity
      style={[styles.container, {marginBottom: (index + 1) % 3 === 0 ? 18 : 5}]}
      onPress={handleNavigation}>
      <View style={styles.content}>
        {/* <Images resizeMode={'contain'} source={icon} style={styles.image} /> */}
        {name === 'Đăng xuất' ? (
          <Svg
            name={icon}
            size={16}
            color={Colors.textGrayColor}
            // style={styles.iconLogout}
          />
        ) : (
          <Svg name={icon} size={16} color={Colors.textGrayColor} />
        )}
        {/* {name === 'Đăng xuất' && isNotUser ? (
          <TextNormal style={styles.textName}>Đăng nhập</TextNormal>
        ) : name === 'Mã giới thiệu' && codeAffiliate?.ref_phone ? (
          <TextNormal style={styles.textName}>
            {name}:{'  '}
            {codeAffiliate?.ref_phone}
          </TextNormal>
        ) : (
          <TextNormal style={styles.textName}>{name}</TextNormal>
        )} */}
        {name === 'Đăng xuất' ? (
          <TextNormal style={styles.textLogout}>Đăng xuất</TextNormal>
        ) : (
          <TextNormal style={styles.textName}>{name}</TextNormal>
        )}
        {name === 'Đăng xuất' ? null : (
          <Svg
            name={'icon_right_arrow'}
            size={16}
            color={Colors.textGrayColor}
            style={styles.iconRight}
          />
        )}
      </View>
      {codeAffiliate?.ref_phone && name === 'Mã giới thiệu' ? null : (
        <Icons type={'AntDesign'} name={'right'} size={16} />
      )}
    </TouchableOpacity>
  );
};

export default Feature;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    width: widthDevice - 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  image: {
    height: 25,
    width: 25,
  },
  iconRight: {
    // alignItems: 'right',
    // marginRight: 5,
    position: 'absolute',
    marginLeft: widthDevice - widthDevice / 4.5,
    // marginLeft: widthDevice - 80,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
    width: '100%',
  },
  textName: {
    // marginTop: 20,
    textAlign: 'center',
    marginLeft: 10,
  },
  textLogout: {
    // position: 'absolute',
    // marginLeft: widthDevice / 2 - 55,
    marginLeft: 10,
    color: '#EF0000',
  },
  iconLogout: {
    position: 'absolute',
    marginLeft: widthDevice / 2 - 75,
  },
});
