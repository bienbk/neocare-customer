import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default ({name, color, activeTab}) => {
  console.log(activeTab);
  return (
    <TouchableOpacity>
      <View style={[styles.container, activeTab && styles.activeTab]}>
        <Text style={[styles.text, {color}]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: 'black',
    borderRadius: 16,
  },
  container: {
    height: 40,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: 'UberMoveRegular',
  },
});
