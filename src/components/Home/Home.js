/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  TextMoneyBold,
  TextNormal,
  TextSemiBold,
} from '../../common/Text/TextFont';
import Icons from '../../common/Icons/Icons';
import Colors from '../../theme/Colors';
import Svg from '../../common/Svg/Svg';

const data = [
  {
    id: 1,
    desease: 'Huyết Áp',
    status: 'Bình thuờng',
    created: new Date().toLocaleString('en-GB').replaceAll('/', '-'),
    value: '120/80',
    subVal: 80,
    unit: '',
    icon: 'icon_heart_line',
  },
  {
    id: 2,
    desease: 'Đuờng Huyết',
    status: 'Bình thuờng',
    created: new Date().toLocaleString('en-GB').replaceAll('/', '-'),
    value: '120',
    subVal: 0,
    unit: 'mg/dL',
    icon: 'icon_sugar_line',
  },
  {
    id: 3,
    desease: 'HbA1c',
    status: 'Cao',
    created: new Date().toLocaleString('en-GB').replaceAll('/', '-'),
    value: '6',
    subVal: 0,
    unit: '%',
  },
  {
    id: 3,
    desease: 'Cholesterols',
    status: 'Cao',
    created: new Date().toLocaleString('en-GB').replaceAll('/', '-'),
    value: '250',
    subVal: 0,
    unit: 'mg/dL',
  },
];
const Home = ({navigation}) => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const FooterFlatList = () => (
    <View style={styles.containerListFooter}>
      <View style={styles.wrapperWeightHeight}>
        <TextSemiBold style={styles.titleWeightHeight}>Chiều cao</TextSemiBold>
        <TextSemiBold style={styles.textWeightHeight}>120 cm</TextSemiBold>
      </View>
      <View style={styles.wrapperWeightHeight}>
        <TextSemiBold style={styles.titleWeightHeight}>Cân nặng</TextSemiBold>
        <TextSemiBold style={styles.textWeightHeight}>40 kg</TextSemiBold>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={{flex: 1, padding: 10}}>
        <View style={styles.wrapperTitle}>
          <TextMoneyBold>NEO CARE</TextMoneyBold>
          <View style={styles.wrapperIconSection}>
            <TouchableOpacity>
              <Icons type={'Feather'} name={'bell'} size={25} color={'black'} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icons
                type={'Feather'}
                name={'plus-circle'}
                size={25}
                style={styles.iconPlus}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, paddingVertical: 5}}>
          <FlatList
            data={data}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View style={styles.containerFlatlistItem}>
                  <TextNormal style={{fontSize: 17}}>{item.desease}</TextNormal>
                  <View style={styles.wrapperContentData}>
                    <TextNormal
                      style={{
                        marginRight: 10,
                        color: item.status === 'Cao' ? 'red' : 'orange',
                        fontWeight: item.status === 'Cao' ? 'bold' : 'light',
                      }}>
                      {'\u25CF ' + item.status}
                    </TextNormal>
                    <Icons
                      type={'Feather'}
                      name={'clock'}
                      size={15}
                      style={styles.iconClock}
                      color={'gray'}
                    />
                    <TextNormal style={{color: Colors.textGrayColor}}>
                      {item.created}
                    </TextNormal>
                  </View>
                  <View style={styles.containerValueDesease}>
                    <View style={{flexDirection: 'row'}}>
                      <TextNormal style={styles.textIndexDesease}>
                        {item.value && item.unit
                          ? `${item.value} ${item.unit}`
                          : item.value}
                      </TextNormal>
                      {item && item.subVal !== 0 && (
                        <View style={styles.wrapperSubValue}>
                          <Icons
                            type={'Feather'}
                            name={'heart'}
                            size={15}
                            color={'red'}
                            style={styles.heartIcon}
                          />
                          <TextSemiBold style={{fontSize: 24}}>
                            {item.subVal}
                          </TextSemiBold>
                        </View>
                      )}
                    </View>
                    {item && item?.icon && <Svg name={item?.icon} size={40} />}
                  </View>
                </View>
              );
            }}
            ListFooterComponent={FooterFlatList}
            ListHeaderComponent={() => (
              <TextSemiBold style={{paddingVertical: 5}}>
                Tình trạng sức khoẻ
              </TextSemiBold>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
