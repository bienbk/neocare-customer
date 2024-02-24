import React, {useState} from 'react';
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

const CustomCheckbox = ({value, setValue}) => {
  // const [value, setValue] = useState(false);
  return (
    <TouchableOpacity
      onPress={setValue}
      style={[styles.container, value && styles.activeContainer]}>
      <View style={[styles.wrapper]}>
        <Icons
          type={'Feather'}
          name={value ? 'check' : 'circle'}
          size={16}
          color={value ? 'green' : 'red'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D3D3C',
    zIndex: -999,
    width: 60,
    padding: 3,
    borderRadius: 20,
    alignItems: 'flex-start',
  },
  activeContainer: {
    backgroundColor: '#72FF50',
    zIndex: -100,
    width: 60,
    padding: 3,
    borderRadius: 20,
    alignItems: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: 28,
    elevation: 20,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
