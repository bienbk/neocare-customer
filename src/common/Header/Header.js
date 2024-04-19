import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from '../Icons/Icons';
import {TextNormal} from '../Text/TextFont';
import { widthDevice } from '../../assets/constans';

const Header = ({onBack, title}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapperIcon} onPress={onBack}>
        <Icons
          type={'Ionicons'}
          name={'arrow-back'}
          size={24}
          color={'black'}
        />
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
  wrapperIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 100,
  },
  container: {
    width: widthDevice,
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 6,
  },
  titleContainer: {
    height: 58,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});
