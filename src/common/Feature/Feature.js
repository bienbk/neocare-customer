import {widthDevice} from 'assets/constans';
import Icons from 'common/Icons/Icons';
import {TextNormal} from 'common/Text/TextFont';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from 'theme/Colors';
import Svg from 'common/Svg/Svg';
const Feature = ({icon, name, navigation, link, onPress, index, lastIndex}) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={() => {}}>
      <View style={[styles.content, lastIndex && {borderBottomWidth: 0}]}>
        <View style={{flexDirection: 'row'}}>
          <Svg name={icon} size={16} color={Colors.textGrayColor} />
          {name === 'Đăng xuất' ? (
            <TextNormal style={styles.textLogout}>Đăng xuất</TextNormal>
          ) : (
            <TextNormal style={styles.textName}>{name}</TextNormal>
          )}
        </View>
        {name === 'Đăng xuất' ? null : (
          <Svg
            name={'icon_right_arrow'}
            size={16}
            color={Colors.textGrayColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Feature;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.pinkColor,
    flexDirection: 'row',
    width: widthDevice - 60,
    justifyContent: 'space-between',
    alignItems: 'center',

    height: 60,
    borderBottomColor: Colors.gray.gray95,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
    width: '100%',
  },
  textName: {
    // marginTop: 20,
    textAlign: 'center',
    marginLeft: 10,
  },
  textLogout: {
    // position: 'absolute',
    // marginLeft: widthDevice / 2 - 55,
    marginLeft: 10,
    color: '#EF0000',
  },
});
