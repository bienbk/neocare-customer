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
import CustomCheckbox from '../../common/CustomCheckbox/CustomCheckbox';
import CustomButton from '../../common/CustomButton/CustomButton';
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
  const handleValueCheckbox = item => {
    const tempList = Array.from(listDiseases);
    tempList.map(i => {
      if (i.id === item.id) {
        i.value = !i.value;
      }
    });
    setlistDiseases(tempList);
  };
  const renderSelector = ({item}) => {
    return (
      <View
        onPress={() => hanldeSelectItem(item)}
        style={styles.wrapperCheckbox}>
        <TextNormal>{item.name}</TextNormal>
        <CustomCheckbox
          value={item.value}
          setValue={() => handleValueCheckbox(item)}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* TITLE SECTION */}
      <View style={styles.wrapperTitle}>
        <TextMoneyBold style={{fontSize: 24, marginBottom: 5}}>
          {'Tình trạng sức khoẻ'}
        </TextMoneyBold>
        <TextNormal style={styles.subtitleText}>
          {'Bạn có bất kỳ bệnh mạn tính nào sau đây không?'}
        </TextNormal>
        <TextNormal style={styles.subtitleText}>
          {'Chọn tất cả tình trạng bạn đang có'}
        </TextNormal>
      </View>
      {/* Check list SECTION */}
      <View style={{flex: 1, marginBottom: 100}}>
        <FlatList
          data={listDiseases}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderSelector}
        />
      </View>
      <CustomButton onPress={nextStep} label={strings.common.complete} />
    </View>
  );
};

export default HealthStatus;
