import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,

} from 'react-native';

import {
  NAVIGATION_ACCOUNT_INFO,
  NAVIGATION_ACCOUNT_ORDER_HISTORY,
  NAVIGATION_E_VOUCHER,
  NAVIGATION_LOGIN,
  NAVIGATION_FREE_SHIP,
  NAVIGATION_ACCOUNT_STATEMENT,
} from 'navigation/routes';
import Titles from '../../common/Titles/Titles';
import { TextNormal } from '../../common/Text/TextFont';
import styles from './styles';
import Feature from '../../common/Feature/Feature';
import Avatar from './Avatar';

const listFeatures = [
  {
    name: 'Lịch sử đơn hàng',
    icon: 'icon_his_donhang1',
    link: NAVIGATION_ACCOUNT_ORDER_HISTORY,
  },
  {
    name: 'Mã quà tặng',
    icon: 'icon_mail1',
    link: '',
  },
  {
    name: 'Mã giới thiệu',
    icon: 'icon_voucher1',
    link: '',
  },
  {
    name: 'Điều khoản và điều kiện',
    icon: 'icon_dieukhoan1',
    link: '',
  },
  {
    name: 'Trung tâm trợ giúp',
    icon: 'icon_support1',
    link: '',
  },
  {
    name: 'Đăng xuất',
    icon: 'icon_logout1',
    link: NAVIGATION_LOGIN,
  },
];

const Account = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Titles title={'Tài khoản'} iconLanguage={false} />
      {/* <ScrollView> */}
      <View style={styles.content}>
        <Avatar />
        <FlatList
          data={listFeatures}
          style={styles.flatlistContainer}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Feature
                key={item.name}
                name={item.name}
                icon={item.icon}
                index={index}
                navigation={navigation}
                link={item.link}
                // showModalLogin={() => setModalConfirm(true)}
                // onPress={onPressOpenVoucher}
                // user={currentUser.current}
                // codeAffiliate={messageCheckAffiliate}
              />
            );
          }}
        />
        {/* <View style={{alignItems: 'center', marginTop: 5}}>
          <TextNormal style={styles.textVersion}>Version: {version}</TextNormal>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Account;
