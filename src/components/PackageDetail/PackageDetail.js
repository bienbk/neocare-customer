import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
  TextSmallMedium,
} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import Svg from '../../common/Svg/Svg';
import {NAVIGATION_DOCTOR_DETAIL} from '../../navigation/routes';
import {widthDevice} from '../../assets/constans';
import ConfirmationModal from '../../common/ConfirmationModal/ConfirmationModal';
import strings from '../../localization/Localization';

const PackageDetail = ({navigation}) => {
  const [currentPackge, setCurrentPackge] = useState(null);
  const [modal, setModal] = useState(false);
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: Colors.blue.blue98,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_DOCTOR_DETAIL)}
          style={styles.closeIcon}>
          <Icons
            type={'Feather'}
            name={'arrow-left'}
            size={30}
            color={'white'}
          />
        </TouchableOpacity>
        <TextSemiBold style={{paddingVertical: 25}}>
          Gói chăm sóc đặc biệt 6 tháng
        </TextSemiBold>
        <View style={styles.wrapperContentCard}>
          <View style={styles.contentLine}>
            <TextNormal>Hiệu lực từ</TextNormal>
            <TextNormal>Ngày yêu cầu được xác nhận</TextNormal>
          </View>
          <View style={styles.contentLine}>
            <TextNormal>Thời hạn gói</TextNormal>
            <TextNormal>6 tháng</TextNormal>
          </View>
          <View style={styles.contentLine}>
            <TextNormal>Thanh toán</TextNormal>
            <TextNormal>Tiền mặt</TextNormal>
          </View>
          <View style={styles.wrapperPaymentLine}>
            <TextNormal>Tổng</TextNormal>
            <TextNormal>2.500.000đ</TextNormal>
          </View>
        </View>
        <TextSmallMedium style={styles.warningText}>
          *Sau khi gửi yêu cầu mua gói bác sĩ sẽ liên hệ với bạn sớm nhất có
          thể.
        </TextSmallMedium>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={styles.sendButton}>
          <TextSemiBold style={{color: Colors.whiteColor}}>
            Gửi yêu cầu
          </TextSemiBold>
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        isConfriming={true}
        isOpen={modal}
        onConfirm={() => {
          setModal(false);
          navigation && navigation.navigate(NAVIGATION_DOCTOR_DETAIL);
        }}
        title={strings.common.notification}
        textContent={
          'Yêu cầu mua gói của bạn đã được gửi đến bác sĩ. Bác sĩ sẽ liên hệ với bạn trong thời gian sớm nhất.'
        }
        textButtonConfrim={strings.common.close}
      />
    </SafeAreaView>
  );
};

export default PackageDetail;
