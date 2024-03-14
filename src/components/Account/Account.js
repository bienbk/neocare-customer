import React, {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';

import {
  NAVIGATION_ACCOUNT_INFO,
  NAVIGATION_ACCOUNT_ORDER_HISTORY,
  NAVIGATION_E_VOUCHER,
  NAVIGATION_LOGIN,
  NAVIGATION_FREE_SHIP,
  NAVIGATION_ACCOUNT_STATEMENT,
} from 'navigation/routes';
import Titles from '../../common/Titles/Titles';
import {TextNormal, TextSemiBold} from '../../common/Text/TextFont';
import styles from './styles';
import Feature from '../../common/Feature/Feature';
import Avatar from './Avatar';
import Colors from 'theme/Colors';

const listFeatures = [
  {
    name: 'Hồ sơ',
    icon: 'icon_user',
    link: '',
  },
  {
    name: 'Thông tin thân nhân',
    icon: 'icon_profile',
    link: '',
  },
  // {
  //   name: 'Mã giới thiệu',
  //   icon: '',
  //   link: '',
  // },
  // {
  //   name: 'Điều khoản và điều kiện',
  //   icon: '',
  //   link: '',
  // },
  // {
  //   name: 'Trung tâm trợ giúp',
  //   icon: '',
  //   link: '',
  // },
  // {
  //   name: 'Đăng xuất',
  //   icon: '',
  //   link: NAVIGATION_LOGIN,
  // },
];

const listFeaturesDown = [
  {
    name: 'Ngôn ngữ',
    icon: 'icon_language',
    link: '',
  },
  {
    name: 'Hotline 0901234567',
    icon: 'icon_hotline',
    link: '',
  },
  {
    name: 'Chính sách và quyền riêng tư',
    icon: 'icon_policy',
    link: '',
  },
  {
    name: 'Đăng xuất',
    icon: 'icon_logout_red',
    link: NAVIGATION_LOGIN,
  },
];

const Account = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Titles title={'Tài khoản'} iconLanguage={false} /> */}
      {/* <ScrollView> */}
      <View style={styles.content}>
        <View style={styles.content1}>
          <Avatar />
        </View>
        <View style={styles.content2}>
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
        </View>
        {/* <View style={styles.content2} /> */}
        <View style={{marginLeft: 16}}>
          <TextSemiBold style={{color: Colors.textInkColor}}>
            {'Hỗ trợ và cài đặt'}
          </TextSemiBold>
        </View>
        <View style={styles.content3}>
          <FlatList
            data={listFeaturesDown}
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
        </View>
        {/* <View style={{alignItems: 'center', marginTop: 5}}>
          <TextNormal style={styles.textVersion}>Version: {version}</TextNormal>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Account;
