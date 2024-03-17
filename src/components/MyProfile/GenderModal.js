import React from 'react';
import styles from './styles';
import {TouchableOpacity, View} from 'react-native';
import {TextNormal, TextSemiBold} from '../../common/Text/TextFont';
import strings from '../../localization/Localization';
import Svg from '../../common/Svg/Svg';
import {heightDevice} from '../../assets/constans';

const GenderModal = ({gender, setGender, onConfirm}) => {
  return (
    <View style={{height: heightDevice / 3}}>
      <View style={styles.wrapperContentModal}>
        <TextSemiBold style={styles.textTitleModal}>Giới tính</TextSemiBold>
        <View style={styles.wrapperContentGender}>
          <TouchableOpacity
            onPress={() => setGender('Nam')}
            style={[
              styles.wrapperItemGender,
              gender === 'Nam' && styles.activeGenderMale,
            ]}>
            <Svg name={'icon_male'} size={90} style={styles.avatarIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender('Nữ')}
            style={[
              styles.wrapperItemGender,
              gender !== 'Nam' && styles.activeGenderFemale,
            ]}>
            <Svg name={'icon_female'} size={90} style={styles.avatarIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.safeView}>
          <TouchableOpacity onPress={onConfirm} style={styles.btnSelectGender}>
            <TextNormal style={styles.textButton}>
              {strings.common.save}
            </TextNormal>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GenderModal;
