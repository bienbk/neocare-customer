import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from '../Icons/Icons';
import {TextNormal, TextSemiBold} from '../Text/TextFont';
import {widthDevice} from '../../assets/constans';
import Colors from '../../theme/Colors';

const CustomButton = ({onPress, label, styledButton, isDisabled}) => {
  // const [value, setValue] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={styledButton ? styledButton : styles.buttonContinue}>
      <TextSemiBold style={styles.textContinueButton}>{label}</TextSemiBold>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContinue: {
    width: widthDevice - 40,
    paddingVertical: 13,
    borderRadius: 40,
    backgroundColor: Colors.buttonBackground,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  textContinueButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
