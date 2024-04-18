/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import { Keyboard,Animated,TextInput,TouchableOpacity,View,Pressable,StyleSheet} from 'react-native';
import { TextNormal, TextNormalSemiBold, TextSemiBold, TextSmallMedium, TextSmallTwele} from 'common/Text/TextFont';
import Icons from 'common/Icons/Icons';
import Colors from 'theme/Colors';
import {heightDevice, widthDevice, convertDate} from 'assets/constans';
import strings from 'localization/Localization';
import CustomButton from 'common/CustomButton/CustomButton';
import CustomHeader from './CustomHeader';
const PLACEHOLDER =
  'Ghi chú trạng thái cảm giác của bạn khi đo, chất luợng giấc ngủ, chế độ dinh duỡng, bài tập thể dục gần đây của bạn...';
const ConclusionInput = ({navigation, conclusion, onSave, value, title, unit, type, withTime, date, resetConclusion}) => {
  const [showTextarea, setShowTextarea] = useState(false);
  const refCardHeight = React.useRef();
  const [note, setNote] = useState('');
  const [showDetailCholesterol, setShwoDetailCholesterol] = useState(false);
  const cardTransition = new Animated.Value(0);
  const inputTransition = new Animated.Value(0);
  const refNoteInput = useRef(-1);
  Keyboard.addListener('keyboardDidHide', () => {
    if (
      showTextarea &&
      refNoteInput.current &&
      refNoteInput.current.length > 0
    ) {
      setNote(refNoteInput.current);
    }
    setShowTextarea(false);
  });
  Keyboard.addListener('keyboardDidShow', () => {
    if (showTextarea) {
      Animated.timing(cardTransition, {
        duration: 400,
        toValue: widthDevice,
        useNativeDriver: true,
      }).start();
      Animated.timing(inputTransition, {
        duration: 500,
        toValue: -refCardHeight.current,
        useNativeDriver: true,
      }).start();
    }
  });
  const handleNoteInput = ({nativeEvent}) => {
    refNoteInput.current = nativeEvent.text;
  };
  useEffect(() => {
    if (
      !showTextarea &&
      refNoteInput.current &&
      refNoteInput.current.length > 0
    ) {
      setNote(refNoteInput.current);
    }
  }, [showTextarea]);
  const renderSub = type =>
    Object.values(conclusion)
      .filter(i =>
        type === 1 ? i && i?.name && i?.name !== 'TOTAL' : i && i?.review,
      )
      .map((item, index) => {
        if (type === 1) {
          return (
            <View style={styles.wrapperSubValItem}>
              <View style={styles.containerSubValItem}>
                <TextSemiBold style={{fontSize: 25}}>{item.value}</TextSemiBold>
                <TextSmallMedium style={{color: Colors.gray.gray50}}>
                  {item.name}
                </TextSmallMedium>
              </View>
              {index !== 2 && <View style={styles.separateLine} />}
            </View>
          );
        } else {
          item.name = item?.name ? item?.name : 'TOTAL';
          return (
            <View style={styles.wrapperCholesterolItem}>
              <View style={styles.wrapperSubItem}>
                <View style={styles.line}>
                  <Icons type={'Fontisto'} name={'blood-drop'}size={15}color={item?.color}/>
                  <TextNormal style={styles.textSubCholesterol}>
                    {item?.name + ': ' + item?.review}
                  </TextNormal>
                </View>
                <TouchableOpacity>
                  <Icons type={'AntDesign'} name={'questioncircleo'} size={20} color={'gray'}/>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      });
      // const transitionModal = new Animated.Value(heightDevice);
      // React.useEffect(() => {
      //   if (showWarning) {
      //     animatedAction(transitionModal);
      //   }
      // }, [showWarning]);
      // const animatedAction = val => {
      //   Animated.timing(val, {
      //     duration: 700,
      //     toValue: 0,
      //     useNativeDriver: true,
      //   }).start();
      // };
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <CustomHeader
        conclusion={conclusion}
        title={title}
        navigation={navigation}
        showTextarea={showTextarea}
      />

      <Animated.View
        onLayout={({nativeEvent}) => {
          refCardHeight.current = nativeEvent.layout.height;
        }}
        style={[
          styles.wrapperMainContent,
          showTextarea && {
            transform: [
              {
                translateX: cardTransition,
              },
            ],
          },
        ]}>
        <TouchableOpacity disabled style={styles.wrapperDateSelector}>
          <TextNormalSemiBold>
            {!withTime
              ? `${convertDate(date, true)}`
              : `${convertDate(date)} ${date
                  .toLocaleTimeString('vi-VN')
                  .substring(0, 5)}`}
          </TextNormalSemiBold>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetConclusion} style={styles.editButton}>
          <Icons
            type={'AntDesign'}
            name={'edit'}
            size={20}
            color={Colors.gray.gray40}
          />
        </TouchableOpacity>
        {title !== 'Mỡ máu' && (
          <View style={styles.wrapperSubContent}>
            <TextNormal style={{fontSize: 50, fontWeight: 'bold'}}>
              {parseFloat(value).toFixed(1)}
            </TextNormal>
            <TextNormal style={{fontSize: 17}}>{unit}</TextNormal>
            <View style={[styles.wrapperTimeMessure, type > 3 && {backgroundColor: Colors.gray.gray70}]}>
              <TextNormal
                style={styles.textTimeMessure}>
                {type === 1
                  ? 'Nhịn ăn'
                  : type === 2
                  ? 'Sau ăn'
                  : type === 3
                  ? 'Truớc ăn'
                  : type === 4
                  ? 'Xét nghiệm'
                  : 'Thủ công'}
              </TextNormal>
            </View>

          </View>
        )}
        {title === 'Mỡ máu' && (
          <View
            style={[styles.wrapperSubContent, {height: heightDevice / 5.5}]}>
            <TextNormal style={{fontSize: 50, fontWeight: 'bold'}}>
              {parseFloat(conclusion?.Total?.value).toFixed(1)}
            </TextNormal>
            <TextNormal style={{fontSize: 17}}>{conclusion?.unit}</TextNormal>
          </View>
        )}
        {title !== 'Mỡ máu' ? (
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
        ) : (
          <View>
            <View style={[styles.wrapperConclusion]}>{renderSub(1)}</View>
            <View style={styles.borderLine} />
            <View style={{paddingHorizontal: 15, paddingTop: 10}}>
              <TouchableOpacity
                onPress={() => setShwoDetailCholesterol(prev => (prev = !prev))}
                style={styles.wrapperDetailReview}>
                <View style={styles.line}>
                  <Icons
                    type={'Fontisto'}
                    name={'blood-drop'}
                    size={22}
                    color={conclusion?.Total.color}
                  />
                  <TextSemiBold
                    style={[
                      styles.conclusionText,
                      {color: conclusion?.Total?.color},
                    ]}>
                    {conclusion?.Total?.review}
                  </TextSemiBold>
                </View>
                <Icons
                  type={'Feather'}
                  name={showDetailCholesterol ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={'gray'}
                />
              </TouchableOpacity>
              {showDetailCholesterol && renderSub(2)}
            </View>
          </View>
        )}
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: showTextarea ? inputTransition : 0,
              },
            ],
          },
        ]}>
        <TouchableOpacity style={[styles.wrapperInputArea, showTextarea && styles.activeTextArea]}>
          <Icons
            type={'Entypo'}
            name={'text'}
            size={18}
            style={styles.iconText}
            color={showTextarea ? Colors.primary : 'gray'}
          />
          <TextInput
            placeholder={PLACEHOLDER}
            numberOfLines={5}
            multiline
            onFocus={() => setShowTextarea(true)}
            onBlur={() => setShowTextarea(false)}
            style={styles.inputArea}
            textAlignVertical={'top'}
            autoCapitalize={'sentences'}
            onSubmitEditing={Keyboard.dismiss}
            onChange={handleNoteInput}
            placeholderTextColor={'gray'}
          />
        </TouchableOpacity>
        {showTextarea && (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setShowTextarea(false);
              setNote(refNoteInput.current);
            }}
            style={styles.btnSaveNote}>
            <TextSemiBold style={{color: Colors.whiteColor}}>{'Hoàn thành'}</TextSemiBold>
          </TouchableOpacity>
        )}
      </Animated.View>
      {!showTextarea && (
        <CustomButton
          onPress={() => onSave(note)}
          styled={{marginBottom: title === 'Mỡ máu' ? 0 : 20}}
          label={strings.common.save}
        />
      )}
      {/* <MyModal visible={showWarning} onPressOutSide={() => {}}>
        <Animated.View
          style={[
            styles.modalView,
            {transform: [{translateY: transitionModal}]},
          ]}>
            <WarningContainer onSending={() => {}} title={`${title} của bạn cao`} onSkip={() => navigation.navigate(NAVIGATION_HOME)} />
        </Animated.View>
      </MyModal> */}
    </Pressable>
  );
};
export default ConclusionInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -heightDevice / 2.3,
    left: -widthDevice / 2 + 10,
    paddingVertical: 10,
    width: widthDevice - 20,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  activeTextArea: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'solid',
  },
  textSubCholesterol: {
    color: Colors.gray.gray50,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '600',
  },
  wrapperSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperCholesterolItem: {
    paddingVertical: 5,
    marginTop: 3,
    paddingLeft: 20,
  },
  borderLine: {
    height: 2,
    backgroundColor: Colors.gray.gray95,
    marginTop: 10,
  },
  wrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  wrapperDetailReview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  separateLine: {
    height: 30,
    width: 2,
    backgroundColor: 'lightgray',
  },
  containerSubValItem: {
    marginRight: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  wrapperSubValItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  editButton: {padding: 10, position: 'absolute', top: 5, right: 5},
  wrapperSubContent: {
    backgroundColor: 'white',
    height: heightDevice / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperClose: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: Colors.gray.gray10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTimeMessure: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.main,
    marginVertical: 10,
    borderRadius: 16,
  },
  textTimeMessure: {

    fontWeight: 'bold',
    color: 'white',
  },
  wrapperInputArea: {
    minHeight: 100,
    backgroundColor: Colors.whiteColor,
    borderRadius: 16,
    marginTop: 15,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  wrapperDateSelector: {
    padding: 5,
    marginTop: 5,
  },
  iconText: {position: 'absolute', top: 18, left: 15},
  inputArea: {
    marginLeft: 40,
    paddingRight: 10,
    color: Colors.gray.gray40,
  },
  btnSaveNote: {
    paddingVertical: 10,
    width: widthDevice / 2.5,
    backgroundColor: Colors.main,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  textTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.gray.gray10,
    fontSize: 20,
  },
  wrapperMainContent: {
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.whiteColor,
    borderRadius: 16,
  },
  conclusionText: {
    fontSize: 20,
    marginLeft: 10,
  },
  line: {flexDirection: 'row', alignItems: 'center'},
  wrapperConclusion: {
    paddingHorizontal: 15,
    paddingTop: 10,
    width: '100%',
    paddingBottom: 5,
    borderTopColor: Colors.gray.gray95,
    borderTopWidth: 1.5,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
