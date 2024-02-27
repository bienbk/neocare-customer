import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import BloodPressure from './BloodPressure';
import BloodSugar from './BloodSugar';
import {TextNormalSemiBold, TextSemiBold} from '../../common/Text/TextFont';
import {NAVIGATION_HOME} from '../../navigation/routes';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import {widthDevice} from '../../assets/constans';
import strings from '../../localization/Localization';
import UnitSelector from '../../common/UnitSelector/UnitSelector';
import CustomButton from '../../common/CustomButton/CustomButton';

const items = [
  {id: 1, name: 'HDL-C'},
  {id: 2, name: 'LDL-C'},
  {id: 3, name: 'Triglycerides'},
];

const Cholesterol = ({navigation, route}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const refDate = useRef(null);
  const [date, setDate] = useState('');
  const [HDL, setHDL] = useState('-');
  const [LDL, setLDL] = useState('-');
  const [Triglycerides, setTriglycerides] = useState('-');
  const [inputActive, setInputActive] = useState(-1);
  const textInputRef = useRef(null);
  const [messure, setMessure] = useState(1);

  const handleInput = (val, index) => {
    if (index === 0) {
      setHDL(val);
    } else if (index === 1) {
      setLDL(val);
    } else {
      setTriglycerides(val);
    }
  };
  const onChangeDate = e => {
    const {timestamp} = e.nativeEvent;
    if (e.type === 'set') {
      const tempRef = {
        val: timestamp,
        isChanged: true,
      };
      refDate.current = tempRef;
      setDate(
        new Date(refDate.current.val)
          .toLocaleDateString('en-GB')
          .replaceAll('/', '-'),
      );
    }
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };
  const footerComponent = () => {
    return (
      <View style={{alignItems: 'center', paddingVertical: 20}}>
        <UnitSelector
          firstOption={'mg/dL'}
          secondOption={'mmol/L'}
          onPressSelector={val => setMessure(val)}
          isSelected={messure}
        />
      </View>
    );
  };
  const handleBlurInput = () => {
    console.log('textInputRef.current;:::', textInputRef.current);
    Keyboard.dismiss();
    setInputActive(-1);
  };
  const renderInputItem = ({item, index}) => {
    return (
      <View style={styles.wrapperDataItem}>
        <TextSemiBold>{item.name}</TextSemiBold>
        <View style={styles.wrapperRowItem}>
          <TouchableOpacity
            style={[
              styles.wrapperInputCholesterol,
              inputActive === index && {
                backgroundColor: Colors.blue.blue80,
              },
            ]}>
            <View style={styles.inputContainerPressable}>
              <TextSemiBold style={[styles.otpInputText]}>
                {index === 0 ? HDL : index === 1 ? LDL : Triglycerides}
              </TextSemiBold>
            </View>
            <TextInput
              onChangeText={e => handleInput(e, index)}
              maxLength={3}
              keyboardType="number-pad"
              returnKeyType="done"
              textContentType="oneTimeCode"
              ref={textInputRef}
              onFocus={() => setInputActive(index)}
              onBlur={handleBlurInput}
              style={styles.inputCholesterol}
            />
          </TouchableOpacity>

          <Icons
            type={'Feather'}
            name={'alert-circle'}
            size={25}
            color={'gray'}
          />
        </View>
      </View>
    );
  };
  return (
    <Pressable onPress={() => handleBlurInput()} style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NAVIGATION_HOME)}
        style={styles.wrapperClose}>
        <Icons type={'Feather'} name={'x'} size={20} color={'white'} />
      </TouchableOpacity>
      <TextSemiBold style={styles.textTitle}>{'Thông tin mỡ máu'}</TextSemiBold>
      <View style={{paddingBottom: 10, alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.wrapperDatePicker}>
          <Icons type={'Feather'} name={'calendar'} size={18} color={'black'} />
          <TextNormalSemiBold style={styles.textToday}>
            {date
              ? date
              : new Date().toLocaleDateString('en-GB').replaceAll('/', '-') +
                ', ' +
                new Date().getHours() +
                ':' +
                new Date().getMinutes()}
          </TextNormalSemiBold>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderInputItem}
        ListFooterComponent={footerComponent}
      />
      <CustomButton label={strings.common.complete} />
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode={'date'}
          display={Platform.OS === 'android' ? 'default' : 'spinner'}
          onChange={onChangeDate}
          textColor="black"
          // style={styles.datePicker}
        />
      )}
    </Pressable>
  );
};

export default Cholesterol;
