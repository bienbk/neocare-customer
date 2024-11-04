import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {WARNING_TEXT, heightDevice} from '../../assets/constans';
import Icons from '../../common/Icons/Icons';
import {
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallTwelve,
} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
import styles from './styles';

const WarningContainer = ({onSkip, onSending, title, error, type, note}) => {
  return (
    <View
      style={{
        minHeight: heightDevice / 3.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          paddingBottom: 15,
          flexDirection: 'row',
          justifyContent: type === 1 ? 'space-between' : 'center',
        }}>
        {type === 1 && (
          <Icons
            type={'Ionicons'}
            name={'warning'}
            color={Colors.primary}
            size={20}
          />
        )}
        <TextSemiBold>
          {type === 1 ? title : 'Gửi yêu cầu thành công'}
        </TextSemiBold>
        {type === 1 && (
          <TouchableOpacity onPress={onSkip}>
            <Icons
              type={'Ionicons'}
              name={'close'}
              color={Colors.main}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {type === 1 && (
          <View>
            <TextNormalSemiBold style={{lineHeight: 20, fontSize: 14}}>
              {error && error.length > 0 ? error : WARNING_TEXT}
            </TextNormalSemiBold>
            {note && (
              <TextSmallTwelve style={{paddingVertical: 5, color: Colors.high}}>
                {note}
              </TextSmallTwelve>
            )}
          </View>
        )}
        {type === 2 && (
          <TextNormalSemiBold style={{textAlign: 'center'}}>
            {
              'Yêu cầu tư vấn của bạn đã được gửi thành công. Chuyên gia sẽ liên hệ với bạn trong thời gian sớm nhất'
            }
          </TextNormalSemiBold>
        )}
      </View>
      {type === 1 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <TextNormalSemiBold style={{fontWeight: 'bold'}}>
              Bỏ qua
            </TextNormalSemiBold>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={note.length > 0}
            onPress={onSending}
            style={[
              styles.sendServiceBtn,
              note && {backgroundColor: Colors.gray.gray90},
            ]}>
            <TextNormalSemiBold
              style={{fontWeight: 'bold', color: note ? 'gray' : Colors.main}}>
              Gửi yêu cầu tư vấn
            </TextNormalSemiBold>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onSkip}
          style={{
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primary,
            alignItems: 'center',
            borderRadius: 12,
            paddingVertical: 13,
          }}>
          <TextNormalSemiBold style={{fontWeight: 'bold'}}>
            {'Tôi đã hiểu'}
          </TextNormalSemiBold>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WarningContainer;
