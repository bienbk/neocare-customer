import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import {TextMoneyBold, TextNormal} from 'common/Text/TextFont';
import Colors from 'theme/Colors';
import strings from 'localization/Localization';
import MyModal from 'common/MyModal/MyModal';
import styles from './styles';

import CustomButton from 'common/CustomButton/CustomButton';
import DateTimePicker from 'common/DateTImePicker/DateTimePicker';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserInformation, resetUpdateUser} from 'store/user/userAction';
import {asyncStorage} from 'store';
import GenderModal from './GenderModal';
import HeightSelector from './HeightSelector';
import {statusUpdateUserSelector} from 'store/user/userSelector';
import Status from 'common/Status/Status';
import {NAVIGATION_ACCOUNT} from 'navigation/routes';
import Icons from 'common/Icons/Icons';
import Images from 'common/Images/Images';
import {user_example} from 'assets/constans';
import Svg from 'common/Svg/Svg';

const MyProfile = ({navigation}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam');
  const [phone, setPhone] = useState('');
  const [modal, setModal] = useState(-1);
  const [date, setDate] = useState('');
  const [height, setHeight] = useState(165);
  const dispatch = useDispatch();
  const statusUpdateUser = useSelector(state =>
    statusUpdateUserSelector(state),
  );
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    const user = await asyncStorage.getUser();
    setName(`${user?.last_name} ${user?.first_name}`);
    setPhone(user?.phone);
    setGender(user?.gender === 1 ? 'Nam' : 'Nữ');
    setDate(new Date(user?.birthday).toLocaleDateString());
  };
  function formatBirthday(birthdayInput) {
    const bdArr = birthdayInput.split('/');
    return `${bdArr[2]}-${bdArr[1]}-${
      parseFloat(bdArr[0]) < 10 ? `0${bdArr[0]}` : bdArr[0]
    }T00:00:00Z`;
  }
  const handleSubmitInfo = async () => {
    if (!name) {
      return;
    }
    const payload = {
      first_name: name.split(' ').length >= 1 && name.split(' ')[1],
      last_name: name.split(' ').length >= 1 && name.split(' ')[0],
      gender: gender === 'Nam' ? 1 : 0,
      info_submitted: 1,
      birthday: formatBirthday(date),
    };
    console.log(payload);
    dispatch(updateUserInformation(payload));
  };
  useEffect(() => {
    if (statusUpdateUser === Status.SUCCESS) {
      dispatch(resetUpdateUser());
      navigation && navigation.navigate(NAVIGATION_ACCOUNT);
    }
  }, [statusUpdateUser]);
  const onBack = () => {
    navigation && navigation.navigate(NAVIGATION_ACCOUNT);
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View onTouchStart={Keyboard.dismiss} style={styles.container}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Icons
            type={'Ionicons'}
            name={'arrow-back'}
            size={24}
            color={'black'}
          />
        </TouchableOpacity>
        <TextMoneyBold style={styles.titleMyProfile}>
          {'Hồ sơ của tôi'}
        </TextMoneyBold>
        <TouchableOpacity style={styles.wrapperAvatar}>
          <Images source={user_example} style={styles.avatar} />
          <View style={styles.iconEdit}>
            <Svg name={'icon_edit1'} size={25} />
          </View>
        </TouchableOpacity>
        <View style={styles.wrapperSection}>
          <TextNormal style={styles.titleText}>Họ tên:</TextNormal>
          <TextInput
            style={styles.textInput}
            placeholder={'Nhập họ và tên của bạn'}
            returnKeyType={'done'}
            placeholderTextColor={Colors.textGrayColor}
            onSubmitEditing={Keyboard.dismiss}
            value={name}
            onChangeText={setName}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.wrapperSection}>
          <TextNormal style={styles.titleText}>Số điện thoại</TextNormal>
          <View style={styles.inputPhone}>
            <TextNormal>{phone}</TextNormal>
          </View>
        </View>
        <View style={styles.wrapperLine}>
          <View style={[styles.wrapperSection, {width: '48%'}]}>
            <TextNormal style={styles.titleText}>Ngày sinh:</TextNormal>
            <TouchableOpacity
              style={styles.birthSection}
              onPress={() => setModal(1)}>
              <TextNormal>{date || 'Nhập ngày sinh của bạn'}</TextNormal>
            </TouchableOpacity>
          </View>
          <View style={[styles.wrapperSection, {width: '50%'}]}>
            <TextNormal style={styles.titleText}>Giới tính:</TextNormal>
            <TouchableOpacity
              style={styles.birthSection}
              onPress={() => setModal(2)}>
              <TextNormal>
                {!gender ? 'Chọn giới tính của bạn' : gender}
              </TextNormal>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.wrapperSection]}>
          <TextNormal style={styles.titleText}>Chiều cao</TextNormal>
          <TouchableOpacity
            style={styles.birthSection}
            onPress={() => setModal(3)}>
            <TextNormal>{height ? `${height} cm` : '165 cm'}</TextNormal>
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
          setDate(v.toLocaleDateString());
          setModal(-1);
        }}
        onClose={() => setModal(-1)}
      />
      <MyModal visible={modal === 2 || modal === 3} onPressOutSide={() => {}}>
        <View style={styles.modalView}>
          {modal === 2 && (
            <GenderModal
              onConfirm={() => setModal(-1)}
              setGender={setGender}
              gender={gender}
            />
          )}
          {modal === 3 && (
            <HeightSelector
              height={height}
              setHeight={setHeight}
              onClose={() => setModal(-1)}
            />
          )}
          {/* {modal === 4 && <HeightSelector />} */}
        </View>
      </MyModal>
    </SafeAreaView>
  );
};

export default MyProfile;
