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
  return (
    <View style={styles.container}>
      <View style={styles.wrapperTitle}>
        <TextSemiBold style={styles.textTitle}>
          {'Thông tin đuờng huyết'}
        </TextSemiBold>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_HOME)}
          style={styles.wrapperClose}>
          <Icons type={'Feather'} name={'x'} size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBloodSugar}>
        <View
          style={{
            paddingVertical: 10,
            // backgroundColor: 'green',
            alignItems: 'center',
          }}>
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
          <TextMoneyBold
            style={{
              fontSize: 40,
              paddingVertical: 10,
              color: Colors.gray.gray10,
            }}>
            {bloodSugar}
          </TextMoneyBold>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'center',
              width: '60%',
              alignItems: 'center',
              marginBottom: 10,
              backgroundColor: Colors.gray.gray95,
              borderRadius: 30,
            }}>
            <TouchableOpacity
              onPress={() => setMessure(1)}
              style={[
                styles.messureButton,
                messure === 1 && {backgroundColor: Colors.blue.blue80},
              ]}>
              <TextSemiBold
                style={messure === 1 && {color: Colors.blue.blue30}}>
                mg/dL
              </TextSemiBold>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMessure(2)}
              style={[
                styles.messureButton,
                messure === 2 && {backgroundColor: Colors.blue.blue80},
              ]}>
              <TextSemiBold
                style={messure === 2 && {color: Colors.blue.blue30}}>
                mmol/L
              </TextSemiBold>
            </TouchableOpacity>
          </View>
        </View>
        <HorizontalRange
          dataRange={dataValues()}
          value={bloodSugar}
          setValue={setBloodSugar}
        />
        <View style={{paddingVertical: 10, alignItems: 'center', marginTop: 20}}>
          <TextNormalSemiBold
            style={{color: Colors.gray.gray40, fontWeight: 'bold'}}>
            {'Đuờng huyết đơn vị mg/dL (0 - 100)'}
          </TextNormalSemiBold>
          <FlatList
            data={[{name: 'Nhịn ăn'}, {name: 'Sau ăn '}, {name: 'Truớc ăn'}]}
            contentContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 20,
              width: '100%',
            }}
            horizontal={true}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => setTimeMessure(index + 1)}
                  style={[
                    styles.wrapperTime,
                    timeMessure === index + 1 && {
                      backgroundColor: Colors.red.red70,
                    },
                  ]}>
                  <TextNormalSemiBold
                    style={
                      timeMessure === index + 1 && {color: Colors.whiteColor, fontWeight: 'bold'}
                    }>
                    {item.name}
                  </TextNormalSemiBold>
                </TouchableOpacity>
              );
            }}
          />
          <View style={{alignItems: 'center'}}>
            <TextNormalSemiBold
              style={{color: Colors.gray.gray40, fontWeight: 'bold'}}>
              {'8 giờ hoặc hơn kể từ sau bữa ăn gần nhất'}
            </TextNormalSemiBold>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.completeButton}>
        <TextSemiBold style={{color: Colors.whiteColor}}>
          {strings.common.complete}
        </TextSemiBold>
      </TouchableOpacity>
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
