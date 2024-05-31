import {TextNormalSemiBold, TextSemiBold} from 'common/Text/TextFont';
import React, {useEffect} from 'react';
import {StyleSheet, RefreshControl, View, ScrollView} from 'react-native';
import Colors from 'theme/Colors';
import {heightDevice, widthDevice} from 'assets/constans';
import {asyncStorage} from 'store';
import Svg from 'common/Svg/Svg';

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
          <Svg name={'avatar_default'} size={90} style={styles.image} />
        </View>
        <View style={styles.textBalance}>
          <TextSemiBold style={{color: Colors.whiteColor}}>
            {user.first_name !== ''
              ? user.last_name + ' ' + user.first_name
              : 'Username'}
          </TextSemiBold>
        </View>
        <View style={styles.label}>
          <TextNormalSemiBold>{user?.phone}</TextNormalSemiBold>
        </View>
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
    height: heightDevice * 0.336 * 0.35 + 10,
    borderRadius: 92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: heightDevice * 0.336 * 0.35,
    borderRadius: 90,
    // color: '#FFC51B',
  },
  textBalance: {
    // height: 69,
    marginTop: 5,
    marginBottom: 5,
  },
});
