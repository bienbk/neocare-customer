import React from 'react';
import styles from './styles';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {TextSemiBold} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';

const CholesterolInput = ({
  value,
  inputActive,
  index,
  name,
  setValue,
  handleBlurInput,
  setInputActive,
}) => {
  const textInputRef = React.useRef(null);
  const handleFocus = () => {
    textInputRef.current.focus();
    setInputActive(index);
  };
  return (
    <View style={styles.wrapperDataItem}>
      <TextSemiBold>{name.toUpperCase()}</TextSemiBold>
      <View style={styles.wrapperRowItem}>
        <TouchableOpacity
          style={[
            styles.wrapperInputCholesterol,
            inputActive === index && styles.activeInputCholesterol,
          ]}>
          <View style={styles.inputContainerPressable}>
            <TextSemiBold style={styles.textCholesterol}>
              {value || '-'}
            </TextSemiBold>
          </View>
          {index !== 4 && (
            <TextInput
              onChangeText={setValue}
              maxLength={5}
              keyboardType="number-pad"
              returnKeyType="done"
              ref={textInputRef}
              onFocus={handleFocus}
              onBlur={handleBlurInput}
              style={styles.inputCholesterol}
            />
          )}
        </TouchableOpacity>

        <Icons
          type={'AntDesign'}
          name={'questioncircleo'}
          size={20}
          color={'gray'}
        />
      </View>
    </View>
  );
};

export default CholesterolInput;
