import React, {useEffect} from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {user_example, decorator_header} from 'assets/constans';
import Images from 'common/Images/Images';
import Icons from 'common/Icons/Icons';
import {TextSmallMedium, TextSemiBold} from 'common/Text/TextFont';
import MyModal from 'common/MyModal/MyModal';
import {empty_logo} from '../../assets/constans';
import styles from './styles';
import {asyncStorage} from 'store';
import Svg from '../../common/Svg/Svg';

const CustomeHeader = () => {
  const [currentUser, setCurrentUser] = React.useState({first_name: ''});
  const [openModalNotify, setOpenModalNotify] = React.useState(false);
  useEffect(() => {
    initUser();
  }, []);
  const initUser = async () => {
    const user = await asyncStorage.getUser();
    if (user) {
      setCurrentUser(user);
    }
  };
  const onPressOpenNotify = () => {
    setOpenModalNotify(true);
  };
  const onPressOutSide = () => {
    setOpenModalNotify(false);
  };
  return (
    // <View style={styles.wrapperHeader}>
    //   <Images source={home_image} style={styles.imageBackground} />
    //   <View style={styles.wrapperTitle}>
    //     <TouchableOpacity style={styles.wrapperBellIcon}>
    //       <Icons type={'Feather'} name={'bell'} size={28} color={'black'} />
    //     </TouchableOpacity>
    //     <TextSemiBold style={styles.greetingText}>Xin chào,</TextSemiBold>
    //     <TextMoneyBold style={styles.titleText}>
    //       {'Sức khoẻ bạn\n hôm nay thế nào?'}
    //     </TextMoneyBold>
    //   </View>
    // </View>
    <ImageBackground
      source={decorator_header}
      resizeMode={'stretch'}
      style={styles.wrapperFixedHeader}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Images source={user_example} style={styles.avatarIcon} />
        <View style={{paddingHorizontal: 10}}>
          <TextSemiBold style={{fontWeight: '400'}}>
            Xin chào
            <TextSemiBold>{' ' + currentUser?.first_name}</TextSemiBold>
          </TextSemiBold>
          <TextSmallMedium>Sức khoẻ bạn hôm nay thế nào?</TextSmallMedium>
        </View>
      </View>
      <TouchableOpacity onPress={() => onPressOpenNotify()}>
        <Icons type={'Feather'} name={'bell'} size={29} color={'black'} />
      </TouchableOpacity>
      <MyModal visible={openModalNotify} onPressOutSide={onPressOutSide}>
        <View style={styles.containerEmpty}>
          <ImageBackground
            source={decorator_header}
            resizeMode={'stretch'}
            imageStyle={{borderRadius: 12}}
            style={styles.headerModal}>
            <TextSemiBold style={styles.textModal}>{'Thông báo'}</TextSemiBold>
          </ImageBackground>
          <View style={styles.modalBody}>
            <Svg name={'icon_empty'} size={100} />
            <TextSmallMedium>Danh sách thông báo trống</TextSmallMedium>
          </View>
        </View>
      </MyModal>
    </ImageBackground>
  );
};

export default CustomeHeader;
