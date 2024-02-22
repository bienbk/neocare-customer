import React from 'react';
import Icons from '../../common/Icons/Icons';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
} from '../../common/Text/TextFont';
import styles from './styles';
import {formatMoney} from '../../assets/constans';
import Colors from '../../theme/Colors';
import {NAVIGATION_PACKAGE_DETAIL} from '../../navigation/routes';
import ProgressLine from '../../common/ProgressLine/ProgressLine';

const PackageItem = ({item, index, navigation}) => {
  if (item % 2 === 0) {
    return (
      <View style={styles.wrapperActivePackage}>
        <View style={styles.decorationActived} />
        <View style={{paddingHorizontal: 10}}>
          <TextSemiBold style={{paddingTop: 5}}>
            {`Chăm sóc đặc biệt ${(index + 1) * 6} tháng`}
          </TextSemiBold>
          <TextNormal style={{paddingVertical: 5}}>
            Giá gói: 2.500.000đ
          </TextNormal>
          <TextNormal style={{paddingBottom: 5}} >Ngày tham gia: 18/02/2024</TextNormal>
          <ProgressLine isDetailDoctor={true} />
          <TextNormal
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
              color: Colors.red.red50,
            }}>
            250 ngày
          </TextNormal>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.wrapperCardPackage}>
      <View style={styles.decoration} />

      <TextSemiBold style={{padding: 5}}>
        {`Chăm sóc đặc biệt ${(index + 1) * 6} tháng`}
      </TextSemiBold>
      <FlatList
        data={[1, 3, 4]}
        renderItem={() => (
          <View style={{flexDirection: 'row', paddingVertical: 4}}>
            <Icons
              type={'Feather'}
              name={'check'}
              size={19}
              color={'black'}
              style={{paddingHorizontal: 5}}
            />
            <TextNormalSemiBold>
              Kiểm tra sức khoẻ dựa theo chỉ số hằng tuần
            </TextNormalSemiBold>
          </View>
        )}
      />
      <View style={styles.wrapperFooterCard}>
        <TextSemiBold style={{color: Colors.blue.blue20}}>
          {formatMoney((index + 1) * 2500000) + 'đ'}
        </TextSemiBold>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_PACKAGE_DETAIL)}
          style={styles.buyPackageButton}>
          <TextSemiBold style={{color: Colors.whiteColor}}>
            Mua gói
          </TextSemiBold>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PackageItem;
