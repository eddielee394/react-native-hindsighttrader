import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import Api from '../../services/api';

const WatchlistList = props => {
  const { style, themedStyle, ...restProps } = props;
  const data = ['1', '2', '3'];
  const onItemPress = index => {
    // Handle item press
  };
  console.log('data', data);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        style={[themedStyle.itemContainer]}
        title={item.name}
        description={item.companyName}
        onPress={onItemPress}
      />
    );
  };

  return (
    <List
      style={[themedStyle.contentContainer]}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default withStyles(WatchlistList, theme => ({
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  itemContainer: {
    marginVertical: 6,
  },
}));
