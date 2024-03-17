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
import Colors from '../../theme/Colors';

const CustomCheckbox = ({value, setValue}) => {
  // const [value, setValue] = useState(false);
  return (
    <TouchableOpacity
      onPress={setValue}
      style={[styles.container, value && styles.activeContainer]}>
      <View style={[styles.wrapper, value && {borderWidth: 0}]}>
        <Icons
          type={value ? 'FontAwesome' : 'MaterialIcons'}
          name={value ? 'check-circle-o' : 'radio-button-checked'}
          size={20}
          color={value ? 'green' : 'red'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray.gray80,
    width: 60,
    padding: 3,
    borderRadius: 20,
    alignItems: 'flex-start',
  },
  activeContainer: {
    backgroundColor: 'rgb(0,250,170)',
    width: 60,
    padding: 3,
    borderRadius: 20,
    alignItems: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: 28,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.gray.gray95,
    borderStyle: 'solid',
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
