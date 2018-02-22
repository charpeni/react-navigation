/**
 * @flow
 */

import React from 'react';
import { Button, SafeAreaView, StatusBar, Text, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const createTabScreen = (
  name,
  backgroundColor,
  icon,
  focusedIcon,
  tintColor = '#673ab7'
) => {
  const TabScreen = ({ navigation, isFocused }) => (
    <SafeAreaView
      forceInset={{ horizontal: 'always', top: 'always' }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
      }}
    >
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
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

  return TabScreen;
};

const createTabNavigator = config =>
  TabNavigator(
    {
      One: {
        screen: createTabScreen(
          'One',
          '#50514F',
          'numeric-1-box-outline',
          'numeric-1-box'
        ),
      },
      Two: {
        screen: createTabScreen(
          'Two',
          '#F25F5C',
          'numeric-2-box-outline',
          'numeric-2-box'
        ),
      },
      Three: {
        screen: createTabScreen(
          'Three',
          '#FFE066',
          'numeric-3-box-outline',
          'numeric-3-box'
        ),
      },
      Four: {
        screen: createTabScreen(
          'Four',
          '#247BA0',
          'numeric-4-box-outline',
          'numeric-4-box'
        ),
      },
      Five: {
        screen: createTabScreen(
          'Five',
          '#70C1B3',
          'numeric-5-box-outline',
          'numeric-5-box'
        ),
      },
    },
    {
      ...config,
      tabBarOptions: {
        style: {
          ...Platform.select({
            android: {
              paddingTop: 25,
            },
          }),
        },
      },
    }
  );

class LazyTabs extends React.Component {
  render() {
    const { navigation, banner } = this.props;
    return (
      <SafeAreaView
        forceInset={{ horizontal: 'always', top: 'always' }}
        style={{
          flex: 1,
          marginTop: 60,
        }}
      >
        <Button
          onPress={() => navigation.push('Default')}
          title="Default TabNavigator config"
        />
        <Button
          onPress={() => navigation.push('FullProps')}
          title="AnimationEnabled, swipeEnabled, lazy, and lazyOnSwipe"
        />
        <Button
          onPress={() => navigation.push('NotLazyOnSwipe')}
          title="Tabs are lazy loaded on focus instead of swipe"
        />
        <Button
          onPress={() => navigation.push('AlwaysVisible')}
          title="Lazy loaded tabs stay visible on sliding animation"
        />
        <Button
          onPress={() => navigation.push('SwipeDisabled')}
          title="Swipe disabled"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
      </SafeAreaView>
    );
  }
}

const SimpleStack = StackNavigator(
  {
    Home: {
      screen: LazyTabs,
    },
    Default: {
      screen: createTabNavigator(),
    },
    FullProps: {
      screen: createTabNavigator({
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        lazyOnSwipe: true,
        removeClippedSubviews: true,
      }),
    },
    NotLazyOnSwipe: {
      screen: createTabNavigator({
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        lazyOnSwipe: false,
        removeClippedSubviews: true,
      }),
    },
    AlwaysVisible: {
      screen: createTabNavigator({
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        lazyOnSwipe: false,
        removeClippedSubviews: true,
        alwaysVisible: true,
      }),
    },
    SwipeDisabled: {
      screen: createTabNavigator({
        animationEnabled: true,
        swipeEnabled: false,
        lazy: true,
        lazyOnSwipe: false,
        removeClippedSubviews: true,
      }),
    },
  },
  {
    headerMode: 'none',
  }
);

export default SimpleStack;
