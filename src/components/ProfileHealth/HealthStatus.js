/* eslint-disable react-native/no-inline-styles */
import {React, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import strings from '../../localization/Localization';
import {heightDevice, widthDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import CheckBox from '@react-native-community/checkbox';
const listDisease = [
  {id: 1, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 12, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 13, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 14, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 15, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 16, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 17, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 18, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 142, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
];
const HealthStatus = ({nextStep}) => {
  // const [selectedItem, setSelectedItem] = useState([]);
  const [listDiseases, setlistDiseases] = useState(listDisease);
  const hanldeSelectItem = item => {
    if (!item) {
      return 0;
    }
    const newList = Array.from(listDiseases);
    newList.map(i => {
      if (i && i.id === item.id) {
        i.checked = !item.checked;
      }
    });
    setlistDiseases(newList);
  };
  return (
    <View style={{flex: 1}}>
      {/* TITLE SECTION */}
      <View style={styles.wrapperTitle}>
        <TextMoneyBold style={{fontSize: 24, marginBottom: 5}}>
          {'Tình trạng sức khoẻ'}
        </TextMoneyBold>
        <TextNormal style={{textAlign: 'center'}}>
          {
            'Bạn có bất kỳ bệnh mạn tính nào sau đây không? Chọn tất cả tình trạng bạn đang có'
          }
        </TextNormal>
      </View>
      {/* Check list SECTION */}
      <View style={{flex: 1}}>
        <FlatList
          data={listDiseases}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => hanldeSelectItem(item)}
                style={styles.wrapperCheckbox}>
                <CheckBox
                  boxType={'square'}
                  lineWidth={2}
                  style={{marginRight: 10}}
                  onTintColor={'#5B73E0'}
                  onFillColor={'#5B73E0'}
                  tintColors={{true: '#5B73E0', false: '#5B73E0'}}
                  onCheckColor={Colors.whiteColor}
                  width={22}
                  value={item.checked}
                />
                <TextNormal>{item.name}</TextNormal>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={nextStep} style={styles.buttonContinue}>
          <TextSemiBold style={styles.textContinueButton}>
            {strings.common.complete}
          </TextSemiBold>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HealthStatus;
