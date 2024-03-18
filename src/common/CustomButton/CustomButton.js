import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from '../Icons/Icons';
import {TextNormal, TextSemiBold} from '../Text/TextFont';
import {widthDevice} from '../../assets/constans';
import Colors from '../../theme/Colors';

const CustomButton = ({
  onPress,
  label,
  styledButton,
  isDisabled,
  styled,
  labelStyled,
}) => {
  // const [value, setValue] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={styledButton ? styledButton : [styles.buttonContinue, styled]}>
      <TextSemiBold style={[styles.textContinueButton, labelStyled]}>
        {label}
      </TextSemiBold>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContinue: {
    width: widthDevice - 40,
    paddingVertical: 13,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  textContinueButton: {
    color: Colors.main,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
