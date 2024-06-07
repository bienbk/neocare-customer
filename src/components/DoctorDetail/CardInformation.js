import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icons from 'common/Icons/Icons';
import {
  TextSemiBold,
  TextSmallMedium,
  TextSmallTwelve,
} from 'common/Text/TextFont';
import Colors from 'theme/Colors';
import {RenderHTML} from 'react-native-render-html';
import {widthDevice} from 'assets/constans';
import {TextNormal} from '../../common/Text/TextFont';
const CardInformation = ({doctor, onPressDescription, showDescription}) => {
  if (doctor) {
    return (
      <View style={[styles.wrapeprCardInfo]}>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icons type={'Feather'} name={'phone'} size={18} color={'white'} />
        </TouchableOpacity>
        <View style={styles.inforCard}>
          <TextSemiBold style={{fontSize: 24}}>
            {doctor?.last_name + ' ' + doctor?.first_name}
          </TextSemiBold>
          <TextNormal style={styles.departmentText}>
            {'Chuyên khoa tim mạch'}
          </TextNormal>
          <TextNormal style={styles.subtitle}>
            {'Mã chuyên gia: '}
            <TextNormal style={styles.textCode}>{doctor?.qr_code}</TextNormal>
          </TextNormal>
        </View>
        <TouchableOpacity
          onPress={onPressDescription}
          style={styles.toggleIcon}>
          <TextNormal style={styles.textTitleInfo}>
            {'Thông tin chi tiết'}
          </TextNormal>
          <Icons
            type={'Feather'}
            name={!showDescription ? 'chevron-down' : 'chevron-up'}
            size={20}
            color={'black'}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.wrapperDescription,
            !showDescription && {display: 'none'},
          ]}>
          {doctor && doctor?.introduce && (
            <RenderHTML
              contentWidth={widthDevice}
              source={{html: doctor?.introduce}}
              baseStyle={{color: Colors.gray.gray40}}
            />
          )}
        </View>
      </View>
    );
  }
};

export default CardInformation;
