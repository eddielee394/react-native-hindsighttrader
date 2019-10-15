import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Interactable from 'react-native-interactable';

class SwipeableRow extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
    this.state = { isMoving: false, position: 1 };
  }

  render() {
    const activeOpacity = this.state.position !== 1 ? 0.5 : 1;
    const { rowStyle, drawerBackgroundColor, buttonImage } = this.props;

    return (
      <View style={drawerBackgroundColor}>
        <View style={styles.drawerStyle}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={this.onButtonPress.bind(this)}>
            <Animated.Image
              source={buttonImage}
              style={[
                styles.buttonImage,
                {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-75, -50],
                    outputRange: [1, 0],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  transform: [
                    {
                      scale: this._deltaX.interpolate({
                        inputRange: [-75, -50],
                        outputRange: [1, 0.7],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <Interactable.View
          ref={el => (this.interactableElem = el)}
          horizontalOnly={true}
          snapPoints={[
            {
              x: 0,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: 0,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: -75,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
          ]}
          onSnap={this.onSnap.bind(this)}
          onDrag={this.onDrag.bind(this)}
          onStop={this.onStopMoving.bind(this)}
          dragToss={0.01}
          animatedValueX={this._deltaX}>
          <TouchableHighlight
            onPress={this.onRowPress.bind(this)}
            activeOpacity={activeOpacity}
            underlayColor={'white'}>
            <View style={rowStyle}>{this.props.children}</View>
          </TouchableHighlight>
        </Interactable.View>
      </View>
    );
  }

  onSnap({ nativeEvent }) {
    const { index } = nativeEvent;
    this.setState({ position: index });
  }

  onRowPress() {
    const { isMoving, position } = this.state;
    if (!isMoving && position !== 1) {
      this.interactableElem.snapTo({ index: 1 });
    }
  }

  onDrag({ nativeEvent }) {
    const { state } = nativeEvent;
    if (state === 'start') {
      this.setState({ isMoving: true });
    }
  }

  onStopMoving() {
    this.setState({ isMoving: false });
  }

  onButtonPress() {
    const { buttonCallback } = this.props;
    buttonCallback();
  }
}

const styles = StyleSheet.create({
  drawerStyle: {
    position: 'absolute',
    right: 0,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});

export default SwipeableRow;
