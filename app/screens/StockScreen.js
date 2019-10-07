import React from 'react';
import { Layout, withStyles, Text } from 'react-native-ui-kitten';
import StockChart from '../components/Stock/StockChart';

const Stock = props => {
  const { style, themedStyle, ...restProps } = props;

  return (
    <Layout style={[themedStyle.container]}>
      <StockChart />
    </Layout>
  );
};

export const StockScreen = withStyles(Stock, theme => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
