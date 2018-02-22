import React from 'react';
import { Platform } from 'react-native';

import createNavigator from './createNavigator';
import createNavigationContainer from '../createNavigationContainer';
import TabRouter from '../routers/TabRouter';
import TabView from '../views/TabView/TabView';
import TabBarTop from '../views/TabView/TabBarTop';
import TabBarBottom from '../views/TabView/TabBarBottom';

// A tab navigators props are the intersection between
// the base navigator props (navgiation, screenProps, etc)
// and the view's props

const TabNavigator = (routeConfigs, config = {}) => {
  // Use the look native to the platform by default
  const mergedConfig = { ...TabNavigator.Presets.Default, ...config };
  const {
    tabBarComponent,
    tabBarPosition,
    tabBarOptions,
    lazy,
    lazyOnSwipe,
    removeClippedSubviews,
    swipeEnabled,
    animationEnabled,
    alwaysVisible,
    configureTransition,
    initialLayout,
    ...tabsConfig
  } = mergedConfig;

  const router = TabRouter(routeConfigs, tabsConfig);

  const navigator = createNavigator(router, routeConfigs, config)(props => (
    <TabView
      {...props}
      lazy={lazy}
      lazyOnSwipe={lazyOnSwipe}
      removeClippedSubviews={removeClippedSubviews}
      tabBarComponent={tabBarComponent}
      tabBarPosition={tabBarPosition}
      tabBarOptions={tabBarOptions}
      swipeEnabled={swipeEnabled}
      animationEnabled={animationEnabled}
      alwaysVisible={alwaysVisible}
      configureTransition={configureTransition}
      initialLayout={initialLayout}
    />
  ));

  return createNavigationContainer(navigator);
};

const Presets = {
  iOSBottomTabs: {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    initialLayout: undefined,
    alwaysVisible: false,
    lazyOnSwipe: true,
  },
  AndroidTopTabs: {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    initialLayout: undefined,
    alwaysVisible: false,
    lazyOnSwipe: true,
  },
};

/**
 * Use these to get Android-style top tabs even on iOS or vice versa.
 *
 * Example:
 * ```
 * const HomeScreenTabNavigator = TabNavigator({
 *  Chat: {
 *    screen: ChatScreen,
 *  },
 *  ...
 * }, {
 *  ...TabNavigator.Presets.AndroidTopTabs,
 *  tabBarOptions: {
 *    ...
 *  },
 * });
 *```
 */
TabNavigator.Presets = {
  iOSBottomTabs: Presets.iOSBottomTabs,
  AndroidTopTabs: Presets.AndroidTopTabs,
  Default:
    Platform.OS === 'ios' ? Presets.iOSBottomTabs : Presets.AndroidTopTabs,
};

export default TabNavigator;
