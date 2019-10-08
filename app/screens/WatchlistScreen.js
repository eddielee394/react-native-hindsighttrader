import React, { useEffect, useState } from 'react';
import { Container, Text } from 'native-base';
import { WatchlistList } from '../components/Watchlist/WatchlistList';
import Api from '../services/api';

const WatchlistScreen = props => {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    // Api.getQuoteData('aapl').then(data => setData(data));
  }, []);

  return (
    <Container>
      <WatchlistList />
    </Container>
  );
};

export default WatchlistScreen;
