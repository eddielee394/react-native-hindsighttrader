import React from 'react';
import { Layout, Text, withStyles } from 'react-native-ui-kitten';

const News = props => {
  const { style, themedStyle, ...restProps } = props;
  return (
    <Layout style={[themedStyle.container]}>
      <Text>NewsScreen</Text>
    </Layout>
  );
};

export const NewsScreen = withStyles(News, theme => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
