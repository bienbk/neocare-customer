import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import styles from './styles';
import {TextSemiBold} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
const MAX_LENGTH = 3;
const MIN_LENGTH = 1;
const InputManual = ({
  setPinReady,
  code,
  setCode,
  isFocused,
  min,
  max,
  onWarning,
}) => {
  const codeDigitsArray = new Array(MAX_LENGTH).fill(0);
  const [inputContainerFocus, setInputContainerFocus] = useState(false);
  const toCodeDigitInput = (value, index) => {
    const emptyInputChar = '';
    const digit = code[index] || emptyInputChar;
    const isCurrentDigit = index <= code.length - 1;
    const isLastDigit = index === MAX_LENGTH - 1;
    const isCodeFull = code.length === MAX_LENGTH;
    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
    const styleOTPInput = inputContainerFocus && isDigitFocused ? true : false;
    return (
      <View
        key={index}
        style={[styles.otpInputView, code && {paddingHorizontal: 0}]}>
        {code ? (
          <TextSemiBold
            style={[styles.otpInputText, isFocused && styles.activeInputText]}>
            {digit}
          </TextSemiBold>
        ) : (
          <View
            style={[
              styles.placeholderInput,
              isFocused && {
                backgroundColor: Colors.primary,
                height: 3.5,
              },
            ]}
          />
        )}
      </View>
    );
  };
  const handleOnBlur = () => {
    setInputContainerFocus(false);
  };
  const textInputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      checkCodeValue();
    }, 1000);

    return () => setPinReady(false);
  }, [code]);
  const checkCodeValue = () => {
    if (parseInt(code, 10) < min || parseInt(code, 10) > max) {
      onWarning(true);
    } else {
      onWarning(false);
    }
    setPinReady(
      code.length === MAX_LENGTH &&
        parseInt(code, 10) >= min &&
        parseInt(code, 10) <= max,
    );
  };
  useEffect(() => {
    if (isFocused) {
      setInputContainerFocus(true);
      textInputRef?.current?.focus();
    }
  }, [isFocused]);
  return (
    <View style={styles.inputSection}>
      <View style={styles.inputContainerPressable}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </View>

      <TextInput
        value={code}
        onChangeText={setCode}
        maxLength={MAX_LENGTH}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        onBlur={handleOnBlur}
        // blurOnSubmit={false}
        style={styles.hiddenTextInput}
        // autoFocus={true}
      />
    </View>
  );
};

export default InputManual;
