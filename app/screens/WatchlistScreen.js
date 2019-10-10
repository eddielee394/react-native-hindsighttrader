import React, { useState } from 'react';
import { Container, Header } from 'native-base';
import { WatchlistList } from '../components/Watchlist/WatchlistList';

function WatchlistScreen(props) {
  const [data, setData] = useState({ data: [] });

  return (
    <Container>
      <Header />
      <WatchlistList />
    </Container>
  );
}

export default WatchlistScreen;
