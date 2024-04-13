import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {WARNING_TEXT, heightDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import {TextNormalSemiBold, TextSemiBold} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import styles from './styles';

const WarningContainer = ({onSkip, onSending, title, error}) => {
  return (
    <View
      style={{
        height: heightDevice / 3.5,
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          paddingBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Icons
          type={'Ionicons'}
          name={'warning'}
          color={Colors.primary}
          size={20}
        />
        <TextSemiBold>{title}</TextSemiBold>
        <TouchableOpacity onPress={onSkip}>
          <Icons
            type={'Ionicons'}
            name={'close'}
            color={Colors.main}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <TextNormalSemiBold style={{lineHeight: 20, fontSize: 14}}>
          {error && error.length > 0 ? error : WARNING_TEXT}
        </TextNormalSemiBold>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <TextNormalSemiBold>Bỏ qua</TextNormalSemiBold>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSending} style={styles.sendServiceBtn}>
          <TextNormalSemiBold>Gửi yêu cầu tư vấn</TextNormalSemiBold>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WarningContainer;
