import React, { useEffect, useState } from 'react';
import { Layout, withStyles, Text } from 'react-native-ui-kitten';
import WatchlistList from '../components/Watchlist/WatchlistList';
import Api from '../services/api';

const Watchlist = props => {
  const [data, setData] = useState({ data: [] });
  const { style, themedStyle, ...restProps } = props;

  useEffect(() => {
    // Api.getQuoteData('aapl').then(data => setData(data));
  }, []);

  return (
    <Layout style={[themedStyle.container]}>
      {console.log('data', Object.keys(data).map(d => d))}
      <Text>WatchlistScreen</Text>
      <WatchlistList data={data} />
    </Layout>
  );
};

export const WatchlistScreen = withStyles(Watchlist, theme => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
