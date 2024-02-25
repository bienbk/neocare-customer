import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from '../Icons/Icons';
import {TextNormal, TextSemiBold} from '../Text/TextFont';
import {widthDevice} from '../../assets/constans';
import Colors from '../../theme/Colors';

const UnitSelector = ({
  firstOption,
  secondOption,
  onPressSelector,
  styledWrapper,
  styledOption,
  isSelected,
}) => {
  // const [value, setValue] = useState(false);
  return (
    <View style={styledWrapper ? styledWrapper : styles.typeMessureSelector}>
      <TouchableOpacity
        onPress={() => onPressSelector(1)}
        style={[
          styledOption ? styledOption : styles.messureButton,
          isSelected === 1 && {backgroundColor: Colors.blue.blue80},
        ]}>
        <TextSemiBold style={isSelected === 1 && {color: Colors.blue.blue30}}>
          {firstOption}
        </TextSemiBold>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressSelector(2)}
        style={[
          styledOption ? styledOption : styles.messureButton,
          isSelected === 2 && {backgroundColor: Colors.blue.blue80},
        ]}>
        <TextSemiBold style={isSelected === 2 && {color: Colors.blue.blue30}}>
          {secondOption}
        </TextSemiBold>
      </TouchableOpacity>
    </View>
  );
};

export default UnitSelector;

const styles = StyleSheet.create({
  typeMessureSelector: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    width: widthDevice / 1.5,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Colors.gray.gray95,
    borderRadius: 30,
  },
  messureButton: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '50%',
  },
});
