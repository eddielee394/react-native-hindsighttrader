import React from 'react';
import PropTypes from 'prop-types';
import { ScrollableTab, TabHeading } from 'native-base';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

export function TabBar(props) {
  const {
    scrollHeight,
    nativeScroll,
    tabBarStyle,
    tabHeadingStyle,
    tabHeadingUnderlineStyle,
    tabHeadingTextStyle,
    backgroundColor,
  } = props;

  const SCROLL_HEIGHT = scrollHeight ?? 50;
  const scroll = new Animated.Value(0);

  nativeScroll.addListener(
    Animated.event([{ value: scroll }], { useNativeDriver: false }),
  );

  const tabY = nativeScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.tabBar,
        tabBarStyle,
        { transform: [{ translateY: tabY }] },
      ]}>
      <ScrollableTab
        {...props}
        renderTab={(name, page, active, onPress, onLayout) => (
          <TouchableOpacity
            key={page}
            onPress={() => onPress(page)}
            onLayout={onLayout}
            activeOpacity={0.4}>
            <Animated.View style={[styles.tabBar, tabBarStyle]}>
              <TabHeading
                scrollable
                style={[styles.tabHeading, tabHeadingStyle]}
                active={active}>
                <Animated.Text
                  style={[
                    styles.tabHeadingText,
                    tabHeadingTextStyle,
                    { fontWeight: active ? 'bold' : 'normal' },
                  ]}>
                  {name}
                </Animated.Text>
              </TabHeading>
            </Animated.View>
          </TouchableOpacity>
        )}
        underlineStyle={[styles.tabHeadingUnderline, tabHeadingUnderlineStyle]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
  tabHeading: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  tabHeadingText: {
    color: 'white',
    fontSize: 14,
  },
  tabHeadingUnderline: {
    backgroundColor: 'blue',
  },
});

TabBar.propTypes = {
  nativeScroll: PropTypes.func,
  scrollHeight: PropTypes.number,
  tabBarStyle: PropTypes.object,
  tabHeadingStyle: PropTypes.object,
  tabHeadingTextStyle: PropTypes.object,
  tabHeadingUnderlineStyle: PropTypes.object,
  backgroundColor: PropTypes.string,
};
