import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallMedium,
  TextSmallTwelve,
} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import Svg from '../../common/Svg/Svg';
import {NAVIGATION_DOCTOR_DETAIL, NAVIGATION_MY_DOCTOR} from '../../navigation/routes';
import {formatMoney, heightDevice, widthDevice} from '../../assets/constans';
import ConfirmationModal from '../../common/ConfirmationModal/ConfirmationModal';
import strings from '../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {selectorStatusBuyPackage} from '../../store/order/orderSelector';
import {
  actionBuyPackage,
  actionResetBuyPackage,
} from '../../store/order/orderAction';
import Status from '../../common/Status/Status';
import CustomButton from '../../common/CustomButton/CustomButton';

const PackageDetail = ({navigation, route}) => {
  const [currentPackge, setCurrentPackge] = useState(null);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const {item} = route.params || {};
    console.log('item:::', item);
    setCurrentPackge(item);
  }, [navigation]);
  const statusBuyPackage = useSelector(state =>
    selectorStatusBuyPackage(state),
  );
  const handleBuyPackage = () => {
    if (!currentPackge) {
      return;
    }
    const body = {
      items: [
        {
          product_id: currentPackge?.product_id,
          quantity: 1,
        },
      ],
      customer_id: 7,
    };
    dispatch(actionBuyPackage(body));
  };

  useEffect(() => {
    if (statusBuyPackage === Status.SUCCESS) {
      setModal(true);
    }
  }, [statusBuyPackage]);
  const confirmSendingRequest = () => {
    dispatch(actionResetBuyPackage());
    setModal(false);
    navigation && navigation.navigate(NAVIGATION_MY_DOCTOR);
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View
        style={{
          flex: 1,
          padding: 15,
          backgroundColor: Colors.backgroundColor,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_DOCTOR_DETAIL)}
          style={styles.closeIcon}>
          <Icons
            type={'Feather'}
            name={'arrow-left'}
            size={20}
            color={'black'}
          />
        </TouchableOpacity>
        <View style={{marginTop: heightDevice * 0.06, alignItems: 'center'}}>
          <TextSemiBold style={{paddingBottom: 24, fontSize: 20}}>
            {currentPackge ? currentPackge?.name : ''}
          </TextSemiBold>
          <View style={styles.wrapperContentCard}>
            <View style={styles.contentLine}>
              <TextNormal style={{color: Colors.gray.gray60}}>
                Hiệu lực từ
              </TextNormal>
              <TextNormal>Ngày yêu cầu được xác nhận</TextNormal>
            </View>
            <View style={styles.contentLine}>
              <TextNormal style={{color: Colors.gray.gray60}}>
                Thời hạn gói
              </TextNormal>
              <TextNormal>{`${parseInt(
                currentPackge?.name.match(/\d+/)[0],
                10,
              )} tháng`}</TextNormal>
            </View>
            <View style={styles.contentLine}>
              <TextNormal style={{color: Colors.gray.gray60}}>
                Thanh toán
              </TextNormal>
              <TextNormal>Tiền mặt</TextNormal>
            </View>
            <View style={styles.wrapperPaymentLine}>
              <TextNormalSemiBold>Tổng</TextNormalSemiBold>
              <TextNormal style={{fontWeight: 'bold', fontSize: 17}}>
                {formatMoney(currentPackge?.price) + 'đ'}
              </TextNormal>
            </View>
          </View>
          <TextSmallTwelve style={styles.warningText}>
            *Sau khi gửi yêu cầu mua gói bác sĩ sẽ liên hệ với bạn sớm nhất có
            thể.
          </TextSmallTwelve>
        </View>

        {/* <TouchableOpacity
          onPress={() => handleBuyPackage()}
          style={styles.sendButton}>
          <TextSemiBold style={{color: Colors.whiteColor}}>
            Gửi yêu cầu
          </TextSemiBold>
        </TouchableOpacity> */}
        <CustomButton
          onPress={() => handleBuyPackage()}
          label={'Gửi yêu cầu'}
        />
      </View>
      <ConfirmationModal
        isConfriming={true}
        isOpen={modal}
        onConfirm={confirmSendingRequest}
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
