import React from 'react';
import { Layout, withStyles, Text } from 'react-native-ui-kitten';

const Search = props => {
  const { style, themedStyle, ...restProps } = props;
  
  return (
    <Layout style={[themedStyle.container]}>
      <Text>SearchScreen</Text>
    </Layout>
  );
};

export const SearchScreen = withStyles(Search, theme => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
