/* eslint-disable react-native/no-inline-styles */
import {React, useState, useRef, useEffect} from 'react';
import {View, FlatList} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {TextMoneyBold, TextNormal} from '../../common/Text/TextFont';
import strings from '../../localization/Localization';

import CustomCheckbox from '../../common/CustomCheckbox/CustomCheckbox';
import CustomButton from '../../common/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  listDiseaseSelector,
  statusListDiseaseSelector,
} from '../../store/disease/diseaseSelector';
import {getListDiseasesAction} from '../../store/disease/diseaseAction';
const listDisease = [
  {id: 1, name: 'Bệnh Alzheimer và mất trí nhớ', checked: false},
  {id: 12, name: 'Tiểu đường', checked: false},
  {id: 13, name: 'Hen suyễn', checked: false},
  {id: 14, name: 'Viêm khớp', checked: false},
  {id: 15, name: 'Bệnh Crohn', checked: false},
  {id: 16, name: 'Động kinh', checked: false},
  {id: 17, name: 'Bệnh tắc nghẽn phổi mãn tính COPD', checked: false},
  {id: 18, name: 'Bệnh tim', checked: false},
  {id: 142, name: 'Ung thư', checked: false},
];
const HealthStatus = ({nextStep}) => {
  const [listDiseases, setlistDiseases] = useState(listDisease);
  const dispatch = useDispatch();
  const listAllDisease = useSelector(state => listDiseaseSelector(state));
  const statusListDisease = useSelector(state =>
    statusListDiseaseSelector(state),
  );

  useEffect(() => {
    dispatch(
      getListDiseasesAction({
        page: 1,
        size: 10,
      }),
    );
  }, []);
  const handleValueCheckbox = item => {
    const tempList = Array.from(listDiseases);
    tempList.map(i => {
      if (i.id === item.id) {
        i.checked = !i.checked;
        i.symtoms = '';
      }
    });
    setlistDiseases(tempList);
  };
  const renderSelector = ({item}) => {
    return (
      <View style={styles.wrapperCheckbox}>
        <TextNormal>{item.name}</TextNormal>
        <CustomCheckbox
          value={item.checked}
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
      <CustomButton
        onPress={() =>
          nextStep({diseases: listDiseases.filter(i => i.checked === true)})
        }
        label={strings.common.complete}
      />
    </View>
  );
};

export default HealthStatus;
