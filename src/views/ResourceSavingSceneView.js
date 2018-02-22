import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import SceneView from './SceneView';
import NavigationActions from '../NavigationActions';

const FAR_FAR_AWAY = 3000; // this should be big enough to move the whole view out of its container

export default class ResourceSavingSceneView extends React.PureComponent {
  constructor(props) {
    super();

    const key = props.childNavigation.state.key;
    const focusedIndex = props.navigation.state.index;
    const focusedKey = props.navigation.state.routes[focusedIndex].key;
    const isFocused = key === focusedKey;

    this.state = {
      awake: props.lazy ? isFocused : true,
      visible: isFocused,
    };
  }

  componentWillMount() {
    this._actionListener = this.props.navigation.addListener(
      'action',
      this._onAction
    );
  }

  componentWillUnmount() {
    this._actionListener.remove();
  }

  render() {
    const { awake, visible } = this.state;
    const {
      childNavigation,
      navigation,
      removeClippedSubviews,
      lazy,
      ...rest
    } = this.props;

    return (
      <View
        style={styles.container}
        collapsable={false}
        removeClippedSubviews={
          Platform.OS === 'android'
            ? removeClippedSubviews
            : !visible && removeClippedSubviews
        }
      >
        <View style={visible ? styles.innerAttached : styles.innerDetached}>
          {awake ? <SceneView {...rest} navigation={childNavigation} /> : null}
        </View>
      </View>
    );
  }

  _mustBeVisible = payload => {
    if (this.state.awake && this.props.alwaysVisible) {
      return true;
    }

    const { routes, index } = payload.state;
    const currentKey = this.props.childNavigation.state.key;
    const currentIndex = routes.findIndex(route => route.key === currentKey);

    // Set sibling scenes visible on swipe start
    if (
      payload.action.type === NavigationActions.SWIPE_START &&
      (this.props.lazyOnSwipe || this.state.awake)
    ) {
      const isSibling =
        currentIndex === index - 1 || currentIndex === index + 1;

      if (isSibling) {
        return true;
      }
    }

    // Keep visible the scene which triggered the navigation to preserve the animation
    if (
      this.props.animationEnabled &&
      payload.lastState &&
      payload.lastState.index === currentIndex
    ) {
      return true;
    }

    return routes[index].key === currentKey;
  };

  _onAction = payload => {
    // We do not care about transition complete events, they won't actually change the state
    if (
      payload.action.type === NavigationActions.COMPLETE_TRANSITION ||
      !payload.state
    ) {
      return;
    }

    if (this._mustBeVisible(payload)) {
      if (!this.state.visible) {
        let nextState = { visible: true };
        if (!this.state.awake) {
          nextState.awake = true;
        }
        this.setState(nextState);
      }
    } else {
      if (this.state.visible) {
        this.setState({ visible: false });
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  innerAttached: {
    flex: 1,
  },
  innerDetached: {
    flex: 1,
    top: FAR_FAR_AWAY,
  },
});
