import React, {useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Icons from 'common/Icons/Icons';
import {widthDevice, heightDevice} from 'assets/constans';

export default function Example() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -35],
    extrapolate: 'clamp',
  });
  const contanerTransition = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });
  const translateInput = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Icons
        type={'Ionicons'}
        name={'arrow-back'}
        size={25}
        style={{position: 'absolute', zIndex: 2, top: 15, left: 15}}
        color={'black'}
      />
      <Animated.View
        style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
        <Animated.Text
          style={[styles.headerTitle, {transform: [{scale: translateTitle}]}]}>
          Cheap flights to anywhere
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={[styles.content, {transform: [{translateY: 0}]}]}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    backgroundColor: 'red',
    minHeight: heightDevice,
  },
  /** Header */
  header: {
    // position: 'absolute',
    width: widthDevice,
    // zIndex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    // lineHeight: 34,
    fontWeight: 'bold',
    color: 'black',
    // textAlign: 'center',
    // marginBottom: 12,
    paddingTop: 40,
  },
  /** Input */
  input: {
    height: 44,
    backgroundColor: 'gray',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Card */
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  cardImg: {
    width: 120,
    height: 154,
    borderRadius: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#173153',
    marginRight: 8,
  },
  cardAirport: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5f697d',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -8,
    flexWrap: 'wrap',
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#5f697d',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5f697d',
  },
  cardPriceValue: {
    fontSize: 21,
    fontWeight: '700',
    color: '#173153',
  },
  cardPriceCurrency: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6f61c4',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: '#173153',
    borderColor: '#173153',
  },
  btnText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
