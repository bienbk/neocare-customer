import {user_example} from 'assets/constans';
import Images from 'common/Images/Images';
import {TextNormalSemiBold, TextSemiBold} from 'common/Text/TextFont';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Colors from 'theme/Colors';
import {heightDevice, widthDevice} from '../../assets/constans';
import {asyncStorage} from '../../store';

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
          <Images source={user_example} style={styles.image} />
        </View>
        <View style={styles.textBalance}>
          <TextSemiBold style={{color: Colors.whiteColor}}>
            {user.first_name !== ''
              ? user.first_name + ' ' + user.last_name
              : 'Username'}
          </TextSemiBold>
        </View>
        <TextNormalSemiBold style={styles.label}>
          {user?.phone}
        </TextNormalSemiBold>
      </ScrollView>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  label: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    width: 92,
    backgroundColor: Colors.gray.gray90,
    height: 92,
    borderRadius: 92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90,
    // color: '#FFC51B',
  },
  textBalance: {
    // height: 69,
    marginTop: 5,
    marginBottom: 5,
  },
});
