import {React, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  TextInput,
  Pressable,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import MyModal from '../../common/MyModal/MyModal';
import {heightDevice, widthDevice} from '../../assets/constans';

import Svg from '../../common/Svg/Svg';

import CustomButton from '../../common/CustomButton/CustomButton';

const BaseProfile = ({next}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  // const [address, setAddress] = useState('');
  const [gender, setGender] = useState('Nam');
  const [modal, setModal] = useState(-1);
  const [timeValue, setTimeValue] = useState(new Date());
  const refBirthday = useRef({isChanged: false, val: -1});
  function formatBirthday(birthdayInput) {
    const bdArr = birthdayInput.split('-');
    return `${bdArr[2]}-${bdArr[1]}-${bdArr[0]}T00:00:00Z`;
  }
  const handleSubmitInfo = async () => {
    if (!firstname || !lastname) {
      return;
    }
    const payload = {
      first_name: firstname,
      last_name: lastname,
      gender: gender === 'Nam' ? 1 : 0,
      info_submitted: 1,
      birthday: formatBirthday(birthday),
    };
    next(payload);
  };
  const onChangeDate = (e, v) => {
    setTimeValue(v);
    const {timestamp} = e.nativeEvent;
    if (e.type === 'set') {
      const tempRef = {
        val: timestamp,
        isChanged: true,
      };
      refBirthday.current = tempRef;
      setBirthday(
        new Date(refBirthday.current.val)
          .toLocaleDateString('en-GB')
          .replaceAll('/', '-'),
      );
    }
    if (Platform.OS === 'android') {
      setModal(-1);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <Pressable style={styles.safeView} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.wrapperTitle}>
            <TextMoneyBold style={{fontSize: 24}}>
              {'Thông tin cơ bản'}
            </TextMoneyBold>
          </View>
          <View style={styles.wrapperSection}>
            <TextNormal style={{fontSize: 15}}>Họ:</TextNormal>
            <TextInput
              style={styles.textInput}
              placeholder={'Nhập họ và tên của bạn'}
              returnKeyType={'done'}
              placeholderTextColor={Colors.textGrayColor}
              onSubmitEditing={Keyboard.dismiss}
              value={firstname}
              onChangeText={setFirstname}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.wrapperSection}>
            <TextNormal style={{fontSize: 15}}>Tên:</TextNormal>
            <TextInput
              style={styles.textInput}
              placeholder={'Nhập tên của bạn'}
              returnKeyType={'done'}
              placeholderTextColor={Colors.textGrayColor}
              onSubmitEditing={Keyboard.dismiss}
              value={lastname}
              onChangeText={setLastname}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.wrapperSection}>
            <TextNormal>Ngày sinh:</TextNormal>
            <TouchableOpacity
              style={styles.birthSection}
              onPress={() => setModal(1)}>
              <TextNormal
                style={{
                  paddingLeft: 10,
                  color: !birthday ? Colors.textGrayColor : 'black',
                }}>
                {!birthday ? 'Nhập ngày sinh của bạn' : birthday}
              </TextNormal>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSection}>
            <TextNormal>Giới tính:</TextNormal>
            <TouchableOpacity
              style={styles.birthSection}
              onPress={() => setModal(2)}>
              <TextNormal
                style={{
                  paddingLeft: 10,
                  color: !gender ? Colors.textGrayColor : 'black',
                }}>
                {!gender ? 'Chọn giới tính của bạn' : gender}
              </TextNormal>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperButton}>
            <CustomButton
              onPress={handleSubmitInfo}
              label={strings.common.continue}
              styledButton={styles.btnContinue}
            />
          </View>
        </View>
        {Platform.OS === 'android' && modal === 1 && (
          <DateTimePicker
            value={new Date()}
            mode={'date'}
            display={Platform.OS === 'android' ? 'default' : 'spinner'}
            onChange={onChangeDate}
            textColor="black"
            // style={styles.datePicker}
          />
        )}
        {Platform.OS === 'ios' && modal === 1 && (
          <DateTimePicker
            value={timeValue}
            mode={'date'}
            display={Platform.OS === 'android' ? 'default' : 'spinner'}
            onChange={onChangeDate}
            textColor="black"
            // style={styles.datePicker}
          />
        )}
        <MyModal visible={modal === 2} onPressOutSide={() => setModal(-1)}>
          <View style={styles.modalView}>
            <View style={{height: heightDevice / 3}}>
              <View style={styles.wrapperContentModal}>
                <TextSemiBold style={styles.textTitleModal}>
                  Giới tính
                </TextSemiBold>
                <View style={styles.wrapperContentGender}>
                  <TouchableOpacity
                    onPress={() => setGender('Nam')}
                    style={[
                      styles.wrapperItemGender,
                      gender === 'Nam' && styles.activeGenderMale,
                    ]}>
                    <Svg
                      name={'icon_male'}
                      size={90}
                      style={styles.avatarIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setGender('Nữ')}
                    style={[
                      styles.wrapperItemGender,
                      gender !== 'Nam' && styles.activeGenderFemale,
                    ]}>
                    <Svg
                      name={'icon_female'}
                      size={90}
                      style={styles.avatarIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.safeView}>
                  <TouchableOpacity
                    onPress={() => setModal(-1)}
                    style={styles.btnSelectGender}>
                    <TextNormal style={styles.textButton}>
                      {strings.common.save}
                    </TextNormal>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </MyModal>
      </Pressable>
    </SafeAreaView>
  );
};

export default BaseProfile;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 15,
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.backgroundColor,
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 15,
    // backgroundColor: 'red',
  },
  textInput: {
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 50,
    height: 48,
    paddingHorizontal: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: Colors.textGrayColor,
  },
  wrapperSection: {
    paddingVertical: 15,
    // paddingHorizontal: 15,
  },
  birthSection: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 5,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.textGrayColor,
  },
  btnContinue: {
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonBackground,
    borderRadius: 40,
    width: widthDevice - 30,
  },
  wrapperButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  textButton: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.whiteColor,
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
  textTitleModal: {textAlign: 'center', fontSize: 24, fontWeight: 'bold'},
  wrapperContentModal: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  wrapperItemGender: {
    width: widthDevice / 2 - 40,
    // paddingVertical: 10,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  avatarIcon: {position: 'absolute', top: -25, zIndex: 100, elevation: 10},
  wrapperContentGender: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    alignItems: 'center',

    // backgroundColor: 'red',
  },
  activeGenderMale: {
    backgroundColor: '#DDE1FF',
    borderWidth: 1,
    borderColor: 'blue',
  },
  activeGenderFemale: {
    backgroundColor: '#FFD9E0',
    borderWidth: 1,
    borderColor: 'red',
  },
  btnSelectGender: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 40,
    backgroundColor: Colors.buttonBackground,
    width: '90%',
  },
});
