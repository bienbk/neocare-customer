import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormalSemiBold,
  TextSemiBold,
} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import DateTimePicker from '@react-native-community/datetimepicker';
import HorizontalRange from '../../common/HorizontalRange/HorizontalRange';
import {NAVIGATION_HOME} from '../../navigation/routes';
import CustomButton from '../../common/CustomButton/CustomButton';
import {widthDevice} from '../../assets/constans';
import UnitSelector from '../../common/UnitSelector/UnitSelector';
const dataValues = () => {
  const result = [];
  for (let i = 0; i < 100; i++) {
    result.push(i);
  }
  return result;
};
const BloodSugar = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const refDate = useRef(null);
  const [date, setDate] = useState('');
  const [messure, setMessure] = useState(1);
  const [bloodSugar, setBloodSugar] = useState(1);
  const [timeMessure, setTimeMessure] = useState(1);

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
  const renderTimerItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setTimeMessure(index + 1)}
        style={[
          styles.wrapperTime,
          timeMessure === index + 1 && {
            backgroundColor: Colors.red.red80,
            borderColor: Colors.pink.pink90,
          },
        ]}>
        <TextNormalSemiBold
          style={
            timeMessure === index + 1 && {
              color: Colors.whiteColor,
              fontWeight: 'bold',
            }
          }>
          {item.name}
        </TextNormalSemiBold>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NAVIGATION_HOME)}
        style={styles.wrapperClose}>
        <Icons type={'Feather'} name={'x'} size={20} color={'white'} />
      </TouchableOpacity>
      <TextSemiBold style={styles.textTitle}>
        {'Thông tin đuờng huyết'}
      </TextSemiBold>
      <View style={styles.containerBloodSugar}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.wrapperDatePicker}>
            <Icons
              type={'Feather'}
              name={'calendar'}
              size={18}
              color={'black'}
            />
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
          <TextMoneyBold style={styles.bloodSugarText}>
            {bloodSugar}
          </TextMoneyBold>
          <UnitSelector
            firstOption={'mg/dL'}
            secondOption={'mmol/L'}
            onPressSelector={val => setMessure(val)}
            isSelected={messure}
          />
        </View>
        <HorizontalRange
          dataRange={dataValues()}
          value={bloodSugar}
          setValue={setBloodSugar}
        />
        <TextNormalSemiBold style={styles.textNoteSlider}>
          {'Đuờng huyết đơn vị mg/dL (0 - 100)'}
        </TextNormalSemiBold>
        <View style={{paddingVertical: 15, alignItems: 'center'}}>
          <FlatList
            data={[{name: 'Nhịn ăn'}, {name: 'Sau ăn '}, {name: 'Truớc ăn'}]}
            contentContainerStyle={styles.wrapperTimerFlatlist}
            horizontal={true}
            renderItem={renderTimerItem}
          />
          <View style={{alignItems: 'center'}}>
            <TextNormalSemiBold style={{color: Colors.gray.gray50}}>
              {'8 giờ hoặc hơn kể từ sau bữa ăn gần nhất'}
            </TextNormalSemiBold>
          </View>
        </View>
      </View>
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
    </View>
  );
};
export default BloodSugar;
