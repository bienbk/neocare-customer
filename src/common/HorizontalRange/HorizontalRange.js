/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Icons from '../Icons/Icons';
import styles from './styles';
import {TextNormal} from '../Text/TextFont';
import { widthDevice } from '../../assets/constans';
const HorizontalRange = ({dataRange, setValue, value, type}) => {
  const refPressure = useRef(null);
  useEffect(() => {
    if (refPressure && refPressure.current) {
      refPressure.current.scrollToItem({
        item: value,
        animated: true,
        viewOffset: widthDevice / 2 - 25,
        // viewPostion: 0,
      });
    }
  }, [value]);
  const renderSlider = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setValue(item)}
        style={styles.wrapperSliderItem}>
        <View
          style={{
            height: index % 5 === 0 ? 50 : 25,
            width: item !== value ? 3 : 4,
            borderRadius: 2,
            marginBottom: index % 5 === 0 ? 10 : item === value ? 0 : 20,
            backgroundColor: item !== value ? 'lightgray' : 'blue',
          }}
        />
        {item === value && index % 5 !== 0 && (
          <View
            style={{
              marginTop: 5,
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Icons
              type={'Feather'}
              name={'navigation-2'}
              size={20}
              color={'blue'}
            />
          </View>
        )}
        {index % 5 === 0 && (
          <View>
            <TextNormal
              style={{
                color: item === value ? 'blue' : 'gray',
                fontWeight: item === value ? 'bold' : '500',
                fontSize: item === value ? 15 : 14,
              }}>
              {item}
            </TextNormal>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        // width: '100%',
        // backgroundColor: 'red',
        paddingVertical: 20,
      }}>
      <FlatList
        horizontal
        ref={refPressure}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        data={dataRange ? dataRange : []}
        renderItem={renderSlider}
        onScrollToIndexFailed={error => {
          if (dataRange && refPressure && refPressure.current) {
            refPressure.current.scrollToOffset({
              offset: error.averageItemLength * error.index,
              animated: true,
            });
          }
          setTimeout(() => {
            if (dataRange && refPressure.current) {
              refPressure.current.scrollToIndex({
                index: error.index,
                animated: true,
              });
            }
          }, 100);
        }}
      />
    </View>
  );
};

export default HorizontalRange;
