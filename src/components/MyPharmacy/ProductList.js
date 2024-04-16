import React from 'react';
import {styles} from './styles';
import {product_example} from 'assets/constans';
import {View} from 'react-native';
import Images from 'common/Images/Images';
import {TextSmallMedium, TextNormalSemiBold} from 'common/Text/TextFont';

const ProductList = () => {
  return (
    <View style={styles.wrapperProductItem}>
      <Images source={product_example} style={styles.productImage} />
      <TextNormalSemiBold style={styles.productName}>
        {'Now Chromium Picolinate'}
      </TextNormalSemiBold>
      <TextSmallMedium style={{paddingHorizontal: 10}}>
        {'Thành phần: CoQ10 (Ubiquinone), tá dược'}
      </TextSmallMedium>
    </View>
  );
};

export default ProductList;
