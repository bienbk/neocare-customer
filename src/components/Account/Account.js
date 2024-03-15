import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {NAVIGATION_LOGIN} from 'navigation/routes';
import styles from './styles';
import Feature from '../../common/Feature/Feature';
import Avatar from './Avatar';
import Colors from 'theme/Colors';
import {heightDevice, LIST_OPTION} from 'assets/constans';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import {widthDevice} from '../../assets/constans';

const IMAGE_HEIGHT = heightDevice * 0.336;

const Account = ({navigation}) => {
  const positionY = useRef(new Animated.Value(0)).current;
  const imageAnimation = {
    transform: [
      {
        translateY: positionY.interpolate({
          inputRange: [0, IMAGE_HEIGHT],
          outputRange: [0, -IMAGE_HEIGHT / 3],
          extrapolate: 'clamp',
        }),
      },
      {
        scaleY: positionY.interpolate({
          inputRange: [0, IMAGE_HEIGHT],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const opacityHeader = positionY.interpolate({
    inputRange: [IMAGE_HEIGHT * 0.2, IMAGE_HEIGHT * 0.6],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const renderFeature = list =>
    list.map((item, index) => (
      <Feature
        key={item.name}
        name={item.name}
        icon={item.icon}
        index={index}
        lastIndex={index === list.length - 1}
        navigation={navigation}
        link={item.link}
      />
    ));
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.wrapperAnimationHeader, {opacity: opacityHeader}]}>
        <View style={styles.wrapperHeaderTitle}>
          <TextMoneyBold numberOfLines={2} style={styles.textHeader}>
            {'Settings'}
          </TextMoneyBold>
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: positionY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.containerContent}>
        <Animated.View style={[styles.wrapperHeader, imageAnimation]}>
          <Avatar />
        </Animated.View>
        <TouchableOpacity style={styles.wrapperPackage}>
          <TextSemiBold>Gói chăm sóc sức khoẻ của tôi</TextSemiBold>
          <TextNormal
            style={[
              styles.labelMyPackage,
              {backgroundColor: Colors.yellowColor},
            ]}>
            {'Đã kết nối (2)'}
          </TextNormal>
        </TouchableOpacity>
        <FlatList
          data={LIST_OPTION}
          scrollEnabled={false}
          style={styles.flatlistContainer}
          keyExtractor={(_, id) => id.toString()}
          contentContainerStyle={styles.containerFlatOption}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <TextSemiBold style={styles.cardTitleFeature}>
                  {item.title}
                </TextSemiBold>
                <View style={styles.cardFeature}>
                  {renderFeature(item.items)}
                </View>
              </View>
            );
          }}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Account;
