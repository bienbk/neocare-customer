import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Animated,
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
import {updateUserInformation, resetUpdateUser} from 'store/actions';
import {asyncStorage} from 'store';
import GenderModal from './GenderModal';
import HeightSelector from './HeightSelector';
import {statusUpdateUserSelector} from 'store/user/userSelector';
import Status from 'common/Status/Status';
import {NAVIGATION_ACCOUNT} from 'navigation/routes';
import Icons from 'common/Icons/Icons';
import Images from 'common/Images/Images';
import {user_example, heightDevice} from 'assets/constans';
import Svg from 'common/Svg/Svg';

const MyProfile = ({navigation}) => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
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
    const user = (await asyncStorage.getUser()) || {id: -1};
    setLastname(user?.last_name || '');
    setFirstname(user?.first_name || '');
    setPhone(user?.phone || '');
    setGender(user?.gender === 1 ? 'Nam' : 'Nữ');
    setHeight(user?.height || 165);
    const tempBirthday = user?.birthday
      ? user.birthday.substring(0, 10).split('-').reverse().join('/')
      : '';
    setDate(tempBirthday);
  };
  function formatBirthday(birthdayInput) {
    const bdArr = birthdayInput.split('/');
    return `${bdArr[2]}-${bdArr[1]}-${bdArr[0]}T00:00:00Z`;
  }
  const handleSubmitInfo = () => {
    if (!firstname || !lastname) {
      return;
    }
    const payload = {
      first_name: firstname,
      last_name: lastname,
      gender: gender === 'Nam' ? 1 : 0,
      info_submitted: 1,
      birthday: formatBirthday(date),
      height: parseFloat(height),
    };
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
  const transitionModal = new Animated.Value(heightDevice);
  React.useEffect(() => {
    if (modal === 2 || modal === 3) {
      animatedAction(transitionModal);
    }
  }, [modal]);
  const animatedAction = val => {
    Animated.timing(val, {
      duration: 700,
      toValue: 0,
      useNativeDriver: true,
    }).start();
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
          <Svg name={'avatar_default'} size={80} style={styles.avatar} />
          {/* <View style={styles.iconEdit}>
            <Svg name={'icon_edit1'} size={25} />
          </View> */}
        </TouchableOpacity>
        <View style={styles.wrapperSection}>
          <TextNormal style={styles.titleText}>Họ của bạn:</TextNormal>
          <TextInput
            style={styles.textInput}
            placeholder={'Nhập họ của bạn'}
            returnKeyType={'done'}
            placeholderTextColor={Colors.textGrayColor}
            onSubmitEditing={Keyboard.dismiss}
            value={lastname}
            onChangeText={setLastname}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.wrapperSection}>
          <TextNormal style={styles.titleText}>Tên của bạn:</TextNormal>
          <TextInput
            style={styles.textInput}
            placeholder={'Nhập tên của bạn'}
            returnKeyType={'done'}
            placeholderTextColor={Colors.textGrayColor}
            onSubmitEditing={Keyboard.dismiss}
            value={firstname}
            onChangeText={setFirstname}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.wrapperSection}>
          <TextNormal style={styles.titleText}>Số điện thoại</TextNormal>
          <View style={styles.inputPhone}>
            <TextNormal style={styles.phoneText}>{phone}</TextNormal>
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
            label={strings.common.save}
            styledButton={styles.btnContinue}
          />
        </View>
      </View>
      <DateTimePicker
        isOpen={modal === 1}
        maxDate={new Date()}
        type={'date'}
        onConfirm={v => {
          setDate(v.toLocaleDateString('en-GB'));
          setModal(-1);
        }}
        onClose={() => setModal(-1)}
      />
      <MyModal visible={modal === 2 || modal === 3} onPressOutSide={() => {}}>
        <Animated.View
          style={[
            styles.modalView,
            {transform: [{translateY: transitionModal}]},
          ]}>
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
        </Animated.View>
      </MyModal>
    </SafeAreaView>
  );
};

export default MyProfile;
