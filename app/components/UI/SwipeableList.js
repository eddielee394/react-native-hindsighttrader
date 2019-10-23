import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { images } from '../../assets/images';
import { Icon } from 'native-base';
import theme from '../../theme';

class SwipeableList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._deltaX = new Animated.Value(0);
    // this.rowSwipeAnimatedValues = {};
    // Array(20)
    //   .fill('')
    //   .forEach((_, i) => {
    //     this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    //   });
  }

  // closeRow(rowMap, rowKey) {
  //   if (rowMap[rowKey]) {
  //     rowMap[rowKey].closeRow();
  //   }
  // }

  // deleteRow(rowMap, rowKey) {
  //   this.closeRow(rowMap, rowKey);
  //   const newData = [...this.state.listViewData];
  //   const prevIndex = this.state.listViewData.findIndex(
  //     item => item.key === rowKey,
  //   );
  //   newData.splice(prevIndex, 1);
  //   this.setState({ listViewData: newData });
  // }

  // deleteSectionRow(rowMap, rowKey) {
  //   this.closeRow(rowMap, rowKey);
  //   const [section] = rowKey.split('.');
  //   const newData = [...this.state.sectionListData];
  //   const prevIndex = this.state.sectionListData[section].data.findIndex(
  //     item => item.key === rowKey,
  //   );
  //   newData[section].data.splice(prevIndex, 1);
  //   this.setState({ sectionListData: newData });
  // }

  // onRowDidOpen = rowKey => {
  //   console.log('This row opened', rowKey);
  // };
  //
  // onSwipeValueChange = swipeData => {
  //   const { key, value } = swipeData;
  //   this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  // };

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

  onButtonPress(data) {
    const { buttonCallback } = this.props;
    buttonCallback(data);
  }

  render() {
    const {
      data,
      rowItem,
      rowStyle,
      drawerBackgroundColor,
      buttonCallback,
      buttonImage,
    } = this.props;

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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },

  // drawerStyle: {
  //   position: 'absolute',
  //   right: 0,
  //   height: 75,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },

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
  trash: {
    height: 25,
    width: 25,
  },
  container: {
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
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
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default SwipeableList;
