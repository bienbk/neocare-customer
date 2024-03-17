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
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import MyModal from '../../common/MyModal/MyModal';
import {convertDate, heightDevice, widthDevice} from '../../assets/constans';

import Svg from '../../common/Svg/Svg';

import CustomButton from '../../common/CustomButton/CustomButton';
import DateTimePicker from '../../common/DateTImePicker/DateTimePicker';
import GenderModal from '../MyProfile/GenderModal';

const BaseProfile = ({next}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('Nam');
  const [modal, setModal] = useState(-1);
  const [date, setDate] = useState(new Date());
  function formatBirthday(birthdayInput) {
    const bdArr = birthdayInput.substring(0, 10).split('-');
    return `${bdArr[0]}-${bdArr[2]}-${bdArr[1]}T00:00:00Z`;
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
      birthday: formatBirthday(date.toISOString()),
    };
    // console.log(payload);
    next(payload);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View onTouchStart={Keyboard.dismiss} style={styles.container}>
        <View style={styles.wrapperTitle}>
          <TextMoneyBold style={{fontSize: 24}}>
            {'Thông tin cơ bản'}
          </TextMoneyBold>
        </View>
        <View style={styles.wrapperSection}>
          <TextNormal style={{fontSize: 15}}>Họ:</TextNormal>
          <TextInput
            style={styles.textInput}
            placeholder={'Nhập họ của bạn'}
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
                color: !date ? Colors.textGrayColor : 'black',
              }}>
              {date.toLocaleDateString() || 'Nhập ngày sinh của bạn'}
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
      <DateTimePicker
        isOpen={modal === 1}
        maxDate={new Date()}
        type={'date'}
        onConfirm={v => {
          setDate(v);
          setModal(-1);
        }}
        onClose={() => setModal(-1)}
      />
      <MyModal visible={modal === 2} onPressOutSide={() => setModal(-1)}>
        <View style={styles.modalView}>
          <View style={{height: heightDevice / 3}}>
            <GenderModal
              gender={gender}
              setGender={setGender}
              onConfirm={() => setModal(-1)}
            />
          </View>
        </View>
      </MyModal>
    </SafeAreaView>
  );
};

export default BaseProfile;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 10,
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
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: Colors.gray.gray90,
  },
  wrapperSection: {
    paddingVertical: 15,
    // paddingHorizontal: 15,
  },
  birthSection: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 5,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.gray.gray90,
  },
  btnContinue: {
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    width: widthDevice - 50,
  },
  wrapperButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  textButton: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
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
    backgroundColor: Colors.primary,
    width: '90%',
  },
});
