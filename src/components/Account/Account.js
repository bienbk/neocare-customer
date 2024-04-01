import React, {useEffect, useRef} from 'react';
import {View, SafeAreaView, FlatList, Animated} from 'react-native';

import {NAVIGATION_LOGIN} from 'navigation/routes';
import styles from './styles';
import Feature from 'common/Feature/Feature';
import Avatar from './Avatar';
import Colors from 'theme/Colors';
import {heightDevice, LIST_OPTION} from 'assets/constans';
import {useDispatch, useSelector} from 'react-redux';
import {
  TextMoneyBold,
  TextSemiBold,
  TextSmallMedium,
} from 'common/Text/TextFont';
import SuperTokens from 'supertokens-react-native';
import {getStatusGetUserInfo} from 'store/selectors';
import {getUserInfoAction, resetGetUserInfo} from 'store/user/userAction';
import Status from 'common/Status/Status';
import {CommonActions} from '@react-navigation/native';
import {asyncStorage} from 'store';
const IMAGE_HEIGHT = heightDevice * 0.336;

const Account = ({navigation}) => {
  const statusGetUser = useSelector(state => getStatusGetUserInfo(state));
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      fetchUserData();
    });
    return listener;
  }, [navigation]);
  useEffect(() => {
    if (statusGetUser === Status.SUCCESS) {
      dispatch(resetGetUserInfo());
    }
  }, [statusGetUser]);
  const fetchUserData = () => dispatch(getUserInfoAction());
  const positionY = useRef(new Animated.Value(0)).current;
  const imageAnimation = {
    transform: [
      {
        scaleY: positionY.interpolate({
          inputRange: [0, IMAGE_HEIGHT],
          outputRange: [1, 0.5],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const opacityHeader = positionY.interpolate({
    inputRange: [IMAGE_HEIGHT * 0.3, IMAGE_HEIGHT * 0.5],
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
        item={item}
        lastIndex={index === list.length - 1}
        navigation={navigation}
        logOut={handleLogout}
        link={item.link}
      />
    ));
  const handleLogout = async () => {
    await asyncStorage.clearStorage();
    await SuperTokens.signOut();
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: NAVIGATION_LOGIN}],
        }),
      );
    }, 50);
  };
  const renderFooter = () => (
    <TextSmallMedium style={{color: Colors.gray.gray60, alignSelf: 'center'}}>
      Phiên bản 1.0 build 2445
    </TextSmallMedium>
  );
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
        {/* <View style={styles.wrapperPackage}>
          <TextSemiBold>Gói chăm sóc sức khoẻ của tôi</TextSemiBold>
          <View
            style={[
              styles.labelMyPackage,
              {backgroundColor: Colors.yellowColor},
            ]}>
            <TextNormal style={[{backgroundColor: Colors.yellowColor}]}>
              {'Đã kết nối (2)'}
            </TextNormal>
          </View>
        </View> */}
        <FlatList
          data={LIST_OPTION}
          scrollEnabled={false}
          style={styles.flatlistContainer}
          keyExtractor={(_, id) => id.toString()}
          contentContainerStyle={styles.containerFlatOption}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
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
