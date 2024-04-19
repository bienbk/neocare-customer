import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView, Animated, FlatList} from 'react-native';
import CustomeCard from './CustomeCard';
import Header from 'common/Header/Header';
import Colors from 'theme/Colors';
import {NAVIGATION_ACCOUNT} from 'navigation/routes';

const AnimatedFlastList = Animated.createAnimatedComponent(FlatList);
const AnimatedList = ({navigation}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );
  const onBack = () => navigation && navigation.navigate(NAVIGATION_ACCOUNT);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header title={'Package'} onBack={onBack} />
      <AnimatedFlastList
        bounces={false}
        scrollEventThrottle={16}
        data={[...Array(6).keys()]}
        keyExtractor={(_, index) => index}
        {...{onScroll}}
        renderItem={({item, index}) => (
          <CustomeCard {...{item, scrollY, index}} />
        )}
      />
    </SafeAreaView>
  );
};

export default AnimatedList;

const styles = StyleSheet.create({
  safeAreaView: {backgroundColor: Colors.backgroundColor, flex: 1},
});
