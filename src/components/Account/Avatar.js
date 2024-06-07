import {TextNormal, TextSemiBold} from 'common/Text/TextFont';
import React, {useEffect} from 'react';
import {StyleSheet, RefreshControl, View, ScrollView} from 'react-native';
import Colors from 'theme/Colors';
import {heightDevice, widthDevice} from 'assets/constans';
import {asyncStorage} from 'store';
import Svg from 'common/Svg/Svg';
import Images from '../../common/Images/Images';

const Avatar = ({}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = React.useState({id: -1, username: ''});
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  const getUserStorage = async () => {
    const userStore = (await asyncStorage.getUser()) || {id: -1};
    console.log('User store: ', userStore);
    setUser(userStore);
  };

  // getUserStorage();
  useEffect(() => {
    getUserStorage();
  }, []);
  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  }, [refreshing]);

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          {/* <Svg name={'avatar_default'} size={90} style={styles.image} /> */}
          {user?.avarta && user?.avarta.length > 0 ? (
            <Images source={{uri: user?.avarta}} style={styles.image} />
          ) : (
            <Svg name={'avatar_default'} size={82} style={styles.image} />
          )}
        </View>
        <View style={styles.textBalance}>
          <TextSemiBold style={{color: Colors.whiteColor, fontSize: 24}}>
            {user.first_name !== ''
              ? user.last_name + ' ' + user.first_name
              : 'Username'}
          </TextSemiBold>
        </View>
        <View style={styles.label}>
          <TextNormal style={{fontSize: 16, color: Colors.whiteColor}}>{user?.phone}</TextNormal>
        </View>
      </ScrollView>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  label: {
    // backgroundColor: Colors.whiteColor,
    // paddingHorizontal: 10,
    paddingBottom: 5,
    borderRadius: 16,
  },

  containerInfo: {
    width: '50%',
    alignItems: 'center',
    marginRight: 10,
  },
  container: {
    marginTop: 20,
    width: widthDevice,
    alignItems: 'center',
  },
  content: {
    borderWidth: 2,
    borderColor: Colors.primary,
    width: 90,
    backgroundColor: Colors.main,
    marginTop: 5,
    height: 90,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 88,
    height: 88,
    // borderRadius: 90,
    // color: '#FFC51B',
  },
  textBalance: {
    // height: 69,
    marginTop: 5,
    marginBottom: 5,
  },
});
