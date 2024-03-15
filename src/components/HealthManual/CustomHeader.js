import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../../theme/Colors';
import Icons from '../../common/Icons/Icons';
import {TextSemiBold} from '../../common/Text/TextFont';
import {NAVIGATION_HOME} from '../../navigation/routes';

const CustomHeader = ({conclusion, showTextarea, title, navigation}) => {
  return (
    <View
      style={[
        styles.wrapperHeader,
        showTextarea && {justifyContent: 'center'},
      ]}>
      {!showTextarea && (
        <Icons
          type={'Fontisto'}
          name={conclusion?.icon || 'blood-drop'}
          size={28}
          color={conclusion?.color || '#d30c7b'}
        />
      )}
      <TextSemiBold style={styles.textTitle}>
        {!showTextarea ? title : 'Bạn đang cảm thấy thế nào?'}
      </TextSemiBold>
      {!showTextarea && (
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_HOME)}
          style={styles.wrapperClose}>
          <Icons type={'Feather'} name={'x'} size={20} color={'white'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  wrapperClose: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: Colors.gray.gray10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.gray.gray10,
    fontSize: 20,
  },
});
