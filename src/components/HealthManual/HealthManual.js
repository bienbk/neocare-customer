import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView} from 'react-native';
import styles from './styles';
import BloodPressure from './BloodPressure';
import BloodSugar from './BloodSugar';
import Cholesterol from './Cholesterol';
import HbA1c from './HbA1c';
import AxitUric from './AxitUric';
import Weight from './Weight';
import {asyncStorage} from 'store';
import {listDoctorSelector} from 'store/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {heightDevice} from 'assets/constans';
import MyModal from 'common/MyModal/MyModal';
import WarningContainer from './WarningContainer';
import {NAVIGATION_HOME} from 'navigation/routes';
import {
  statusSendServiceSelector,
  errorSendServiceSelector,
} from 'store/selectors';
import {sendServiceAction, resetSendService} from 'store/actions';
import Status from 'common/Status/Status';
const HealthManual = ({navigation, route}) => {
  const dispatch = useDispatch();
  // 1 - HUYET AP, 2 - DUONG HUYET, 3 - MO MAU, 4 - HbA1c
  const [typeManual, setTypeManual] = useState(-1);
  const [currentUser, setCurrentUser] = useState({});
  const [warningModal, setWarningModal] = useState(false);
  const listDoctors = useSelector(state => listDoctorSelector(state));
  const statusSendService = useSelector(state =>
    statusSendServiceSelector(state),
  );
  const errorSendService = useSelector(state =>
    errorSendServiceSelector(state),
  );
  useEffect(() => {
    if (statusSendService === Status.SUCCESS) {
      dispatch(resetSendService());
      navigation.navigate(NAVIGATION_HOME);
    }
  }, [statusSendService]);
  const getUserInfo = async () => {
    const temp = await asyncStorage.getUser();
    if (temp) {
      setCurrentUser(temp);
    }
  };
  useEffect(() => {
    const {id} = route.params;
    setTypeManual(id);
    getUserInfo();
  }, []);
  const transitionModal = new Animated.Value(heightDevice);
  React.useEffect(() => {
    if (warningModal) {
      animatedAction(transitionModal);
    }
  }, [warningModal]);
  const animatedAction = val => {
    Animated.timing(val, {
      duration: 700,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const handleSendService = () => {
    if (
      listDoctors.length === 0 ||
      !listDoctors[0].package_items ||
      !currentUser
    ) {
      return;
    }
    const body = {
      doctor_id: listDoctors.length ? listDoctors[0].doctor.id : -1,
      patient_id: currentUser?.id,
      product_id:
        listDoctors.length && listDoctors[0]?.package_items
          ? listDoctors[0].package_items[0].product_id
          : -1,
      status: 1,
    };
    dispatch(sendServiceAction(body));
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      {typeManual === 1 && (
        <BloodPressure
          navigation={navigation}
          setWarningModal={v => setWarningModal(v)}
        />
      )}
      {typeManual === 2 && (
        <BloodSugar
          navigation={navigation}
          setWarningModal={v => setWarningModal(v)}
        />
      )}
      {typeManual === 3 && (
        <Cholesterol
          navigation={navigation}
          setWarningModal={v => setWarningModal(v)}
        />
      )}
      {typeManual === 4 && (
        <HbA1c
          navigation={navigation}
          setWarningModal={v => setWarningModal(v)}
        />
      )}
      {typeManual === 5 && (
        <AxitUric
          navigation={navigation}
          setWarningModal={v => setWarningModal(v)}
        />
      )}
      {typeManual === 6 && <Weight navigation={navigation} />}
      <MyModal visible={warningModal} onPressOutSide={() => {}}>
        <Animated.View
          style={[
            styles.modalView,
            {transform: [{translateY: transitionModal}]},
          ]}>
          <WarningContainer
            error={errorSendService}
            onSending={handleSendService}
            title={'Chỉ số vừa nhập của bạn cao'}
            onSkip={() => navigation.navigate(NAVIGATION_HOME)}
          />
        </Animated.View>
      </MyModal>
    </SafeAreaView>
  );
};

export default HealthManual;
