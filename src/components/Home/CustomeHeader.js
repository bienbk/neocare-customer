import React, {useEffect} from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {decorator_header} from 'assets/constans';
import Icons from 'common/Icons/Icons';
import {TextSmallMedium, TextSemiBold} from 'common/Text/TextFont';
import MyModal from 'common/MyModal/MyModal';
import {header_home} from 'assets/constans';
import styles from './styles';
import {asyncStorage} from 'store';
import Svg from 'common/Svg/Svg';
import Colors from 'theme/Colors';
import {TextNormal} from 'common/Text/TextFont';
import Images from '../../common/Images/Images';

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
    <ImageBackground
      source={header_home}
      resizeMode={'stretch'}
      style={styles.wrapperFixedHeader}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 17}}>
        <View style={styles.borderAvatar}>
          {/* <Svg name={'avatar_default'} size={45} style={styles.avatarIcon} /> */}
          {currentUser?.avarta && currentUser?.avarta.length > 0 ? (
            <Images
              source={{uri: currentUser?.avarta}}
              style={styles.avatarIcon}
            />
          ) : (
            <Svg name={'avatar_default'} size={45} style={styles.imageDoctor} />
          )}
        </View>

        <View style={{paddingHorizontal: 10}}>
          <TextNormal style={{color: Colors.whiteColor, fontSize: 16}}>
            Xin chào
            <TextSemiBold style={{color: Colors.whiteColor}}>
              {' ' + currentUser?.first_name}
            </TextSemiBold>
          </TextNormal>
          <TextSmallMedium style={{color: Colors.whiteColor}}>
            Sức khoẻ bạn hôm nay thế nào?
          </TextSmallMedium>
        </View>
      </View>
      <TouchableOpacity
        style={{position: 'absolute', top: 17, right: 15, zIndex: 100}}
        onPress={() => onPressOpenNotify()}>
        <Icons type={'Feather'} name={'bell'} size={29} color={'white'} />
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
