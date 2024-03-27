/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icons from 'common/Icons/Icons';
import {FlatList, View, TouchableOpacity, ImageBackground} from 'react-native';
import {TextNormal, TextSemiBold, TextSmallTwelve} from 'common/Text/TextFont';
import styles from './styles';
import {
  card_pink,
  formatMoney,
  header_package,
  decorator_package,
  path_package,
} from 'assets/constans';
import Colors from 'theme/Colors';
import {NAVIGATION_PACKAGE_DETAIL} from 'navigation/routes';
import ProgressLine from 'common/ProgressLine/ProgressLine';
import Images from '../../common/Images/Images';
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
              {'Gói chăm sóc đặc biệt'}
            </TextNormal>
            <TextSemiBold style={{color: '#203A69'}}>
              {parseInt(packageItem.name.match(/\d+/)[0], 10) * 30 + ' Ngày'}
            </TextSemiBold>
          </View>
          <Images
            source={decorator_package}
            style={{height: 70, width: 130, marginLeft: 10}}
          />
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
    <ImageBackground
      imageStyle={{borderRadius: 12}}
      source={card_pink}
      style={[styles.wrapperActivePackage, {padding: 15}]}>
      {/* <View style={styles.decorationActived} /> */}
      <View style={{paddingHorizontal: 10}}>
        <TextNormal style={{paddingTop: 5, fontWeight: 'bold'}}>
          {`Chăm sóc đặc biệt ${packageItem.name.match(/\d+/)[0]} tháng`}
        </TextNormal>
        <TextSmallTwelve style={{paddingVertical: 5}}>
          {`Giá gói: ${formatMoney(packageItem.price)}`}
        </TextSmallTwelve>
        <TextSmallTwelve style={{paddingBottom: 5}}>
          {'Ngày tham gia: ' +
            convertDate(packageItem.purchased_date.substring(0, 10))}
        </TextSmallTwelve>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
          }}>
          <ProgressLine isDetailDoctor={true} line={packageItem} />
          <TextSmallTwelve
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
              color: '#4C0C23',
              paddingLeft: 10,
            }}>
            {`${totalDay - parseInt(leftDay, 10)} ngày`}
          </TextSmallTwelve>
        </View>
      </View>
    </ImageBackground>
  );
};
const convertDate = date => {
  const splited = date.split('-');
  return `${splited[2]}-${splited[1]}-${splited[0]}`;
};
const PackageItem = ({packageItem, index, navigation}) => {
  const leftDay =
    (new Date().getTime() - new Date(packageItem?.purchased_date).getTime()) /
    60000 /
    (24 * 60);
  const totalDay = packageItem.name
    ? parseInt(packageItem.name.match(/\d+/)[0], 10) * 30
    : -1;

  // FOLLOWING || REQUESTING
  return (
    <View>
      {packageItem?.product_status === 1 && (
        <ActivedPackage
          packageItem={packageItem}
          leftDay={leftDay}
          totalDay={totalDay}
        />
      )}
      {packageItem?.product_status !== 1 && (
        <AvailablePackage packageItem={packageItem} navigation={navigation} />
      )}
    </View>
  );
};

export default PackageItem;
