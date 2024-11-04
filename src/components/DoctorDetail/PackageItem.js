/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icons from 'common/Icons/Icons';
import {FlatList, View, TouchableOpacity, ImageBackground} from 'react-native';
import {TextNormal, TextSemiBold, TextSmallTwelve} from 'common/Text/TextFont';
import styles from './styles';
import {formatMoney, header_package, path_package} from 'assets/constans';
import Colors from 'theme/Colors';
import {NAVIGATION_PACKAGE_DETAIL} from 'navigation/routes';
// import ProgressLine from 'common/ProgressLine/ProgressLine';
import Images from 'common/Images/Images';
import Svg from 'common/Svg/Svg';
const PackageItem = ({packageItem, navigation}) => {
  // FOLLOWING || REQUESTING
  return (
    <View>
      {packageItem?.product_status !== 1 && (
        <View style={styles.wrapperActivePackage}>
          <ImageBackground
            source={header_package}
            imageStyle={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
            style={{height: 70, width: '100%'}}
            resizeMode={'cover'}>
            <Images
              source={path_package}
              style={{position: 'absolute', left: 0, top: 13}}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'center', width: '60%'}}>
                <TextNormal numberOfLines={2} style={styles.packageName}>
                  {`${packageItem.name}`}
                </TextNormal>
              </View>
              <Svg name={'decorator_package'} size={130} />
            </View>
          </ImageBackground>
          {/* <TextNormal style={styles.packageName}>{packageItem.name}</TextNormal> */}
          <FlatList
            style={{marginTop: 10}}
            data={packageItem?.desc ? packageItem.desc.split(',') : []}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}>
                <Icons
                  type={'Feather'}
                  name={'check'}
                  size={15}
                  color={Colors.gray.gray40}
                  style={{paddingHorizontal: 5}}
                />
                <TextNormal style={{color: Colors.gray.gray40, fontSize: 14}}>
                  {item.toString().trim()}
                </TextNormal>
              </View>
            )}
          />
          <View style={styles.wrapperFooterCard}>
            <TextSemiBold style={{color: Colors.main, fontSize: 20}}>
              {formatMoney(packageItem.price) + 'đ'}
            </TextSemiBold>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NAVIGATION_PACKAGE_DETAIL, {
                  item: packageItem,
                })
              }
              disabled={packageItem?.product_status === 2}
              style={[
                styles.buyPackageButton,
                packageItem?.product_status === 2 && {
                  backgroundColor: Colors.gray.gray80,
                },
              ]}>
              <TextNormal
                style={{
                  color: Colors.main,
                  fontWeight: 'bold',
                  opacity: packageItem?.product_status === 2 ? 0.5 : 1,
                }}>
                {packageItem?.product_status === 2 ? 'Chờ xác nhận' : 'Mua gói'}
              </TextNormal>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PackageItem;
