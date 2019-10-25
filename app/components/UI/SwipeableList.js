import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

class SwipeableList extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }

  onButtonPress(data) {
    const { buttonCallback } = this.props;
    buttonCallback(data);
  }

  render() {
    const { data, rowItem, drawerBackgroundColor, buttonImage } = this.props;

    return (
      <View style={styles.container}>
        <SwipeListView
          data={data}
          renderItem={item => rowItem(item)}
          renderHiddenItem={(data, rowMap) => (
            <View style={[styles.rowBack, drawerBackgroundColor]}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => this.onButtonPress(data.item)}>
                <Animated.Image
                  source={buttonImage}
                  style={[
                    styles.buttonImage,
                    {
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
          )}
          leftOpenValue={0}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          friction={4}
          tension={30}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonImage: {
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
});

export default SwipeableList;
