/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icons from 'common/Icons/Icons';
import {FlatList, View, TouchableOpacity, ImageBackground} from 'react-native';
import {TextNormal, TextSemiBold, TextSmallTwelve} from 'common/Text/TextFont';
import styles from './styles';
import {formatMoney, header_package, path_package} from 'assets/constans';
import Colors from 'theme/Colors';
import {NAVIGATION_PACKAGE_DETAIL} from 'navigation/routes';
import ProgressLine from 'common/ProgressLine/ProgressLine';
import Images from 'common/Images/Images';
import Svg from 'common/Svg/Svg';
const AvailablePackage = ({packageItem, navigation}) => {
  return (
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
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <TextNormal style={styles.packageName}>
              {`${packageItem.name}`}
            </TextNormal>
            {/* <TextSemiBold style={{color: '#203A69'}}>
              {`${packageItem.name.match(/\d+/)[0]}`}
            </TextSemiBold> */}
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
            <TextSmallTwelve style={{color: Colors.gray.gray40}}>
              {item.toString().trim()}
            </TextSmallTwelve>
          </View>
        )}
      />
      <View style={styles.wrapperFooterCard}>
        <TextSemiBold style={{color: Colors.main}}>
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
  );
};
const ActivedPackage = ({packageItem, leftDay, totalDay}) => {
  return (
    <View
      style={[
        styles.wrapperActivePackage,
        {padding: 10, marginVertical: 10, backgroundColor: '#FFF4D1'},
      ]}>
      {/* <View style={styles.decorationActived} /> */}
      <View style={{paddingHorizontal: 20, marginLeft: 5}}>
        <TextNormal style={{paddingTop: 5, fontWeight: 'bold', fontSize: 14}}>
          {packageItem.name}
        </TextNormal>
        <TextSmallTwelve style={{paddingVertical: 2}}>
          {'Ngày tham gia: '}
          <TextSmallTwelve style={{fontWeight: 'bold'}}>
            {convertDate(packageItem.purchased_date.substring(0, 10))}
          </TextSmallTwelve>
        </TextSmallTwelve>
        <TextSmallTwelve style={{paddingVertical: 2}}>
          {'Thời hạn còn lại: '}
          <TextSmallTwelve style={{fontWeight: 'bold'}}>
            {totalDay}
          </TextSmallTwelve>
        </TextSmallTwelve>
        <TextSmallTwelve style={{paddingVertical: 2}}>
          {'Số lần tư vấn: '}
          <TextSmallTwelve style={{fontWeight: 'bold'}}>{0}</TextSmallTwelve>
        </TextSmallTwelve>
      </View>
      <Icons
        type={'FontAwesome'}
        name={'check-square'}
        size={20}
        color={Colors.primary}
        style={{position: 'absolute', top: 15, left: 10}}
      />
    </View>
  );
};
const convertDate = date => {
  const splited = date.split('-');
  return `${splited[2]}-${splited[1]}-${splited[0]}`;
};
const PackageItem = ({packageItem, index, navigation}) => {
  const leftDay =
    (new Date().getTime() -
      (packageItem?.purchased_date.startsWith('0')
        ? new Date().getTime()
        : new Date(packageItem?.purchased_date).getTime())) /
    60000 /
    (24 * 60);
  const totalDay =
    packageItem.name && parseInt(packageItem.name.match(/\d+/)[0], 10) <= 12
      ? `${parseInt(packageItem.name.match(/\d+/)[0], 10)} tháng`
      : `${parseInt(packageItem.name.match(/\d+/)[0], 10)} ngày`;
  // FOLLOWING || REQUESTING
  return (
    <View>
      {packageItem?.product_status === 1 && (
        <View>
          {/* <TextSemiBold style={styles.titleListPackage}>
            Gói đang sử dụng
          </TextSemiBold> */}
          <ActivedPackage
            packageItem={packageItem}
            leftDay={leftDay}
            totalDay={totalDay}
          />
        </View>
      )}
      {packageItem?.product_status !== 1 && (
        <View>
          {/* <TextSemiBold style={styles.titleListPackage}>
            Gói dịch vụ đặc biệt
          </TextSemiBold> */}
          <AvailablePackage packageItem={packageItem} navigation={navigation} />
        </View>
      )}
    </View>
  );
};

export default PackageItem;
