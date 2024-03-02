import React from 'react';
import Icons from '../../common/Icons/Icons';
import {FlatList, View, TouchableOpacity, ImageBackground} from 'react-native';
import {
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallTwelve,
} from '../../common/Text/TextFont';
import styles from './styles';
import {card_blue, card_pink, formatMoney} from '../../assets/constans';
import Colors from '../../theme/Colors';
import {NAVIGATION_PACKAGE_DETAIL} from '../../navigation/routes';
import ProgressLine from '../../common/ProgressLine/ProgressLine';

const PackageItem = ({item, index, navigation, order}) => {
  if (item?.product_status === 1) {
    const leftDay =
      (new Date().getTime() - new Date(order?.purchased_date).getTime()) /
      60000 /
      (24 * 60);
    const totalDay =
      order && order.name ? parseInt(order.name.match(/\d+/)[0], 10) * 30 : -1;

    const convertDate = date => {
      const splited = date.split('-');
      return `${splited[2]}-${splited[1]}-${splited[0]}`;
    };
    return (
      <ImageBackground
        imageStyle={{borderRadius: 20}}
        source={card_pink}
        style={styles.wrapperActivePackage}>
        {/* <View style={styles.decorationActived} /> */}
        <View style={{paddingHorizontal: 10}}>
          <TextNormal style={{paddingTop: 5, fontWeight: 'bold'}}>
            {`Chăm sóc đặc biệt ${(index + 1) * 6} tháng`}
          </TextNormal>
          <TextSmallTwelve style={{paddingVertical: 5}}>
            {`Giá gói: ${formatMoney(item.price)}`}
          </TextSmallTwelve>
          <TextSmallTwelve style={{paddingBottom: 5}}>
            {'Ngày tham gia: ' + convertDate(order.purchased_date.substring(0, 10))}
          </TextSmallTwelve>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <ProgressLine isDetailDoctor={true} line={order} />
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
  }
  return (
    <ImageBackground
      imageStyle={{borderRadius: 20}}
      source={card_blue}
      style={styles.wrapperActivePackage}>
      <TextNormal style={{padding: 5, fontWeight: 'bold'}}>
        {item.name}
      </TextNormal>
      <FlatList
        data={[1, 3, 4]}
        renderItem={() => (
          <View style={{flexDirection: 'row', paddingVertical: 2}}>
            <Icons
              type={'Feather'}
              name={'check'}
              size={19}
              color={'black'}
              style={{paddingHorizontal: 5}}
            />
            <TextSmallTwelve>
              Kiểm tra sức khoẻ dựa theo chỉ số hằng tuần
            </TextSmallTwelve>
          </View>
        )}
      />
      <View style={styles.wrapperFooterCard}>
        <TextSemiBold style={{color: '#2544BD'}}>
          {formatMoney(item.price) + 'đ'}
        </TextSemiBold>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_PACKAGE_DETAIL)}
          style={[
            styles.buyPackageButton,
            item?.product_status === 0 && {backgroundColor: Colors.gray.gray80},
          ]}>
          <TextNormal
            style={{
              color:
                item?.product_status === 0
                  ? Colors.buttonBackground
                  : Colors.whiteColor,
              fontWeight: 'bold',
              opacity: item?.product_status === 0 ? 0.5 : 1,
            }}>
            {item?.product_status === 0 ? 'Chờ xác nhận' : 'Mua gói'}
          </TextNormal>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PackageItem;
