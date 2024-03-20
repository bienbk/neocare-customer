/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icons from 'common/Icons/Icons';
import {FlatList, View, TouchableOpacity, ImageBackground} from 'react-native';
import {TextNormal, TextSemiBold, TextSmallTwelve} from 'common/Text/TextFont';
import styles from './styles';
import {card_pink, formatMoney} from 'assets/constans';
import Colors from 'theme/Colors';
import {NAVIGATION_PACKAGE_DETAIL} from 'navigation/routes';
import ProgressLine from 'common/ProgressLine/ProgressLine';
const AvailablePackage = ({packageItem, navigation}) => {
  return (
    <View style={styles.wrapperActivePackage}>
      <TextNormal style={{padding: 5, fontWeight: 'bold', color: Colors.main}}>
        {packageItem.name}
      </TextNormal>
      <FlatList
        data={packageItem?.desc ? packageItem.desc.split(',') : []}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', paddingVertical: 2}}>
            <Icons
              type={'Feather'}
              name={'check'}
              size={19}
              color={'black'}
              style={{paddingHorizontal: 5}}
            />
            <TextSmallTwelve style={{color: Colors.main}}>
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
              color: Colors.whiteColor,
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
      imageStyle={{borderRadius: 20}}
      source={card_pink}
      style={styles.wrapperActivePackage}>
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
