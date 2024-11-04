import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';
import {heightDevice} from '../../assets/constans';
import Icons from '../Icons/Icons';
import {TextNormal} from '../Text/TextFont';
const items = [
  {
    title: 'Long Hongdae Nights',
    description:
      'Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo',
    price: '26 CHF',
  },
  {
    title: 'Late Sunset',
    description:
      'Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite',
    price: '13.50 CHF',
  },
  {
    title: 'Cabbage Kimchi',
    description: 'Portion, vegan',
    price: '5.00 CHF',
  },
  {
    title: 'Namur by Pieces',
    description:
      'Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs',
    price: '10.50 CHF',
  },
  {
    title: 'Silim Lights',
    description:
      'Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg',
    price: '26.50 CHF',
  },
];

const menu = [
  {name: 'Starters', items},
  {name: 'Order Again', items},
  {name: 'Picked for you', items},
  {name: 'Gimbap Sushi', items},
  {name: 'Starters ds 2', items},
  {name: 'Order Again  ds 2', items},
  {name: 'Pickeddd  2', items},
  {name: 'Gimbadd 2', items},
];
export const defaultTabs = menu.map(({name}) => ({name, anchor: 0}));

export default ({y, onMeasurement}) => {
  const opacity = y.interpolate({
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, {opacity}]}>
        <TextNormal style={styles.text}>
          $$ • Asiatisch • Koreanisch • Japanisch
        </TextNormal>
        <View style={styles.info}>
          <TextNormal style={styles.text}>Opens at 11:30 AM</TextNormal>
          <View style={styles.ratings}>
            <Icons
              type={'AntDesgin'}
              name="star"
              color="#f4c945"
              size={24}
              style={styles.icon}
            />
            <TextNormal style={styles.text}>(186)</TextNormal>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <TextNormal style={styles.title2}>Restaurant info</TextNormal>
        <View style={styles.info}>
          <TextNormal style={styles.text}>
            Europaallee 48, Zürich, Zürich 8004
          </TextNormal>
          <TextNormal style={styles.link}>More info</TextNormal>
        </View>
      </View>
      <View style={styles.divider} />
      {menu.map(({name, items: menuItems}, index) => (
        <View
          style={styles.section}
          key={index}
          onLayout={({
            nativeEvent: {
              layout: {y: anchor},
            },
          }) => onMeasurement(index, {name, anchor: anchor - 142})}>
          <TextNormal style={styles.title1}>{name}</TextNormal>
          {menuItems.map(({title, description, price}, j) => (
            <View style={styles.item} key={j}>
              <TextNormal style={styles.title}>{title}</TextNormal>
              <TextNormal style={styles.description} numberOfLines={2}>
                {description}
              </TextNormal>
              <TextNormal style={styles.price}>{price}</TextNormal>
            </View>
          ))}
        </View>
      ))}
      <View style={{height: heightDevice / 2}} />
    </>
  );
};
const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    // fontFamily: 'UberMoveRegular',
    fontSize: 14,
  },
  title1: {
    // fontFamily: 'UberMoveMedium',
    fontSize: 24,
  },
  title2: {
    // fontFamily: 'UberMoveMedium',
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: '#247A00',
  },
  item: {
    borderBottomColor: '#e2e3e4',
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    fontFamily: 'UberMoveMedium',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    fontFamily: 'UberMoveMedium',
    marginBottom: 16,
  },
});
