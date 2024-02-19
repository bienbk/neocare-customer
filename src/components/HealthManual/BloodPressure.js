import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {TextNormalSemiBold, TextSemiBold} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import InputManual from './InputManual';
import strings from '../../localization/Localization';
import {NAVIGATION_HOME} from '../../navigation/routes';

const BloodPressure = ({navigation}) => {
  const [firstInput, setFirstInput] = useState('');
  const [firstReady, setFirstReady] = useState(false);
  const [secondInput, setSecondInput] = useState('');
  const [secondReady, setSecondReady] = useState(false);
  const [thirdInput, setThirdInput] = useState('');
  const [thirdReady, setThirdReady] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const [activeInput, setActiveInput] = useState(0);

  useEffect(() => {
    if (firstReady && !secondReady && !thirdReady) {
      setActiveInput(2);
    } else if (firstReady && secondReady && !thirdReady) {
      setActiveInput(3);
    } else if (!firstReady && !secondReady && thirdReady) {
      setActiveInput(1);
    }
    if (firstReady && secondReady && thirdReady) {
      setActiveInput(0);
    }
  }, [firstReady, secondReady, thirdReady]);
  const handleActiveInput = type => {
    if (warningMessage) {
      return;
    }
    setActiveInput(type);
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapperTitle}>
        <TextSemiBold style={styles.textTitle}>
          {'Thông tin huyết áp'}
        </TextSemiBold>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_HOME)}
          style={styles.wrapperClose}>
          <Icons type={'Feather'} name={'x'} size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerInputHealth}>
        <TouchableOpacity
          onPress={() => handleActiveInput(1)}
          style={[
            styles.wrapperInputHeath,
            activeInput === 1 && styles.wrapperActiveInputHealth,
            warningMessage && styles.invalidWrapper,
          ]}>
          <InputManual
            code={firstInput}
            setCode={setFirstInput}
            setPinReady={setFirstReady}
            isFocused={{value: activeInput === 1, index: 1}}
          />
          <TextSemiBold
            style={[
              styles.textLabelInput,
              activeInput === 1 && {color: Colors.red.red60},
            ]}>
            {'Tầm thu'}
          </TextSemiBold>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActiveInput(2)}
          style={[
            styles.wrapperInputHeath,
            activeInput === 2 && styles.wrapperActiveInputHealth,
          ]}>
          <InputManual
            code={secondInput}
            setCode={setSecondInput}
            setPinReady={setSecondReady}
            isFocused={{value: activeInput === 2, index: 2}}
          />
          <TextSemiBold
            style={[
              styles.textLabelInput,
              activeInput === 2 && {color: Colors.red.red60},
            ]}>
            {'Tầm truơng'}
          </TextSemiBold>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActiveInput(3)}
          style={[
            styles.wrapperInputHeath,
            activeInput === 3 && styles.wrapperActiveInputHealth,
          ]}>
          <InputManual
            code={thirdInput}
            setCode={setThirdInput}
            setPinReady={setThirdReady}
            isFocused={{value: activeInput === 3, index: 3}}
          />
          <TextSemiBold
            style={[
              styles.textLabelInput,
              activeInput === 3 && {color: Colors.red.red60},
            ]}>
            {'Nhịp tim'}
          </TextSemiBold>
        </TouchableOpacity>
      </View>
      <Pressable
        onPress={Keyboard.dismiss}
        style={{padding: 10, alignItems: 'center', flex: 1}}>
        <TextNormalSemiBold style={{color: Colors.red.red50, padding: 5}}>
          {warningMessage || 'Warning text come here'}
        </TextNormalSemiBold>
        <TextNormalSemiBold>
          Nhịp tim theo nhịp/phút (45 - 250)
        </TextNormalSemiBold>
      </Pressable>
      <TouchableOpacity style={styles.completeButton}>
        <TextSemiBold style={{color: Colors.whiteColor}}>
          {strings.common.complete}
        </TextSemiBold>
      </TouchableOpacity>
    </View>
  );
};
export default BloodPressure;
