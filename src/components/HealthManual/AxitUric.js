import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Animated,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import styles from './styles';
import {
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallMedium,
} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import CustomButton from '../../common/CustomButton/CustomButton';
import {
  AXIT_URIC_MG,
  AXIT_URIC_MOL,
  heightDevice,
  widthDevice,
} from '../../assets/constans';
import CustomHeader from './CustomHeader';
import UnitSelector from '../../common/UnitSelector/UnitSelector';
const PLACEHOLDER =
  'Ghi chú trạng thái cảm giác của bạn khi đo huyết áp, chất luợng giấc ngủ, chế độ dinh duỡng, bài tập thể dục gần đây của bạn...';
const AxitUric = ({navigation}) => {
  const [axitUric, setAxitUric] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [conclusion, setConclusion] = useState(-1);
  const [messure, setMessure] = useState(1);
  const [showTextarea, setShowTextarea] = useState(false);
  const refCardHeight = React.useRef();
  const [note, setNote] = useState('');
  const cardTransition = new Animated.Value(0);
  const inputTransition = new Animated.Value(0);
  const textInputRef = useRef();
  Keyboard.addListener('keyboardDidHide', () => {
    setShowTextarea(false);
    setInputFocused(false);
  });
  Keyboard.addListener('keyboardDidShow', () => {
    if (showTextarea) {
      startAnimation(cardTransition, inputTransition);
    }
  });
  const startAnimation = (card, input) => {
    Animated.timing(card, {
      duration: 400,
      toValue: widthDevice,
      useNativeDriver: true,
    }).start();
    Animated.timing(input, {
      duration: 500,
      toValue: -refCardHeight.current - 20,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    if (warningMessage || !axitUric) {
      return;
    }
    Keyboard.dismiss();
    const checkList = messure === 1 ? AXIT_URIC_MG : AXIT_URIC_MOL;
    let result;

    checkList.map(item => {
      if (
        parseFloat(item?.min) <= parseFloat(axitUric) &&
        parseFloat(axitUric) <= parseFloat(item.max)
      ) {
        result = item;
        return;
      }
    });
    if (result) {
      setConclusion({content: result?.key, color: result?.color});
    }
  };
  const handleFocusInput = () => {
    textInputRef.current.focus();
    setAxitUric('');
    setInputFocused(true);
    setConclusion(-1);
  };
  const handleBlurInput = () => {
    Keyboard.dismiss();
    setInputFocused(false);
  };
  const handleResetConclusion = () => {
    textInputRef.current.focus();
    setAxitUric('');
    setConclusion(-1);
  };
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <CustomHeader
        conclusion={conclusion}
        title={'Axit Uric'}
        navigation={navigation}
        showTextarea={showTextarea}
      />
      <Animated.View
        onLayout={({nativeEvent}) => {
          refCardHeight.current = nativeEvent.layout.height;
        }}
        style={[
          styles.wrapperAxitUric,
          showTextarea && {
            transform: [{translateX: cardTransition}],
          },
        ]}>
        <TouchableOpacity
          onPress={handleResetConclusion}
          style={styles.editButton}>
          <Icons
            type={'FontAwesome5'}
            name={'pencil-alt'}
            size={20}
            color={'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperDateAxit}>
          <TextNormalSemiBold>
            {new Date().toLocaleString('en-GB')}
          </TextNormalSemiBold>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={[
              styles.inputAxitUric,
              inputFocused && styles.activeInputAxit,
            ]}>
            <View style={styles.inputContainerPressable}>
              <TextSemiBold style={styles.textAxitUric}>
                {axitUric || '- - -'}
              </TextSemiBold>
            </View>
            {conclusion !== -1 && !inputFocused && axitUric && (
              <TextNormalSemiBold style={styles.labelAxit}>
                {messure === 1 ? 'mg/dL' : 'Umol/L'}
              </TextNormalSemiBold>
            )}
            <TextInput
              onChangeText={setAxitUric}
              maxLength={3}
              keyboardType="number-pad"
              value={axitUric}
              returnKeyType="done"
              textContentType="oneTimeCode"
              ref={textInputRef}
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
              style={styles.inputCholesterol}
            />
          </TouchableOpacity>
          {conclusion === -1 && (
            <TextNormalSemiBold style={styles.textAxitLabel}>
              {messure === 1
                ? 'Axit uric đơn vị md/dL (0 ~ 13)'
                : 'Axit uric đơn vị Umol/L (200 ~ 700)'}
            </TextNormalSemiBold>
          )}
        </View>
        {conclusion && conclusion?.content && (
          <View style={[styles.wrapperConclusion]}>
            <View style={styles.line}>
              <Icons
                type={'Fontisto'}
                name={'blood-drop'}
                size={22}
                color={conclusion?.color}
              />
              <TextSemiBold
                style={[styles.conclusionText, {color: conclusion?.color}]}>
                {conclusion?.content}
              </TextSemiBold>
            </View>

            <TouchableOpacity>
              <Icons
                type={'AntDesign'}
                name={'questioncircleo'}
                size={20}
                color={'gray'}
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      {conclusion === -1 && (
        <UnitSelector
          firstOption={'mg/dL'}
          secondOption={'Umol/L'}
          onPressSelector={val => {
            if (conclusion !== -1) {
              return;
            }
            setAxitUric('');
            setMessure(val);
          }}
          isSelected={messure}
        />
      )}
      {conclusion && conclusion !== -1 && (
        <Animated.View
          style={[
            showTextarea && {
              height: heightDevice / 2,
              transform: [
                {
                  translateY: inputTransition,
                },
              ],
            },
          ]}>
          <TouchableOpacity style={styles.wrapperInputArea}>
            <Icons
              type={'Entypo'}
              name={'text'}
              size={18}
              style={styles.iconText}
              color={'gray'}
            />
            <TextInput
              placeholder={PLACEHOLDER}
              numberOfLines={5}
              multiline
              value={note}
              onChange={setNote}
              onSubmitEditing={Keyboard.dismiss}
              onFocus={() => setShowTextarea(true)}
              onBlur={() => setShowTextarea(false)}
              style={styles.inputArea}
              textAlignVertical={'top'}
              placeholderTextColor={'gray'}
            />
          </TouchableOpacity>
          {showTextarea && (
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setShowTextarea(false);
              }}
              style={styles.btnSaveNote}>
              <TextSemiBold style={{color: Colors.whiteColor}}>
                Lưu
              </TextSemiBold>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
      {!showTextarea && (
        <CustomButton
          styled={{
            marginBottom: 10,
            backgroundColor: !axitUric ? 'lightgray' : Colors.buttonBackground,
          }}
          onPress={() => handleSubmit()}
          isDisabled={!axitUric}
          label={
            conclusion !== -1 ? strings.common.save : strings.common.continue
          }
        />
      )}
    </Pressable>
  );
};
export default AxitUric;
