import React from 'react';
import styles from './styles';
import {TouchableOpacity, View} from 'react-native';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import strings from '../../localization/Localization';
import Svg from '../../common/Svg/Svg';
import {heightDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';

const HeightSelector = ({height, setHeight, onClose}) => {
  return (
    <View style={{height: heightDevice / 3}}>
      <View style={styles.wrapperContentModal}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icons type={'AntDesign'} name={'close'} size={24} color={'black'} />
        </TouchableOpacity>
        <TextSemiBold style={styles.textTitleModal}>Chiều cao</TextSemiBold>
        <View style={styles.safeView}>
          <View style={styles.wrapperHeightSelector}>
            <TouchableOpacity
              style={styles.buttonIncrement}
              onPress={() => setHeight(height - 1)}>
              <Icons type={'Entypo'} name={'minus'} size={32} color={'white'} />
            </TouchableOpacity>
            <TextMoneyBold style={{fontSize: 60, marginBottom: 5}}>
              {height}
            </TextMoneyBold>
            <TouchableOpacity
              style={styles.buttonIncrement}
              onPress={() => setHeight(height + 1)}>
              <Icons type={'Entypo'} name={'plus'} size={32} color={'white'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.btnSelectGender}>
            <TextNormal style={styles.textButton}>
              {strings.common.save}
            </TextNormal>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeightSelector;
