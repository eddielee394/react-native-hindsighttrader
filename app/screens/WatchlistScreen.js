import React, { useEffect, useState } from 'react';
import { Container, Text } from 'native-base';
import { WatchlistList } from '../components/Watchlist/WatchlistList';
import Api from '../services/api';

function WatchlistScreen(props) {
  const [data, setData] = useState({ data: [] });

  return (
    <Container>
      <WatchlistList />
    </Container>
  );
}

export default WatchlistScreen;
