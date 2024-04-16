import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {heightDevice} from 'assets/constans';
import Colors from 'theme/Colors';
import {TextSemiBold} from 'common/Text/TextFont';
import StoreList from './StoreList';
import ProductList from './ProductList';
import Icons from 'common/Icons/Icons';
import {NAVIGATION_ACCOUNT} from 'navigation/routes';

const MyPharmacy = ({navigation}) => {
  const renderPharmacyItem = ({item, index}) => {
    return <StoreList />;
  };
  const renderProductItem = ({item, index}) => {
    return <ProductList />;
  };
  const onBack = () => {
    navigation && navigation.navigate(NAVIGATION_ACCOUNT);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={{height: heightDevice * 0.2, backgroundColor: Colors.main}}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Icons
            type={'Ionicons'}
            name={'arrow-back'}
            size={24}
            color={'white'}
          />
        </TouchableOpacity>
        <TextSemiBold style={styles.textTitleHeader}>
          Nhà thuốc của tôi
        </TextSemiBold>
      </View>
      {/* PHARMACY */}
      <ScrollView style={styles.containerScrollView}>
        <View style={styles.wrapperListStore}>
          <FlatList
            keyExtractor={i => i}
            data={[...Array(2).keys()]}
            renderItem={renderPharmacyItem}
          />
        </View>

        {/* PRODUCT */}
        <TextSemiBold style={styles.textTitleList}>
          {'Sản phẩm hỗ trợ sức khoẻ'}
        </TextSemiBold>
        <FlatList
          data={[...Array(5).keys()]}
          keyExtractor={i => i}
          horizontal
          // contentContainerStyle={{marginVertical: 5}}
          showsHorizontalScrollIndicator={false}
          renderItem={renderProductItem}
        />
        {/* MEDICAL DEVICES */}
        <TextSemiBold style={styles.textTitleList}>
          {'Dụng cụ y tế'}
        </TextSemiBold>
        <FlatList
          data={[...Array(5).keys()]}
          keyExtractor={i => i}
          horizontal
          contentContainerStyle={styles.wrapperList}
          showsHorizontalScrollIndicator={false}
          renderItem={renderProductItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPharmacy;
