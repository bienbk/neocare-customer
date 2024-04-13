import React from 'react';
import {FlatList, SafeAreaView, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {
  heightDevice,
  product_example,
  widthDevice,
} from '../../assets/constans';
import Colors from '../../theme/Colors';
import {
  TextNormal,
  TextNormalSemiBold,
  TextSemiBold,
  TextSmallMedium,
} from '../../common/Text/TextFont';
import Svg from '../../common/Svg/Svg';
import Images from '../../common/Images/Images';

const MyPharmacy = () => {
  const renderPharmacyItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          paddingVertical: 5,
          borderBottomWidth: 1.5,
          borderStyle: 'dashed',
          borderBottomColor: Colors.gray.gray90,
        }}>
        <Svg name={'icon_pharmacy'} size={60} />
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}>
          <TextNormalSemiBold style={{fontWeight: 'bold', fontSize: 14}}>
            {'Bệnh viện Bạch Mai'}
          </TextNormalSemiBold>
          <TextNormal style={{paddingVertical: 3, color: Colors.gray.gray60}}>
            {'123 Điện Biên Phủ P. Đa Kao Q.1 TP.HCM'}
          </TextNormal>
          <TextNormal style={{color: Colors.blue.blue40, fontWeight: 'bold'}}>
            {'Xem bản đồ'}
          </TextNormal>
        </View>
      </View>
    );
  };
  const renderProductItem = ({item, index}) => {
    return (
      <View
        style={{
          marginRight: 5,
          backgroundColor: Colors.whiteColor,
          width: (150 / 390) * widthDevice,
          height: 200,
          borderRadius: 12,
        }}>
        <Images
          source={product_example}
          style={{
            width: '100%',
            height: 109,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <TextNormalSemiBold
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          {'Now Chromium Picolinate'}
        </TextNormalSemiBold>
        <TextSmallMedium style={{paddingHorizontal: 10}}>
          {'Thành phần: CoQ10 (Ubiquinone), tá dược'}
        </TextSmallMedium>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={{height: heightDevice * 0.2, backgroundColor: Colors.main}}>
        <TextSemiBold
          style={{
            fontSize: 24,
            color: Colors.whiteColor,
            paddingLeft: 15,
            marginTop: 30,
          }}>
          Nhà thuốc của tôi
        </TextSemiBold>
      </View>
      {/* PHARMACY */}
      <ScrollView
        style={{
          borderRadius: 12,
          marginTop: -60,
          // marginHorizontal: 15,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <FlatList
            keyExtractor={i => i}
            data={[...Array(2).keys()]}
            renderItem={renderPharmacyItem}
          />
        </View>

        {/* PRODUCT */}
        <TextSemiBold style={{paddingVertical: 10, marginTop: 5}}>
          {'Sản phẩm hỗ trợ sức khoẻ'}
        </TextSemiBold>
        <FlatList
          data={[...Array(5).keys()]}
          keyExtractor={i => i}
          horizontal
          contentContainerStyle={{marginVertical: 5}}
          showsHorizontalScrollIndicator={false}
          renderItem={renderProductItem}
        />
        {/* MEDICAL DEVICES */}
        <TextSemiBold style={{paddingVertical: 10, marginTop: 5}}>
          {'Dụng cụ y tế'}
        </TextSemiBold>
        <FlatList
          data={[...Array(5).keys()]}
          keyExtractor={i => i}
          horizontal
          contentContainerStyle={{marginVertical: 5}}
          showsHorizontalScrollIndicator={false}
          renderItem={renderProductItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPharmacy;
