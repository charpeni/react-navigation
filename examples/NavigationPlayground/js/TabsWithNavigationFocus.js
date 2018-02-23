/**
 * @flow
 */

import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TabNavigator, withNavigationFocus } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SampleText from './SampleText';

const createTabScreen = (name, icon, focusedIcon, tintColor = '#673ab7') => {
  const TabScreen = ({ isFocused }) => (
    <SafeAreaView
      forceInset={{ horizontal: 'always', top: 'always' }}
      style={{
        flex: 1,
      }}
    >
      {name === 'One' ? (
        <View style={{ flex: 1, backgroundColor: 'red' }} />
      ) : null}
      {name === 'Two' ? (
        <View style={{ flex: 1, backgroundColor: 'yellow' }} />
      ) : null}
      {name === 'Three' ? (
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      ) : null}
      {name === 'Four' ? (
        <View style={{ flex: 1, backgroundColor: 'green' }} />
      ) : null}
      {name === 'Five' ? (
        <View style={{ flex: 1, backgroundColor: 'purple' }} />
      ) : null}
    </SafeAreaView>
  );

  TabScreen.navigationOptions = {
    tabBarLabel: name,
    tabBarIcon: ({ tintColor, focused }) => (
      <MaterialCommunityIcons
        name={focused ? focusedIcon : icon}
        size={26}
        style={{ color: focused ? tintColor : '#ccc' }}
      />
    ),
  };

  return withNavigationFocus(TabScreen);
};

const TabsWithNavigationFocus = TabNavigator(
  {
    One: {
      screen: createTabScreen('One', 'numeric-1-box-outline', 'numeric-1-box'),
    },
    Two: {
      screen: createTabScreen('Two', 'numeric-2-box-outline', 'numeric-2-box'),
    },
    Three: {
      screen: createTabScreen(
        'Three',
        'numeric-3-box-outline',
        'numeric-3-box'
      ),
    },
    Four: {
      screen: createTabScreen('Four', 'numeric-4-box-outline', 'numeric-4-box'),
    },
    Five: {
      screen: createTabScreen('Five', 'numeric-5-box-outline', 'numeric-5-box'),
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    lazy: false,
    lazyLoadOnSwipe: false,
  }
);

export default TabsWithNavigationFocus;
