import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icons from '../../common/Icons/Icons';
import {
  TextSemiBold,
  TextSmallMedium,
  TextSmallTwelve,
} from '../../common/Text/TextFont';
import Colors from '../../theme/Colors';
// () => setShowDescription(prev => (prev = !prev))
const DESCRIPTION =
  'BS CKI Lê Hoàng Bảo công tác tại bệnh viện Đại học Y dược TP.HCM, có hơn 10 năm kinh nghiệm điều trị các bệnh lý nội tiết, bao gồm đái tháo đường, tuyến giáp, tuyến thượng thận, tuyến yên, chuyển hóa. Ngoài ra, BS Lê Hoàng Bảo còn là Hội viên Hội Đái tháo đường và Nội tiết TP.';
const CardInformation = ({doctor, onPressDescription, showDescription}) => {
  return (
    <View style={[styles.wrapeprCardInfo]}>
      <TouchableOpacity style={styles.phoneIcon}>
        <Icons type={'Feather'} name={'phone'} size={18} color={'white'} />
      </TouchableOpacity>
      <View style={styles.inforCard}>
        <TextSemiBold style={{fontSize: 20}}>
          {doctor?.last_name
            ? doctor?.last_name + ' ' + doctor?.first_name
            : 'Nguyen Tran'}
        </TextSemiBold>
        {/* <View style={styles.wrapperDepartmentLabel}>
          <TextSmallTwelve style={{color: Colors.primary, fontWeight: 'bold'}}>
            {'Tim mạch'}
          </TextSmallTwelve>
        </View> */}
        <TextSmallTwelve
          style={{color: Colors.gray.gray50, paddingVertical: 3}}>
          {'Chuyên khoa tim mạch'}
        </TextSmallTwelve>
        <TextSmallTwelve>
          {'Mã chuyên gia: '}
          <TextSmallTwelve
            style={{color: Colors.gray.gray50, fontWeight: 'bold'}}>
            {doctor?.qr_code}
          </TextSmallTwelve>
        </TextSmallTwelve>
      </View>
      <View
        style={[
          styles.wrapperDescription,
          // !showDescription && {height: '50%'},
        ]}>
        <TextSmallMedium numberOfLines={showDescription ? 0 : 3}>
          {DESCRIPTION}
        </TextSmallMedium>
        <TouchableOpacity
          onPress={onPressDescription}
          style={styles.toggleIcon}>
          <TextSmallMedium style={styles.textShowMore}>
            {showDescription ? 'Rút gọn' : 'Xem thêm'}
          </TextSmallMedium>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardInformation;
