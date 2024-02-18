import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from 'react-native';
// import CartHeaderButton from '~/common/CartHeaderButton/CartHeaderButton';
// import {Icon} from '~/common';
// import Colors from '../Colors/Colors';
import Icons from '../Icons/Icons';
import {TextNormal} from '../Text/TextFont';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Icons type="feather" name={'menu'} size={25} />
      </TouchableOpacity>
      {title && (
        <View style={styles.titleContainer}>
          <TextNormal style={styles.title}>{title}</TextNormal>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 6,
  },
  cartLayout: {
    width: 40,
    height: 30,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EB5757',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#FFFFFF',
  },

  titleContainer: {
    height: 58,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});
